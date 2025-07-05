import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get('window');

const ExerciseActionModal = props => {
  const {
    modalVisible,
    onCancel,
    onDelete,
    onDragDrop,
    showDragDrop = true
  } = props;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (modalVisible) {
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
      ]).start();
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

  const handleAction = (action) => {
    onCancel(); // Close modal first
    setTimeout(() => {
      if (action === 'delete' && onDelete) onDelete();
      if (action === 'dragdrop' && onDragDrop) onDragDrop();
    }, 150);
  };

  const styles = {
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.32)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    
    modalContainer: {
      width: Math.min(screenWidth - 40, 280),
      maxWidth: '100%',
      backgroundColor: '#fff',
      borderRadius: 16,
      elevation: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
      overflow: 'hidden',
    },
    
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: '#222',
      textAlign: 'center',
    },
    
    content: {
      paddingVertical: 8,
    },
    
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      minHeight: 56,
    },
    
    actionIcon: {
      width: 24,
      height: 24,
      marginRight: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    actionText: {
      fontSize: 16,
      color: '#222',
      flex: 1,
    },
    
    separator: {
      height: 1,
      backgroundColor: '#e0e0e0',
      marginHorizontal: 20,
    },
    
    cancelButton: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      minHeight: 56,
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
    },
    
    cancelText: {
      fontSize: 16,
      color: '#dc3545',
      textAlign: 'center',
      fontWeight: '600',
    }
  };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="none"
      onRequestClose={onCancel}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.header}>
            <Text style={styles.title}>Übung bearbeiten</Text>
          </View>
          
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleAction('delete')}
              activeOpacity={0.7}
            >
              <View style={styles.actionIcon}>
                <MaterialIcons name="delete-outline" size={20} color="#dc3545" />
              </View>
              <Text style={[styles.actionText, { color: '#dc3545' }]}>Löschen</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
            
            <View style={styles.separator} />
            
            {showDragDrop && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleAction('dragdrop')}
                activeOpacity={0.7}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name="move-outline" size={20} color="#006C51" />
                </View>
                <Text style={styles.actionText}>Drag & Drop aktivieren</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
          
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelText}>Abbrechen</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

ExerciseActionModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onDragDrop: PropTypes.func,
  showDragDrop: PropTypes.bool
};

export default ExerciseActionModal; 