import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  AccessibilityInfo,
  Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { M3Colors, M3Typography, M3Spacing, M3BorderRadius } from "../../config/M3Theme";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const PopUpModal = props => {
  const {
    title = null,
    value = '',
    onSave,
    onCancel,
    onChangeText,
    onPress,
    onPress2,
    modalVisible,
    buttonText = "Reps",
    showRepSecButton = false
  } = props;

  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value, modalVisible]);

  useEffect(() => {
    if (modalVisible) {
      Keyboard.dismiss();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 350);
    }
  }, [modalVisible]);

  useEffect(() => {
    if (modalVisible) {
      // Accessibility: Announce modal opening
      AccessibilityInfo.announceForAccessibility('Modal geöffnet');
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 225,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 9,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Auto-focus input after animation
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      });
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [modalVisible]);

  const handleSave = () => {
    if (onSave) onSave(inputValue);
    if (onPress) onPress();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleRepSecToggle = () => {
    if (onPress2) onPress2();
  };

  const handleBackdropPress = () => {
    // Only close on backdrop press, not on modal content
  };

  const styles = {
    // Overlay with scrim (M3 standard)
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.32)', // M3 scrim color
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: M3Spacing.lg,
    },
    
    // Modal container with M3 elevation
    modalContainer: {
      width: Math.min(screenWidth - M3Spacing.lg * 2, 400),
      maxWidth: '100%',
      backgroundColor: M3Colors.surface,
      borderRadius: M3BorderRadius.xl,
      elevation: 6, // M3 elevation level 6
      shadowColor: M3Colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
      overflow: 'hidden',
    },
    
    // Header section
    header: {
      paddingHorizontal: M3Spacing.lg,
      paddingTop: M3Spacing.lg,
      paddingBottom: M3Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: M3Colors.outlineVariant,
    },
    
    title: {
      ...M3Typography.headlineSmall,
      color: M3Colors.onSurface,
      lineHeight: 32,
    },
    
    // Content section
    content: {
      paddingHorizontal: M3Spacing.lg,
      paddingVertical: M3Spacing.lg,
    },
    
    // Input container with M3 filled text field style
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: M3Spacing.md,
      marginBottom: M3Spacing.lg,
    },
    
    // M3 filled text field
    inputWrapper: {
      flex: 1,
      position: 'relative',
    },
    
    input: {
      height: 56,
      backgroundColor: M3Colors.surfaceVariant,
      borderRadius: M3BorderRadius.md,
      paddingHorizontal: M3Spacing.md,
      paddingTop: M3Spacing.md,
      paddingBottom: M3Spacing.sm,
      ...M3Typography.bodyLarge,
      color: M3Colors.onSurface,
      borderWidth: 2,
      borderColor: isFocused ? M3Colors.primary : M3Colors.outlineVariant,
    },
    
    inputLabel: {
      position: 'absolute',
      left: M3Spacing.md,
      top: isFocused || inputValue ? 8 : 18,
      ...M3Typography.bodyMedium,
      color: isFocused ? M3Colors.primary : M3Colors.onSurfaceVariant,
      fontSize: isFocused || inputValue ? 12 : 16,
      zIndex: 1,
    },
    
    // M3 filled tonal button for Rep/Sec toggle
    repSecButton: {
      height: 56,
      backgroundColor: M3Colors.secondaryContainer,
      borderRadius: M3BorderRadius.md,
      paddingHorizontal: M3Spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 80,
      elevation: 1,
      shadowColor: M3Colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    
    repSecButtonText: {
      ...M3Typography.labelLarge,
      color: M3Colors.onSecondaryContainer,
      fontWeight: '600',
    },
    
    // Actions section with M3 button layout
    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: M3Spacing.sm,
      paddingTop: M3Spacing.sm,
    },
    
    // M3 text button (cancel)
    textButton: {
      paddingHorizontal: M3Spacing.lg,
      paddingVertical: M3Spacing.sm,
      borderRadius: M3BorderRadius.md,
      minHeight: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    
    textButtonText: {
      ...M3Typography.labelLarge,
      color: M3Colors.primary,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.1,
    },
    
    // M3 filled button (save)
    filledButton: {
      paddingHorizontal: M3Spacing.lg,
      paddingVertical: M3Spacing.sm,
      borderRadius: M3BorderRadius.md,
      minHeight: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: M3Colors.primary,
      elevation: 2,
      shadowColor: M3Colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    
    filledButtonText: {
      ...M3Typography.labelLarge,
      color: M3Colors.onPrimary,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.1,
    },
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCancel}
      statusBarTranslucent={true}
    >
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent={true}
      />
      <Animated.View 
        style={[
          styles.overlay,
          { opacity: fadeAnim }
        ]}
      >
        <TouchableOpacity 
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          activeOpacity={1} 
          onPress={handleBackdropPress}
          accessible={true}
          accessibilityLabel="Modal schließen"
        />
        <Animated.View 
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          <TouchableOpacity 
            activeOpacity={1}
            accessible={true}
            accessibilityLabel={title || `${buttonText} eingeben`}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>
                {title ? title : `${buttonText} eingeben`}
              </Text>
            </View>
            
            {/* Content */}
            <View style={styles.content}>
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>
                    Anzahl
                  </Text>
                  <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={inputValue}
                    onChangeText={text => {
                      setInputValue(text);
                      if (onChangeText) onChangeText(text);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder=""
                    placeholderTextColor={M3Colors.onSurfaceVariant}
                    keyboardType="numeric"
                    returnKeyType="done"
                    onSubmitEditing={handleSave}
                    accessible={true}
                    accessibilityLabel="Anzahl eingeben"
                    accessibilityHint="Geben Sie die Anzahl der Wiederholungen oder Sekunden ein"
                  />
                </View>
                
                {showRepSecButton && (
                  <TouchableOpacity 
                    style={styles.repSecButton}
                    onPress={handleRepSecToggle}
                    activeOpacity={0.7}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel={`Wechseln zwischen ${buttonText}`}
                  >
                    <Text style={styles.repSecButtonText}>
                      {buttonText}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              
              {/* Actions */}
              <View style={styles.actions}>
                <TouchableOpacity 
                  style={styles.textButton}
                  onPress={handleCancel}
                  activeOpacity={0.7}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Abbrechen"
                >
                  <Text style={styles.textButtonText}>
                    Abbrechen
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.filledButton}
                  onPress={handleSave}
                  activeOpacity={0.7}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Speichern"
                >
                  <Text style={styles.filledButtonText}>
                    Speichern
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

PopUpModal.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  value: PropTypes.string,
  title: PropTypes.string,
  showRepSecButton: PropTypes.bool,
  onPress: PropTypes.func,
  onPress2: PropTypes.func,
  modalVisible: PropTypes.bool,
  onChangeText: PropTypes.func,
  buttonText: PropTypes.string,
};

export default PopUpModal; 