import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions, StyleSheet } from "react-native";

const containerWidth = Dimensions.get("window").width;

export default EStyleSheet.create({
  // M3 Surface Container
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBFDF9", // M3 Surface Color
  },
  
  // M3 Surface Container für Create Workouts
  CWcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBFDF9", // M3 Surface Color
  },
  
  // M3 Surface Variant Container für Listen
  Listcontainer: {
    flex: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCE5DD", // M3 Surface Variant
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12, // M3 Standard Border Radius
    // M3 Elevation Level 1
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  
  // M3 Surface Container für Workouts
  Workoutcontainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FBFDF9", // M3 Surface Color
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    // M3 Elevation Level 1
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  
  // M3 Search Container
  Searchcontainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FBFDF9", // M3 Surface Color
    width: containerWidth - 32, // Padding berücksichtigen
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 28, // M3 Search Bar Radius
    borderColor: "#707973", // M3 Outline Color
    borderWidth: 1,
    // M3 Elevation Level 1
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  
  // Neue M3 Container für verschiedene Elevation Levels
  surfaceContainerLow: {
    backgroundColor: "#F5F8F4", // M3 Surface Container Low
    borderRadius: 12,
    padding: 16,
    margin: 8,
    // M3 Elevation Level 1
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  
  surfaceContainerHigh: {
    backgroundColor: "#EFF2EE", // M3 Surface Container High
    borderRadius: 12,
    padding: 16,
    margin: 8,
    // M3 Elevation Level 2
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // M3 Card Container
  cardContainer: {
    backgroundColor: "#FBFDF9", // M3 Surface Color
    borderRadius: 16, // M3 Card Radius
    padding: 16,
    margin: 8,
    // M3 Elevation Level 1
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  
  // M3 Bottom Sheet Container
  bottomSheetContainer: {
    backgroundColor: "#FBFDF9", // M3 Surface Color
    borderTopLeftRadius: 28, // M3 Bottom Sheet Radius
    borderTopRightRadius: 28,
    padding: 24,
    paddingTop: 16,
    // M3 Elevation Level 3
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 8,
  }
});
