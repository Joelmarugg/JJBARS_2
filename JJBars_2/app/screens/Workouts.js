import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, SectionList, StatusBar, Text, SafeAreaView } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  ListItem,
  Separator,
  placeHolder,
  SectionHeader
} from "../components/List";

// M3 Typography Styles
const M3Typography = {
  headlineLarge: {
    fontFamily: "Roboto",
    fontSize: 32,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 40,
    color: "#191C1A", // M3 On Surface
  },
  headlineMedium: {
    fontFamily: "Roboto",
    fontSize: 28,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 36,
    color: "#191C1A",
  },
  headlineSmall: {
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 32,
    color: "#191C1A",
  },
  titleLarge: {
    fontFamily: "Roboto",
    fontSize: 22,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 28,
    color: "#191C1A",
  },
  titleMedium: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.15,
    lineHeight: 24,
    color: "#191C1A",
  },
  titleSmall: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 20,
    color: "#191C1A",
  },
  bodyLarge: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 0.5,
    lineHeight: 24,
    color: "#404943", // M3 On Surface Variant
  },
  bodyMedium: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.25,
    lineHeight: 20,
    color: "#404943",
  },
  bodySmall: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.4,
    lineHeight: 16,
    color: "#404943",
  },
  labelLarge: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 20,
    color: "#404943",
  },
  labelMedium: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 16,
    color: "#404943",
  },
  labelSmall: {
    fontFamily: "Roboto",
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 16,
    color: "#404943",
  },
};

// M3 Loading Component
const M3LoadingCard = () => (
  <View style={{ 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: "#FBFDF9"
  }}>
    <View style={{
      backgroundColor: "#FBFDF9",
      borderRadius: 16,
      padding: 32,
      margin: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      alignItems: "center"
    }}>
      <Text style={M3Typography.titleMedium}>Workout wird geladen...</Text>
      <Text style={[M3Typography.bodyMedium, { marginTop: 8, textAlign: "center" }]}>Bitte warte einen Moment</Text>
    </View>
  </View>
);

// M3 Empty State Component
const M3EmptyState = () => (
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FBFDF9",
    padding: 24
  }}>
    <View style={{
      backgroundColor: "#FBFDF9",
      borderRadius: 16,
      padding: 32,
      margin: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      alignItems: "center"
    }}>
      <Text style={[M3Typography.headlineSmall, { textAlign: "center", marginBottom: 8 }]}>Keine Übungen gefunden! 🏋️‍♂️</Text>
      <Text style={[M3Typography.bodyLarge, { textAlign: "center" }]}>Dieses Workout enthält noch keine Übungen. Füge einige hinzu, um zu beginnen.</Text>
    </View>
  </View>
);

// Eigene M3SectionHeader-Komponente für ein modernes, sauberes Aussehen
const M3SectionHeader = ({ title, times }) => (
  <View
    style={{
      backgroundColor: "#E6EBE9", // M3 Surface Variant
      marginHorizontal: 0,
      marginTop: 2,
      marginBottom: 4,
      borderRadius: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.10,
      shadowRadius: 2.22,
      elevation: 2,
      width: '100%',
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Text style={{
      fontFamily: "Roboto",
      fontSize: 16,
      fontWeight: "700",
      color: "#191C1A",
    }}>{title}</Text>
    <Text style={{
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: "400",
      color: "#404943",
    }}>x{times} Times</Text>
  </View>
);

function WorkoutsWithSafeArea(props) {
  const insets = useSafeAreaInsets();
  return <Workouts {...props} safeAreaInsets={insets} />;
}

class Workouts extends Component {
  constructor(props) {
    super(props);
    this.sectionListRef = React.createRef();
    this.state = {
      sections: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.updateList();
  }

  //insert the exercises of the workout
  //gets the workouts only from firebase when not existing on phone.
  async updateList() {
    try {
      const workoutName = this.props.route?.params?.title;
      const source = this.props.route?.params?.source;
      if (source === 'online') {
        this.loadFromCloud(workoutName);
      } else {
        // Standard: lokal
        const section = await AsyncStorage.getItem(workoutName);
        let parsed = [];
        try { parsed = JSON.parse(section); } catch (e) { parsed = []; }
        const sections = Array.isArray(parsed) ? parsed : [];
        this.setState({ sections, isLoading: false }, () => {
          this.setHeaderTitle(workoutName, sections);
        });
      }
    } catch (err) {
      // Fehler beim Laden der Workouts
      this.setState({ sections: [], isLoading: false });
    }
  }

  loadFromCloud(workoutName) {
    const db = getDatabase();
    onValue(ref(db, "workouts"), snap => {
      let found = false;
      snap.forEach(child => {
        if (child.val().workoutname === workoutName) {
          const rawSections = child.val().sections;
          const sections = Array.isArray(rawSections)
            ? rawSections.map(sec => ({
                ...sec,
                data: Array.isArray(sec.data) ? sec.data : []
              }))
            : [];
          this.setState({ sections, isLoading: false }, () => {
            this.setHeaderTitle(workoutName, sections);
          });
          found = true;
        }
      });
      if (!found) {
        this.setState({ sections: [], isLoading: false });
      }
    });
  }

  setHeaderTitle(workoutName, sections) {
    const sectionCount = sections.length;
    const exerciseCount = sections.reduce((total, section) => total + (section.data?.length || 0), 0);
    const title = `${workoutName} - (${sectionCount} S / ${exerciseCount} Ü)`;
    if (this.props.navigation && this.props.navigation.setOptions) {
      this.props.navigation.setOptions({ title });
    }
  }

  render() {
    const insets = this.props.safeAreaInsets || { top: 0, bottom: 0 };
    if (this.state.isLoading) {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FBFDF9", paddingTop: insets.top, paddingBottom: insets.bottom }}>
          <StatusBar barStyle="dark-content" backgroundColor="#FBFDF9" />
          <M3LoadingCard />
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FBFDF9", paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FBFDF9" />

        {/* Nur noch SectionList, kein Header mehr */}
        <SectionList
          sections={this.state.sections}
          renderItem={({ item }) => (
            <ListItem
              text={item.title}
              selected={true}
              bigText={true}
              number={item.reps}
              repText={item.repText}
              countDown={item.repText === "Secs" ? true : false}
              style={{
                backgroundColor: "#FFFFFF",
                marginHorizontal: 16,
                marginVertical: 6,
                borderRadius: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.08,
                shadowRadius: 2.22,
                elevation: 1,
                padding: 10,
              }}
            />
          )}
          renderSectionHeader={({ section }) => (
            <M3SectionHeader
              title={section.title}
              times={section.times}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
          ref={this.sectionListRef}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={true}
          ListEmptyComponent={M3EmptyState}
          contentContainerStyle={{ paddingBottom: 32, paddingTop: 0 }}
        />
      </SafeAreaView>
    );
  }
}

export default WorkoutsWithSafeArea;
