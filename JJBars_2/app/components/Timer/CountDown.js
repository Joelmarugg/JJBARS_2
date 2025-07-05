import React, { Component } from "react";

import { Text, View, Platform, Vibration } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { Audio } from "expo-av";

import Reps from "../List/Reps";
import CountDownButton from "../Button/CounDownButton";

const ICON_COLOR = "#868686";
const ICON_SIZE = 20;

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.timer,
      icon: "play-circle",
      preTimer: false,
      preTime: 3
    };
  }

  componentDidMount() {
    // Audio-Modus wird automatisch verwaltet
  }

  startTimer = () => {
    if (this.state.icon === "refresh-circle") {
      this.setState({ timer: this.props.timer });
      this.setState({ preTime: 3 });
      this.setState({ icon: "play-circle" });
    } else if (this.state.icon === "play-circle") {
      this.setState({ icon: "pause-circle" });
      this.setState({ preTimer: true });
      
      this.timeout1 = setTimeout(() => {
        this.setState({ preTimer: false });
        this.clockCall = setInterval(() => {
          this.decrementClock();
        }, 1000);
        
        // Start-Sound direkt nach dem 3-Sekunden-Countdown
        this.makeSound("start");
      }, 3000);
      this.clockCall2 = setInterval(() => {
        this.setState(prevstate => ({ preTime: prevstate.preTime - 1 }));
        if (this.state.preTime === 0) {
          clearInterval(this.clockCall2);
        }
      }, 1000);
    } else {
      this.setState({ preTime: 3 });
      clearInterval(this.clockCall);
      this.setState(prevstate => ({ timer: prevstate.timer }));
      this.setState({ icon: "play-circle" });
    }
  };

  decrementClock = async () => {
    if (this.state.timer === 1) {
      // Sound und Vibration bei der letzten Sekunde
      this.makeSound("finish");
    }
    
    if (this.state.timer === 0) {
      // Timer ist fertig
      clearInterval(this.clockCall);
      this.setState({ icon: "refresh-circle" });
    } else {
      this.setState(prevstate => ({ timer: prevstate.timer - 1 }));
    }
  };

  makeSound = async sound => {
    try {
      if (sound === "start") {
        // Start-Sound und Vibration einmal
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(require("../../../assets/sounds/Beep.mp3"));
        await soundObject.playAsync();
        Vibration.vibrate(250);
        setTimeout(async () => {
          try {
            await soundObject.stopAsync();
            await soundObject.unloadAsync();
          } catch (error) {
            // Fehler beim Aufräumen ignorieren
          }
        }, 1000);
      } else if (sound === "finish") {
        // Finish-Sound und Vibration zweimal
        const playSound = async () => {
          const soundObject = new Audio.Sound();
          await soundObject.loadAsync(require("../../../assets/sounds/Beep.mp3"));
          await soundObject.playAsync();
          Vibration.vibrate(250);
          setTimeout(async () => {
            try {
              await soundObject.stopAsync();
              await soundObject.unloadAsync();
            } catch (error) {
              // Fehler beim Aufräumen ignorieren
            }
          }, 1000);
        };
        await playSound();
        setTimeout(async () => {
          await playSound();
        }, 500);
      }
    } catch (error) {
      // Fehler beim Abspielen ignorieren
    }
  };

  _onPlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.didJustFinish) {
      // Sound ist fertig
    }
  };

  componentWillUnmount() {
    clearInterval(this.clockCall);
    clearInterval(this.clockCall2);
    clearTimeout(this.timeout1);
  }

  render() {
    let ele;

    if (this.state.timer === 0) {
      ele = <Reps repText={"Time's Up!"} />;
    } else {
      ele = <Reps number={this.state.timer} repText={"Secs"} />;
    }

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "30%"
        }}
      >
        <CountDownButton
          onPress={this.startTimer}
          disabled={this.state.preTimer}
          customIcon={
            <Ionicons
              name={this.state.icon}
            />
          }
        />

        {this.state.preTimer ? (
          <Text style={styles.pretext}>{"Gooo in " + this.state.preTime}</Text>
        ) : (
          ele
        )}
      </View>
    );
  }
}

export default CountDown;
