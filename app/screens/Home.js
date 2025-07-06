import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions,
  Easing,
  StyleSheet
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
//import { Constants, FileSystem, Asset, SQLite } from "expo";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { initializeApp, getApps } from "firebase/app"; // <-- NEU
import ApiKey from "../config/ApiKey";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoadingIcon } from "../components/List";
import { InputWithButton } from "../components/TextInput";
import { Container } from "../components/Container";
import { Logo } from "../components/Logo";
import { Button } from "../components/Button";
import { connectAlert } from "../components/Alert";
import { ensureDatabaseLoaded } from "../dbUtils";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// M3 Typography Styles - Außerhalb der Komponente für bessere Performance
const M3Typography = {
  displayLarge: {
    fontFamily: "Roboto",
    fontSize: 57,
    fontWeight: "400",
    letterSpacing: -0.25,
    lineHeight: 64,
    color: "#191C1A", // M3 On Surface
  },
  displayMedium: {
    fontFamily: "Roboto",
    fontSize: 45,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 52,
    color: "#191C1A",
  },
  displaySmall: {
    fontFamily: "Roboto",
    fontSize: 36,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 44,
    color: "#191C1A",
  },
  headlineLarge: {
    fontFamily: "Roboto",
    fontSize: 32,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 40,
    color: "#191C1A",
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

// Styles extrahiert für bessere Performance
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFDF9"
  },
  loadingContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: STATUSBAR_HEIGHT
  },
  logoContainer: {
    marginTop: 32,
    height: 300
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#FBFDF9",
    paddingTop: STATUSBAR_HEIGHT,
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#DCE5DD",
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 32
  },
  animatedLogo: {
    alignItems: "center",
    marginBottom: 32,
  },
  contentContainer: {
    // transform wird dynamisch gesetzt
  },
  welcomeCard: {
    marginTop: 0,
    padding: 16,
    backgroundColor: "#DCE5DD",
    borderLeftWidth: 4,
    borderLeftColor: "#4C6358"
  },
  actionCard: {
    marginTop: 24,
    marginBottom: 8,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  actionButtonsContainer: {
    gap: 20,
    marginTop: 8,
    alignItems: 'center',
    width: '100%',
  },
  databaseCard: {
    marginBottom: -8,
  },
  databaseCardSuccess: {
    backgroundColor: "#CFE9DB",
    borderLeftWidth: 4,
    borderLeftColor: "#4C6358"
  },
  databaseCardError: {
    backgroundColor: "#FFDAD6",
    borderLeftWidth: 4,
    borderLeftColor: "#BA1A1A"
  },
  databaseTouchable: {
    alignItems: "center"
  },
  welcomeScreenContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: STATUSBAR_HEIGHT,
    paddingHorizontal: 24
  },
  welcomeCardContainer: {
    width: "100%",
    maxWidth: 400
  }
});

// M3 Card Component
const M3Card = ({ children, style }) => (
  <View
    style={{
      backgroundColor: "#FBFDF9", // M3 Surface Color (Green tinted)
      borderRadius: 16, // M3 Card Radius
      padding: 24,
      margin: 16, // Wieder zurückgesetzt
      // M3 Elevation Level 1
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      ...style,
    }}
  >
    {children}
  </View>
);

