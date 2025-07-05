import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TouchableHighlight,
  Animated,
  PanResponder,
  Platform
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import Reps from "./Reps";

const ICON_PREFIX = Platform.OS === "ios" ? "ios" : "md";
const ICON_COLOR = "#868686";
const ICON_SIZE = 23;

export default class SectionHeader extends React.Component {
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
          style={[imageStyle, styles.animView, this.props.style]}
        >
          <TouchableHighlight
            onPress={this.props.onPress}
            onLongPress={this.props.onLongPress}
            delayLongPress={this.props.delayLongPress}
            style={{ borderRadius: 10, flex: 1 }}
            editing={this.props.editing}
          >
            {this.props.editing ? (
              <View style={styles.editinground}>
                <Text style={styles.editingroundText}>{this.props.text}</Text>

                {this.props.selected ? (
                  <Reps
                    number={this.props.number}
                    repText={this.props.repText}
                  />
                ) : null}
              </View>
            ) : (
              <View style={styles.round}>
                <Text style={styles.roundText}>{this.props.text}</Text>

                {this.props.selected ? (
                  <Reps
                    number={this.props.number}
                    repText={this.props.repText}
                  />
                ) : null}
              </View>
            )}
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
        <TouchableHighlight
          onPress={this.props.onPress}
          onLongPress={this.props.onLongPress}
          delayLongPress={this.props.delayLongPress}
          style={[{ borderRadius: 10, flex: 1 }, this.props.style]}
          editing={this.props.editing}
        >
          {this.props.editing ? (
            <View style={styles.editinground}>
              <Text style={styles.editingroundText}>{this.props.text}</Text>

              {this.props.selected ? (
                <Reps number={this.props.number} repText={this.props.repText} />
              ) : null}
            </View>
          ) : (
            <View style={styles.round}>
              <Text style={styles.roundText}>{this.props.text}</Text>

              {this.props.selected ? (
                <Reps number={this.props.number} repText={this.props.repText} />
              ) : null}
            </View>
          )}
        </TouchableHighlight>
      );
    }
  }
}

SectionHeader.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  selected: PropTypes.bool,
  number: PropTypes.number,
  repText: PropTypes.string,
  draggable: PropTypes.bool,
  delayLongPress: PropTypes.number,
  editing: PropTypes.bool
};
