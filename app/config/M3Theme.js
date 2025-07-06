// Material Design 3 Theme System
// Basierend auf: https://m3.material.io/

export const M3Colors = {
  // Primary Colors - M3 Green Palette (perfekt für Fitness-Apps)
  primary: '#006C51', // M3 Green 800
  onPrimary: '#FFFFFF',
  primaryContainer: '#6FF9D1', // M3 Green 200
  onPrimaryContainer: '#00201A',
  
  // Secondary Colors
  secondary: '#4C6358', // M3 Green 700
  onSecondary: '#FFFFFF',
  secondaryContainer: '#CFE9DB', // M3 Green 100
  onSecondaryContainer: '#092017',
  
  // Tertiary Colors
  tertiary: '#3D6373', // M3 Blue Grey 700
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#C1E8FC', // M3 Blue Grey 100
  onTertiaryContainer: '#001F2A',
  
  // Error Colors
  error: '#BA1A1A', // M3 Red 700
  onError: '#FFFFFF',
  errorContainer: '#FFDAD6', // M3 Red 100
  onErrorContainer: '#410002',
  
  // Surface Colors
  surface: '#FBFDF9', // M3 Surface mit leichtem Grün-Stich
  onSurface: '#191C1A',
  surfaceVariant: '#DCE5DD', // M3 Surface Variant
  onSurfaceVariant: '#404943',
  
  // Outline Colors
  outline: '#707973',
  outlineVariant: '#BFC9C2',
  
  // Background Colors
  background: '#FBFDF9',
  onBackground: '#191C1A',
  
  // Inverse Colors
  inverseSurface: '#2E312F',
  inverseOnSurface: '#E0E3DF',
  inversePrimary: '#4DDCB4', // M3 Green 400
  
  // Shadow Colors
  shadow: '#000000',
  scrim: '#000000',
  
  // Elevation Colors
  elevation: {
    level0: 'transparent',
    level1: '#FBFDF9',
    level2: '#F5F8F4',
    level3: '#EFF2EE',
    level4: '#E9ECE8',
    level5: '#E3E6E2'
  }
};

export const M3Typography = {
  displayLarge: {
    fontFamily: "Roboto",
    fontSize: 57,
    fontWeight: "400",
    letterSpacing: -0.25,
    lineHeight: 64,
    color: M3Colors.onSurface,
  },
  displayMedium: {
    fontFamily: "Roboto",
    fontSize: 45,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 52,
    color: M3Colors.onSurface,
  },
  displaySmall: {
    fontFamily: "Roboto",
    fontSize: 36,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 44,
    color: M3Colors.onSurface,
  },
  headlineLarge: {
    fontFamily: "Roboto",
    fontSize: 32,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 40,
    color: M3Colors.onSurface,
  },
  headlineMedium: {
    fontFamily: "Roboto",
    fontSize: 28,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 36,
    color: M3Colors.onSurface,
  },
  headlineSmall: {
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 32,
    color: M3Colors.onSurface,
  },
  titleLarge: {
    fontFamily: "Roboto",
    fontSize: 22,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 28,
    color: M3Colors.onSurface,
  },
  titleMedium: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.15,
    lineHeight: 24,
    color: M3Colors.onSurface,
  },
  titleSmall: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 20,
    color: M3Colors.onSurface,
  },
  bodyLarge: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 0.5,
    lineHeight: 24,
    color: M3Colors.onSurfaceVariant,
  },
  bodyMedium: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.25,
    lineHeight: 20,
    color: M3Colors.onSurfaceVariant,
  },
  bodySmall: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.4,
    lineHeight: 16,
    color: M3Colors.onSurfaceVariant,
  },
  labelLarge: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 20,
    color: M3Colors.onSurfaceVariant,
  },
  labelMedium: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 16,
    color: M3Colors.onSurfaceVariant,
  },
  labelSmall: {
    fontFamily: "Roboto",
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 16,
    color: M3Colors.onSurfaceVariant,
  },
};

export const M3Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const M3BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 28,
  round: 50,
};

export const M3Elevation = {
  level0: {
    shadowColor: M3Colors.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  level1: {
    shadowColor: M3Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  level2: {
    shadowColor: M3Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  level3: {
    shadowColor: M3Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 8,
  },
  level4: {
    shadowColor: M3Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 10,
  },
  level5: {
    shadowColor: M3Colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

// M3 Component Styles
export const M3ComponentStyles = {
  // Card Styles
  card: {
    backgroundColor: M3Colors.surface,
    borderRadius: M3BorderRadius.lg,
    padding: M3Spacing.lg,
    margin: M3Spacing.md,
    ...M3Elevation.level1,
  },
  
  // Button Styles
  button: {
    height: 56,
    borderRadius: M3BorderRadius.xxl,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: M3Spacing.lg,
    ...M3Elevation.level1,
  },
  
  // FAB Styles
  fab: {
    width: 80,
    height: 80,
    borderRadius: M3BorderRadius.round,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: M3Spacing.lg,
    right: M3Spacing.lg,
    ...M3Elevation.level5,
  },
  
  // Search Bar Styles
  searchBar: {
    backgroundColor: M3Colors.surface,
    borderRadius: M3BorderRadius.xxl,
    paddingHorizontal: M3Spacing.lg,
    paddingVertical: M3Spacing.md,
    borderWidth: 1,
    borderColor: M3Colors.outline,
    ...M3Elevation.level1,
  },
  
  // Bottom Sheet Styles
  bottomSheet: {
    backgroundColor: M3Colors.surface,
    borderTopLeftRadius: M3BorderRadius.xxl,
    borderTopRightRadius: M3BorderRadius.xxl,
    padding: M3Spacing.lg,
    paddingTop: M3Spacing.md,
    ...M3Elevation.level3,
  },
};

// M3 Theme Hook (für React Native)
export const useM3Theme = () => {
  return {
    colors: M3Colors,
    typography: M3Typography,
    spacing: M3Spacing,
    borderRadius: M3BorderRadius,
    elevation: M3Elevation,
    componentStyles: M3ComponentStyles,
  };
};

export default {
  colors: M3Colors,
  typography: M3Typography,
  spacing: M3Spacing,
  borderRadius: M3BorderRadius,
  elevation: M3Elevation,
  componentStyles: M3ComponentStyles,
}; 