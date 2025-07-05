import React from "react";
import { View } from "react-native";
import DropdownAlert from "react-native-dropdownalert";

// Erstelle einen Context
export const AlertContext = React.createContext();

class AlertProvider extends React.Component {
  constructor(props) {
    super(props);
    this.dropdown = React.createRef();
  }

  alertWithType = (...args) => {
    if (this.dropdown.current) {
      this.dropdown.current.alertWithType(...args);
    }
  };

  alert = (...args) => {
    if (this.dropdown.current) {
      this.dropdown.current.alert(...args);
    }
  };

  render() {
    return (
      <AlertContext.Provider
        value={{
          alertWithType: this.alertWithType,
          alert: this.alert,
        }}
      >
        <View style={{ flex: 1 }}>
          {React.Children.only(this.props.children)}
          <DropdownAlert translucent={true} ref={this.dropdown} />
        </View>
      </AlertContext.Provider>
    );
  }
}

export default AlertProvider;
