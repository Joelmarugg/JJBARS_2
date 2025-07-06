import React, { Component } from "react";
import PropTypes from "prop-types";
import { getDatabase, ref, onValue } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  FlatList,
  View,
  StatusBar,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DeleteModal } from "../components/Modal";
import { HomeHeader, IosHomeHeader } from "../components/Button";
import { ListItem, Separator, placeHolder } from "../components/List";
import { connectAlert } from "../components/Alert";

//ask for platform prefix to have accurate signs
const ICON_PREFIX = Platform.OS === "ios" ? "ios" : "md";
const ICON_COLOR = "#868686";
const ICON_SIZE = 23;

const HEADER = Platform.OS === "ios" ? IosHomeHeader : HomeHeader;

var replacementText = "No Workouts Saved Yet!";

class OnlineWorkouts extends Component {
  constructor(props) {
    super(props);
    this.db = getDatabase();
    this.itemsRef = ref(this.db, "workouts");
    this.state = {
      workoutList: [],
      modalVisible: false,
      downloaded: false,
      workout: "",
      sections: null,
      userName: "",
      currentDate: "",
      workoutTitleList: ""
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Create Shit",
      headerLeft: <HEADER onPress={() => navigation.navigate("Home")} />
    };
  };

  static propTypes = {
    navigation: PropTypes.object
  };

  componentDidMount() {
    this.getAllWorkouts(this.itemsRef);
  }

  //get the workout names from firebase

  getAllWorkouts(itemsRef) {
    onValue(itemsRef, (snap) => {
      var items = [];
      snap.forEach(child => {
        items.push({
          workoutname: child.val().workoutname,
          user: child.val().user,
          date: child.val().date
        });
      });

      let sortedItems = items.sort(
        (a, b) =>
          Date.parse(
            new Date(
              b.date
                .split(".")
                .reverse()
                .join("-")
            )
          ) -
          Date.parse(
            new Date(
              a.date
                .split(".")
                .reverse()
                .join("-")
            )
          )
      );

      this.setState({ workoutList: sortedItems });
    });
  }

  // go to workout
  handlePress = woTitle => {
    this.props.navigation.navigate("Workouts", {
      title: woTitle,
      source: 'online'
    });
  };

  //open Modal
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  //download the workout
  downloadItem = async () => {
    const workouts = await AsyncStorage.getAllKeys();
    this.setState({ workoutTitleList: workouts });

    let ups = false;
    for (let i = 0; i < this.state.workoutTitleList.length; i++) {
      if (this.state.workout === this.state.workoutTitleList[i]) {
        ups = true;
      }
    }
    if (ups) {
      this.props.alertWithType(
        "warn",
        "Download Workout Failed",
        this.state.workout + " Already Exists"
      );
    } else {
      onValue(ref(this.db, "workouts"), (snap) => {
        snap.forEach(child => {
          if (child.val().workoutname === this.state.workout) {
            const sections = child.val().sections;
            AsyncStorage.setItem(
              this.state.workout,
              JSON.stringify(sections)
            );
            this.props.alertWithType(
              "success",
              "Workout Downloaded",
              "You Downloaded: " + this.state.workout
            );
          }
        });
      });
    }
  };

  handleLongPress = () => {
    this.setModalVisible(true);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" translucent={false} />
        <DeleteModal // pop up to ask for download
          modalVisible={this.state.modalVisible}
          download={true}
          onDownloadPress={() => {
            this.setModalVisible(!this.state.modalVisible),
              this.setState({ downloaded: true }),
              this.downloadItem();
          }}
          onCancelPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        />
        <FlatList
          data={this.state.workoutList}
          renderItem={({ item }) => (
            <ListItem
              bigText={true}
              text={item.workoutname}
              userName={item.user}
              date={item.date}
              online={true}
              selected={false}
              onPress={() => this.handlePress(item.workoutname)}
              onLongPress={() => {
                this.handleLongPress(),
                  this.setState({ workout: item.workoutname });
              }}
              delayLongPress={500}
              customIcon={
                <Ionicons
                  name="arrow-forward"
                  size={23}
                  color={ICON_COLOR}
                />
              }
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={placeHolder(replacementText)}
        />
      </View>
    );
  }
}

export default connectAlert(OnlineWorkouts);
