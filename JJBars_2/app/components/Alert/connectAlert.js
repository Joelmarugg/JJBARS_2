import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { AlertContext } from "./AlertProvider";

const connectAlert = WrappedComponent => {
  function ConnectedAlert(props) {
    return (
      <AlertContext.Consumer>
        {({ alertWithType, alert }) => (
          <WrappedComponent
            {...props}
            alertWithType={alertWithType}
            alert={alert}
          />
        )}
      </AlertContext.Consumer>
    );
  }

  return hoistNonReactStatic(ConnectedAlert, WrappedComponent);
};

export default connectAlert;