// Separate Komponenten für bessere Wartbarkeit
const WelcomeHeader = ({ userName, scrollY, headerHeight }) => {
  const welcomeHeaderOpacity = scrollY.interpolate({
    inputRange: [headerHeight + 50, headerHeight + 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const welcomeHeaderTranslateY = scrollY.interpolate({
    inputRange: [headerHeight + 50, headerHeight + 100],
    outputRange: [20, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          opacity: welcomeHeaderOpacity,
          transform: [{ translateY: welcomeHeaderTranslateY }],
        }
      ]}
    >
      <Text style={[M3Typography.titleMedium, { color: "#006C51" }]}>
        Willkommen zurück, {userName}! 👋
      </Text>
    </Animated.View>
  );
};

const AnimatedLogo = ({ scrollY, headerHeight }) => {
  const logoScale = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });

  const logoOpacity = scrollY.interpolate({
    inputRange: [headerHeight * 0.7, headerHeight * 1.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const logoTranslateY = scrollY.interpolate({
    inputRange: [headerHeight * 0.7, headerHeight * 1.5],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.animatedLogo,
        {
          transform: [
            { scale: logoScale },
            { translateY: logoTranslateY }
          ],
          opacity: logoOpacity,
        }
      ]}
    >
      <Logo />
    </Animated.View>
  );
};

const WelcomeCard = ({ userName, scrollY, headerHeight }) => {
  const welcomeCardOpacity = scrollY.interpolate({
    inputRange: [headerHeight + 50, headerHeight + 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const welcomeCardTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight + 50],
    outputRange: [0, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        opacity: welcomeCardOpacity,
        transform: [{ translateY: welcomeCardTranslateY }],
      }}
    >
      <M3Card style={styles.welcomeCard}>
        <Text style={[M3Typography.titleMedium, { color: "#191C1A" }]}>
          Willkommen zurück, {userName}! 👋
        </Text>
        <Text style={[M3Typography.bodySmall, { marginTop: 4, color: "#404943" }]}>
          Bereit für dein nächstes Training?
        </Text>
      </M3Card>
    </Animated.View>
  );
};

const ActionCards = ({ onPressCreate, onPressGenerate, onPressSaved }) => (
  <M3Card style={styles.actionCard}>
    <Text style={[M3Typography.headlineMedium, { marginBottom: 8, textAlign: "center", color: "#191C1A" }]}>
      Was möchtest du tun?
    </Text>
    <Text style={[M3Typography.bodyMedium, { marginBottom: 32, textAlign: "center", color: "#404943" }]}>
      Wähle deine nächste Aktion
    </Text>
    
    <View style={styles.actionButtonsContainer}>
      <Button
        accessible={true}
        accessibilityLabel="Workout erstellen Button"
        accessibilityHint="Erstellt ein neues Workout"
        buttonText={"🏋️‍♂️ Workout erstellen"}
        onPress={onPressCreate}
      />

      <Button
        accessible={true}
        accessibilityLabel="Online Workouts Button"
        accessibilityHint="Zeigt Online Workouts an"
        buttonText={"🌐 Online Workouts"}
        onPress={onPressGenerate}
      />
      
      <Button
        accessible={true}
        accessibilityLabel="Gespeicherte Workouts Button"
        accessibilityHint="Zeigt gespeicherte Workouts an"
        buttonText={"💾 Gespeicherte Workouts"}
        onPress={onPressSaved}
      />
    </View>
  </M3Card>
);

const DatabaseStatus = ({ dbError, onPress, onLongPress, statusText }) => (
  <M3Card style={[
    styles.databaseCard,
    dbError ? styles.databaseCardError : styles.databaseCardSuccess
  ]}>
    <TouchableOpacity
      style={styles.databaseTouchable}
      onPress={onPress}
      onLongPress={onLongPress}
      accessible={true}
      accessibilityLabel="Datenbank Status"
      accessibilityHint={dbError ? "Tippe zum erneuten Versuch" : "Tippe zum Update, lang drücken zum Löschen des Benutzernamens"}
    >
      <Text style={[
        M3Typography.labelLarge,
        { 
          color: dbError ? "#BA1A1A" : "#006C51",
          textAlign: "center"
        }
      ]}>
        {statusText}
      </Text>
      <Text style={[M3Typography.bodySmall, { marginTop: 4, textAlign: "center" }]}>
        {dbError ? "Tippe zum erneuten Versuch" : "Tippe zum Update • Lang drücken zum Löschen des Benutzernamens"}
      </Text>
    </TouchableOpacity>
  </M3Card>
);

// Wrapper-Komponente für SafeAreaInsets
function HomeWithSafeArea(props) {
  const insets = useSafeAreaInsets();
  return <Home {...props} safeAreaInsets={insets} />;
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false, //not used!!
      userName: null,
      hasUserName: null,
      // Neue State-Variablen für DB-Verwaltung
      dbReady: false,
      dbTables: [],
      dbError: null
    };
    
    // Animated Values für Header-Effekt
    this.scrollY = new Animated.Value(0);
    
    // Firebase initialisieren (nur einmal)
    if (!getApps().length) {
      initializeApp(ApiKey.FirebaseConfig);
    }
  }

  componentDidMount() {
    this.getUserName();
  }

  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func,
    safeAreaInsets: PropTypes.object
  };

  handlePressCreateButton = () => {
    this.props.navigation.navigate("CreateWorkouts", {
      title: "Create Workout"
    });
  };

  handlePressGenerateButton = () => {
    this.props.navigation.navigate("OnlineWorkouts", {
      title: "Online Workouts"
    });
  };

  handlePressSavedButton = () => {
    this.props.navigation.navigate("SavedWorkouts", {
      title: "Saved Workouts"
    });
  };

  /**
   * Lädt eine SQLite-DB von GitHub herunter (falls nicht vorhanden),
   * öffnet sie, und macht eine Beispiel-Select-Abfrage.
   * Beim Klick wird die DB überschrieben um Updates zu ermöglichen.
   */
  loadDB = async () => {
    const dbUrl = 'https://github.com/Joelmarugg/dbtest/raw/refs/heads/master/jjbars_2.db';
    const dbFileName = 'jjbars_2.db';
    const sqliteDirectory = FileSystem.documentDirectory + 'SQLite/';
    const dbFileUri = sqliteDirectory + dbFileName;

    try {
      // 1. Alte DB-Dateien löschen und Verzeichnis erstellen
      try {
        const dirInfo = await FileSystem.getInfoAsync(sqliteDirectory);
        if (dirInfo.exists) {
          await FileSystem.deleteAsync(sqliteDirectory, { idempotent: true });
        }
        await FileSystem.makeDirectoryAsync(sqliteDirectory, { intermediates: true });
      } catch (cleanupErr) {
        // Fehler beim Aufräumen ignorieren
      }

      // 2. DB-Datei herunterladen (immer neu, um Updates zu ermöglichen)
      const downloadResult = await FileSystem.downloadAsync(dbUrl, dbFileUri);
      if (downloadResult.status !== 200) {
        throw new Error(`Download fehlgeschlagen mit Status: ${downloadResult.status}`);
      }

      // 3. DB öffnen (nur noch über Hilfsfunktion)
      const db = await ensureDatabaseLoaded();

      // 4. Tabellen abrufen
      const tables = await db.getAllAsync('SELECT name FROM sqlite_master WHERE type="table";');
      
      if (tables && tables.length > 0) {
        // Globale DB-Instanz für andere Screens verfügbar machen
        global.jjbarsDB = db;
        
        this.props.alertWithType(
          "success",
          "Datenbank erfolgreich aktualisiert",
          `${tables.length} Tabellen gefunden!`
        );
        
        this.setState({ 
          dbTables: tables, 
          dbReady: true,
          dbError: null 
        });
      } else {
        this.setState({ 
          dbTables: [], 
          dbReady: false,
          dbError: new Error('Keine Tabellen in der Datenbank gefunden')
        });
      }

    } catch (error) {
      // Fehler beim Laden der Datenbank ignorieren
      this.props.alertWithType(
        "error",
        "Datenbank Fehler",
        "Konnte Datenbank nicht laden. Bitte überprüfe deine Internetverbindung."
      );
      this.setState({ 
        dbError: error,
        dbReady: false 
      });
    }
  };

  storeUserName = async userName => {
    try {
      await AsyncStorage.setItem("userName", userName);
      this.setState({ hasUserName: true });
    } catch (error) {
      // Error saving data
    }
  };

  getUserName = async () => {
    try {
      const userName = await AsyncStorage.getItem("userName");
      this.setState({ userName: userName });

      if (userName !== null) {
        this.setState({ hasUserName: true });
      } else {
        this.setState({ hasUserName: false });
      }
    } catch (error) {
      // Fehler beim Laden des Benutzernamens ignorieren
    }
  };
  handleTextChange = text => {
    this.setState({ userName: text });
  };
  removeUserName = () => {
    AsyncStorage.removeItem("userName");
    this.props.alertWithType(
      "warn",
      "Attention",
      "You deleted your Username!!"
    );
  };
  handleSaveButton = () => {
    this.storeUserName(this.state.userName);
  };

  // Hilfsfunktion für DB-Status Anzeige
  getDBStatusText = () => {
    if (this.state.dbError) {
      return "DB Fehler - Erneut versuchen";
    } else if (this.state.dbReady) {
      return `DB geladen (${this.state.dbTables.length} Tabellen) - Klick zum Update`;
    } else if (global.jjbarsDB) {
      return "DB verfügbar - Klick zum Update";
    } else {
      return "Download DB!";
    }
  };

  handlePressDownloadDB = async () => {
    try {
      global.jjbarsDB = null;
      const fileInfo = await FileSystem.getInfoAsync(dbFileUri);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(sqliteDirectory, { idempotent: true });
      }
      await ensureDatabaseLoaded();
      this.props.alertWithType(
        "success",
        "DB aktualisiert",
        "Die Datenbank wurde erfolgreich neu geladen."
      );
    } catch (error) {
      this.props.alertWithType(
        "error",
        "DB Fehler",
        "Die Datenbank konnte nicht neu geladen werden."
      );
    }
  };

  render() {
    const insets = this.props.safeAreaInsets || { bottom: 0 };
    if (this.state.hasUserName === null) {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar translucent={false} barStyle="dark-content" backgroundColor="#FBFDF9" />
          <View style={styles.loadingContainer}>
            <View>
              <LoadingIcon loadingText={"Loading.."} iconColor={"#006C51"} />
            </View>
            <View style={styles.logoContainer}>
              <Logo />
            </View>
          </View>
        </SafeAreaView>
      );
    } else if (this.state.hasUserName) {
      const headerHeight = 100;
      
      // Content bewegt sich exakt synchron mit dem Logo-Schrumpfen
      const contentTranslateY = this.scrollY.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -70],
        extrapolate: 'clamp',
      });

      return (
        <SafeAreaView style={styles.container}>
          <StatusBar translucent={false} barStyle="dark-content" backgroundColor="#FBFDF9" />
          
          {/* Animated Header */}
          <WelcomeHeader 
            userName={this.state.userName}
            scrollY={this.scrollY}
            headerHeight={headerHeight}
          />

          <Animated.ScrollView 
            style={styles.scrollView}
            contentContainerStyle={{ 
              paddingTop: headerHeight - 80 + insets.top,
              paddingBottom: 8 + insets.bottom
            }}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          >
            {/* Animated Logo */}
            <AnimatedLogo 
              scrollY={this.scrollY}
              headerHeight={headerHeight}
            />

            {/* Content Container mit Animation */}
            <Animated.View
              style={{
                transform: [{ translateY: contentTranslateY }],
              }}
            >
              {/* Animated Welcome Card */}
              <WelcomeCard 
                userName={this.state.userName}
                scrollY={this.scrollY}
                headerHeight={headerHeight}
              />

              {/* Action Cards */}
              <ActionCards 
                onPressCreate={this.handlePressCreateButton}
                onPressGenerate={this.handlePressGenerateButton}
                onPressSaved={this.handlePressSavedButton}
              />

              {/* Database Status Card */}
              <DatabaseStatus 
                dbError={this.state.dbError}
                onPress={this.loadDB}
                onLongPress={this.removeUserName}
                statusText={this.getDBStatusText()}
              />
            </Animated.View>
          </Animated.ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar translucent={false} barStyle="dark-content" backgroundColor="#FBFDF9" />
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingHorizontal: 24
            }}
            keyboardShouldPersistTaps="handled"
          >
            <M3Card style={styles.welcomeCardContainer}>
              <Text style={[M3Typography.headlineMedium, { textAlign: "center", marginBottom: 16 }]}> 
                Willkommen bei JJBars! 🏋️‍♂️
              </Text>
              <Text style={[M3Typography.bodyLarge, { textAlign: "center", marginBottom: 32 }]}> 
                Gib deinen Benutzernamen ein, um zu beginnen
              </Text>
              <InputWithButton
                buttonText={"Speichern"}
                value={null}
                placeholder={"Dein Benutzername..."}
                editable={true}
                onPress={this.handleSaveButton}
                onChangeText={text => this.handleTextChange(text)}
                clearTextOnFocus={true}
              />
            </M3Card>
            <View style={styles.logoContainer}>
              <Logo />
            </View>
            <DatabaseStatus 
              dbError={this.state.dbError}
              onPress={this.loadDB}
              onLongPress={null}
              statusText={this.getDBStatusText()}
            />
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

export default connectAlert(HomeWithSafeArea);
