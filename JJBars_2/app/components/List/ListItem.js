import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  Animated,
  PanResponder,
  Platform,
  TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import Reps from "./Reps";
import CountDown from "../Timer/CountDown";

const ICON_PREFIX = Platform.OS === "ios" ? "ios" : "md";
const TOUCH_ITEM =
  Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;
const ICON_COLOR = "#868686";
const ICON_SIZE = 23;

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1)
    };

    // Initialize PanResponder immediately
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,

      onPanResponderMove: Animated.event([null, { dy: this.state.pan.y }], {
        useNativeDriver: false
      }),

      onPanResponderGrant: (e, gesture) => {
        Animated.spring(this.state.scale, {
          toValue: 1.1,
          friction: 6,
          useNativeDriver: false
        }).start();
      },

      onPanResponderRelease: (e, gesture) => {
        Animated.spring(this.state.scale, { toValue: 1, friction: 6, useNativeDriver: false }).start();
        if (this.isDropArea() === "smaller") {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: +50 },
            useNativeDriver: false
          }).start(this.props.onDown);

          setTimeout(() => {
            Animated.spring(this.state.pan, {
              toValue: { x: 0, y: 0 },
              friction: 8,
              tension: 2,
              useNativeDriver: false
            }).start();
          }, 300);
        } else if (this.isDropArea() === "bigger") {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: -50 },
            useNativeDriver: false
          }).start(this.props.onUp);

          setTimeout(() => {
            Animated.spring(this.state.pan, {
              toValue: { x: 0, y: 0 },
              friction: 8,
              tension: 2,
              useNativeDriver: false
            }).start();
          }, 300);
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            tension: 80,
            useNativeDriver: false
          }).start();
        }
      }
    });
  }

  componentDidMount() {
    // Add a listener for the delta value change
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener(value => (this._val = value));
  }

  isDropArea() {
    if (this._val.y > 50) {
      return "smaller";
    } else if (this._val.y < -50) {
      return "bigger";
    }
  }

  render() {
    if (this.props.draggable) {
      let { pan } = this.state;

      // Calculate the x and y transform from the pan value
      let [translateX, translateY] = [pan.x, pan.y];
      let scale = this.state.scale;

      let rotate = "0deg";

      let imageStyle = {
        transform: [{ translateX }, { translateY }, { rotate }, { scale }]
      };

      return (
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[imageStyle, styles.animView]}
        >
          <TouchableHighlight
            onPress={this.props.onPress}
            onLongPress={this.props.onLongPress}
            delayLongPress={this.props.delayLongPress}
            style={{ borderRadius: 10, flex: 1, maxWidth: '80%' }}
          >
            <View style={[this.props.style, { flexDirection: 'row', alignItems: 'center', height: 68, paddingHorizontal: 16, backgroundColor: '#fff' }]}>
              <Text style={{ flex: 1, fontSize: 14, color: "#333", textAlign: "left", overflow: "hidden", lineHeight: 20, height: '100%', minHeight: 68, textAlignVertical: 'center' }}>
                {this.props.text}
              </Text>
              <Text style={{ fontSize: 12, color: "#666", marginLeft: 8 }}>
                {this.props.number}{'\n'}{this.props.repText}
              </Text>
            </View>
          </TouchableHighlight>
          <View
            style={{
              paddingLeft: 4,
              flexDirection: "column",
              backgroundColor: "#fff"
            }}
          >
            <Ionicons
              name="reorder-three"
              color="#0066CC"
              size={ICON_SIZE}
              style={{}}
            />
          </View>
        </Animated.View>
      );
    } else {
      return (
        <TOUCH_ITEM
          onPress={this.props.onPress}
          onLongPress={this.props.onLongPress}
          delayLongPress={this.props.delayLongPress}
          style={{ borderRadius: 10 }}
        >
          <View style={styles.row}>
            {this.props.bigText ? (
              <View>
                {this.props.online ? (
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.bigtextWithInfo}>
                      {this.props.text}
                    </Text>
                    <Text style={styles.info}>
                      Uploaded by: {this.props.userName} on {this.props.date}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.bigtext}>{this.props.text}</Text>
                )}
              </View>
            ) : this.props.selected ? (
              <Text style={styles.text}>{this.props.text}</Text>
            ) : (
              <View style={{ flexDirection: "column", paddingVertical: 15 }}>
                <Text style={styles.textUnselected}>{this.props.text}</Text>
                {this.props.musclegroup == null ? null : (
                  <Text style={styles.textmusclegroup}>
                    {this.props.musclegroup}
                  </Text>
                )}
              </View>
            )}

            {this.props.countDown ? (
              <CountDown timer={this.props.number} />
            ) : null}
            {this.props.selected && !this.props.countDown ? (
              <Reps number={this.props.number} repText={this.props.repText} />
            ) : null}
            {this.props.customIcon}
          </View>
        </TOUCH_ITEM>
      );
    }
  }
}

ListItem.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  selected: PropTypes.bool,
  number: PropTypes.number,
  repText: PropTypes.string,
  customIcon: PropTypes.element,
  draggable: PropTypes.bool,
  delayLongPress: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
