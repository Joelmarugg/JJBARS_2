import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  SectionList,
  View,
  StatusBar,
  TextInput,
  Platform,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { InteractionManager } from "react-native";

import {
  ListItem,
  Separator,
  placeHolder,
  LoadingIcon,
  SectionHeader
} from "../components/List";
import { PopUpModal, ExerciseActionModal } from "../components/Modal";
import { connectAlert } from "../components/Alert";
import { FloatingActionButton } from "../components/Button";
import { ensureDatabaseLoaded } from "../dbUtils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA"
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff"
  },
  workoutInput: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginRight: 8
  },
  saveButton: {
    backgroundColor: "#006C51",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16
  },
  listsContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 12,
    gap: 12
  },
  listBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 0,
    overflow: "hidden",
    minHeight: 200,
    elevation: 1
  },
  searchBarRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FAFAFA",
    marginRight: 80
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    textAlignVertical: 'center',
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    zIndex: 20
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f4f4f4"
  },
  sectionHeaderActive: {
    backgroundColor: "#e0f7ef"
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222"
  },
  sectionTimes: {
    fontSize: 13,
    color: "#666",
    marginLeft: 8
  },
  sectionActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    height: ITEM_HEIGHT,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    overflow: "hidden"
  },
  exerciseText: {
    flex: 1,
    width: 0,
    fontSize: 14,
    color: "#333",
    textAlign: "left",
    overflow: "hidden",
    lineHeight: 20,
    height: '100%',
    minHeight: 68,
    textAlignVertical: 'center',
  },
  exerciseReps: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8
  },
  emptySection: {
    paddingVertical: 12,
    alignItems: "center"
  },
  emptyText: {
    color: "#999",
    fontSize: 13,
    fontStyle: "italic"
  }
});

const ITEM_HEIGHT = 68;

function CreateWorkoutsWithSafeArea(props) {
  const insets = useSafeAreaInsets();
  return <CreateWorkouts {...props} safeAreaInsets={insets} />;
}

class CreateWorkouts extends Component {
  constructor(props) {
    super(props);
    this.sectionListRef = React.createRef();
    this.visibleItems = { sections: [], items: [] };
    this.state = {
      exerciseList: [],
      numberOfReps: 10,
      repText: "Reps",
      modalVisible: false,
      itemTitle: "",
      id: 0,
      workoutTitle: "",
      workoutTitleList: [],
      numberOfRounds: 3,
      edit: false,
      sections: [
        {
          title: "Round 1",
          times: 3,
          data: []
        }
      ],
      activeSectionIndex: 0,
      editTimesModalVisible: false,
      timesEditValue: '',
      timesEditSectionIdx: null,
      editExerciseModalVisible: false,
      exerciseEditValue: '',
      exerciseEditSectionIdx: null,
      exerciseEditItemIdx: null,
      exerciseEditRepText: 'Reps',
      modalValue: '',
      // Drag & Drop States
      dragDropActive: false,
      dragDropType: '', // 'round' or 'exercise'
      dragDropSectionIdx: null,
      dragDropItemIdx: null,
      // Exercise Action Modal
      exerciseActionModalVisible: false,
      exerciseActionSectionIdx: null,
      exerciseActionItemIdx: null,
      // DB-Ready State
      dbReady: false
    };
  }

  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func
  };

  async componentDidMount() {
    this.setState({ dbReady: false });
    try {
      this.db = await ensureDatabaseLoaded();
      this.setState({ dbReady: true });
      const title = this.props.route?.params?.title;
      if (title && title !== "Create Workout") {
        await this.loadEditWorkout(title);
      }
      if (this.db) {
        this.updateList();
      }
      this.loadAllWorkouts();
    } catch (error) {
      this.props.alertWithType(
        "error",
        "DB Fehler",
        "Die Datenbank konnte nicht geladen werden."
      );
    }
  }

  loadEditWorkout = async (title) => {
    const woTitle = title;
    this.setState({
      edit: true,
      workoutTitle: title
    });
    const section = await AsyncStorage.getItem(woTitle);
    const oldSections = JSON.parse(section);
    this.setState({
      sections: oldSections,
      activeSectionIndex: oldSections.length > 0 ? oldSections.length - 1 : 0
    });
  };

  storeWorkout = async woTitle => {
    try {
      await AsyncStorage.setItem(
        woTitle,
        JSON.stringify(this.state.sections)
      );
    } catch (error) {
      // Fehler beim Speichern ignorieren
    }
  };

  updateList = async () => {
    try {
      const result = await this.db.getAllAsync(
        "SELECT exercises.exercise_name, category.muscle_group, exercises.difficulty FROM exercises JOIN ex_cat ON exercises.exercise_name = ex_cat.exercise_name JOIN category ON category.muscle_group = ex_cat.muscle_group"
      );
      this.setState({ exerciseList: result });
    } catch (error) {
      this.props.alertWithType(
        "error",
        "Datenbank Fehler",
        "Konnte Übungen nicht laden."
      );
    }
  };

  filterList = async (query) => {
    try {
      const result = await this.db.getAllAsync(
        `SELECT exercises.exercise_name, category.muscle_group, exercises.difficulty FROM exercises JOIN ex_cat ON exercises.exercise_name = ex_cat.exercise_name JOIN category ON category.muscle_group = ex_cat.muscle_group WHERE exercises.exercise_name LIKE '%${query}%' OR difficulty LIKE '%${query}%' OR category.muscle_group LIKE '%${query}%' GROUP BY exercises.exercise_name`
      );
      this.setState({ exerciseList: result });
    } catch (error) {
      this.props.alertWithType(
        "error",
        "Datenbank Fehler",
        "Konnte Übungen nicht filtern."
      );
    }
  };

  setModalVisible(visible) {
    this.setState({ 
      modalVisible: visible,
      modalValue: visible ? this.state.numberOfReps.toString() : ''
    });
  }

  onNumberChanged(text) {
    var num = parseInt(text);
    if (isNaN(num)) {
      // Don't close modal, just don't update the state
      // The new modal has better validation
    } else {
      this.setState({ 
        numberOfReps: num,
        modalValue: text
      });
    }
  }

  scrollToEndOfSectionList = () => {
    const { sections, activeSectionIndex } = this.state;
    if (!sections || sections.length === 0) return;
    const sectionIndex = activeSectionIndex;
    const lastSection = sections[sectionIndex];
    const itemIndex = lastSection.data.length > 0 ? lastSection.data.length - 1 : 0;
    if (lastSection.data.length === 0) {
      if (this.sectionListRef.current) {
        this.sectionListRef.current.scrollToLocation({
          sectionIndex,
          itemIndex: 0,
          animated: true,
          viewPosition: 0
        });
      }
    } else {
      if (this.sectionListRef.current) {
        this.sectionListRef.current.scrollToLocation({
          sectionIndex,
          itemIndex,
          animated: true,
          viewPosition: 0.5
        });
      }
    }
  };

  addExerciseToList = item => {
    this.setState(prevState => {
      const newSections = prevState.sections.map((section, idx) => {
        if (idx === prevState.activeSectionIndex) {
          return {
            ...section,
            data: [
              ...section.data,
              {
                id: prevState.id + 1,
                title: item.exercise_name,
                reps: prevState.numberOfReps,
                repText: prevState.repText
              }
            ]
          };
        }
        return section;
      });
      return {
        sections: newSections,
        id: prevState.id + 1
      };
    }, () => {
      this.scrollToEndOfSectionList();
    });
  };

  addRound = () => {
    this.setState(prevState => {
      const newIndex = prevState.sections.length;
      return {
        sections: [
          ...prevState.sections,
          {
            title: `Round ${newIndex + 1}`,
            times: prevState.numberOfRounds,
            data: []
          }
        ],
        activeSectionIndex: newIndex
      };
    }, () => {
      this.scrollToEndOfSectionList();
    });
  };

  deleteRound = (sectionIdx) => {
    this.setState(prevState => {
      const newSections = prevState.sections.filter((_, idx) => idx !== sectionIdx);
      const updatedSections = newSections.map((section, idx) => ({
        ...section,
        title: `Round ${idx + 1}`
      }));
      return {
        sections: updatedSections,
        activeSectionIndex: updatedSections.length > 0 ? updatedSections.length - 1 : 0
      };
    });
  };

  setActiveSection = (sectionIdx) => {
    this.setState({ activeSectionIndex: sectionIdx });
  };

  handlePressSaveButton = () => {
    let ups = false;
    for (let i = 0; i < this.state.workoutTitleList.length; i++) {
      if (
        this.state.workoutTitle === this.state.workoutTitleList[i] &&
        !this.state.edit
      ) {
        ups = true;
      }
    }
    this.setState({ edit: false });
    if (this.state.workoutTitle === "") {
      this.props.alertWithType("error", "Save Workout Failed", "No Title");
    } else if (ups) {
      this.props.alertWithType(
        "warn",
        "Save Workout Failed",
        this.state.workoutTitle + " Already Exists"
      );
    } else {
      this.storeWorkout(this.state.workoutTitle);
      this.props.navigation.popToTop();
    }
  };

  handleTextChange = text => {
    this.setState({ workoutTitle: text });
  };

  changeRepSecs = () => {
    if (this.state.repText !== "Times") {
      const reSe = this.state.repText === "Reps" ? "Secs" : "Reps";
      this.setState({ repText: reSe });
    }
  };

  loadAllWorkouts = async () => {
    const workouts = await AsyncStorage.getAllKeys();
    this.setState({ workoutTitleList: workouts });
  };

  openEditTimesModal = (sectionIdx) => {
    const currentTimes = this.state.sections[sectionIdx]?.times?.toString() || '';
    this.setState({
      editTimesModalVisible: true,
      timesEditValue: currentTimes,
      timesEditSectionIdx: sectionIdx
    });
  };

  closeEditTimesModal = () => {
    this.setState({ editTimesModalVisible: false, timesEditValue: '', timesEditSectionIdx: null });
  };

  saveEditedTimes = (newValue) => {
    const { timesEditSectionIdx, sections } = this.state;
    const newTimes = parseInt(newValue);
    if (isNaN(newTimes) || newTimes < 1) {
      this.props.alertWithType('error', 'Ungültig', 'Bitte gib eine gültige Zahl ein.');
      return;
    }
    const updatedSections = sections.map((section, idx) =>
      idx === timesEditSectionIdx ? { ...section, times: newTimes } : section
    );
    this.setState({
      sections: updatedSections,
      editTimesModalVisible: false,
      timesEditValue: '',
      timesEditSectionIdx: null
    });
  };

  openEditExerciseModal = (sectionIdx, itemIdx) => {
    const exercise = this.state.sections[sectionIdx]?.data[itemIdx];
    if (exercise) {
      this.setState({
        editExerciseModalVisible: true,
        exerciseEditValue: exercise.reps.toString(),
        exerciseEditSectionIdx: sectionIdx,
        exerciseEditItemIdx: itemIdx,
        exerciseEditRepText: exercise.repText
      });
    }
  };

  closeEditExerciseModal = () => {
    this.setState({
      editExerciseModalVisible: false,
      exerciseEditValue: '',
      exerciseEditSectionIdx: null,
      exerciseEditItemIdx: null,
      exerciseEditRepText: 'Reps'
    });
  };

  saveEditedExercise = (newValue) => {
    const { exerciseEditSectionIdx, exerciseEditItemIdx, exerciseEditRepText, sections } = this.state;
    const newReps = parseInt(newValue);
    if (isNaN(newReps) || newReps < 1) {
      this.props.alertWithType('error', 'Ungültig', 'Bitte gib eine gültige Zahl ein.');
      return;
    }
    
    const updatedSections = sections.map((section, sectionIdx) => {
      if (sectionIdx === exerciseEditSectionIdx) {
        const updatedData = section.data.map((item, itemIdx) => {
          if (itemIdx === exerciseEditItemIdx) {
            return {
              ...item,
              reps: newReps,
              repText: exerciseEditRepText
            };
          }
          return item;
        });
        return { ...section, data: updatedData };
      }
      return section;
    });
    
    this.setState({
      sections: updatedSections,
      editExerciseModalVisible: false,
      exerciseEditValue: '',
      exerciseEditSectionIdx: null,
      exerciseEditItemIdx: null,
      exerciseEditRepText: 'Reps'
    });
  };

  changeExerciseRepSecs = () => {
    this.setState(prevState => ({
      exerciseEditRepText: prevState.exerciseEditRepText === "Reps" ? "Secs" : "Reps"
    }));
  };

  confirmDeleteRound = (sectionIdx) => {
    Alert.alert(
      'Runde löschen',
      'Willst du diese Runde wirklich löschen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { text: 'Löschen', style: 'destructive', onPress: () => this.deleteRound(sectionIdx) }
      ]
    );
  };

  // Drag & Drop Functions for Rounds
  moveRoundUp = (sectionIdx) => {
    if (sectionIdx > 0) {
      this.setState(prevState => {
        const newSections = [...prevState.sections];
        const temp = newSections[sectionIdx];
        newSections[sectionIdx] = newSections[sectionIdx - 1];
        newSections[sectionIdx - 1] = temp;
        
        // Update titles
        newSections.forEach((section, idx) => {
          section.title = `Round ${idx + 1}`;
        });
        
        return {
          sections: newSections,
          activeSectionIndex: prevState.activeSectionIndex === sectionIdx ? sectionIdx - 1 : 
                             prevState.activeSectionIndex === sectionIdx - 1 ? sectionIdx : 
                             prevState.activeSectionIndex
        };
      });
    }
  };

  moveRoundDown = (sectionIdx) => {
    this.setState(prevState => {
      if (sectionIdx < prevState.sections.length - 1) {
        const newSections = [...prevState.sections];
        const temp = newSections[sectionIdx];
        newSections[sectionIdx] = newSections[sectionIdx + 1];
        newSections[sectionIdx + 1] = temp;
        
        // Update titles
        newSections.forEach((section, idx) => {
          section.title = `Round ${idx + 1}`;
        });
        
        return {
          sections: newSections,
          activeSectionIndex: prevState.activeSectionIndex === sectionIdx ? sectionIdx + 1 : 
                             prevState.activeSectionIndex === sectionIdx + 1 ? sectionIdx : 
                             prevState.activeSectionIndex
        };
      }
      return prevState;
    });
  };

  // Exercise Action Modal Functions
  openExerciseActionModal = (sectionIdx, itemIdx) => {
    this.setState({
      exerciseActionModalVisible: true,
      exerciseActionSectionIdx: sectionIdx,
      exerciseActionItemIdx: itemIdx
    });
  };

  closeExerciseActionModal = () => {
    this.setState({
      exerciseActionModalVisible: false,
      exerciseActionSectionIdx: null,
      exerciseActionItemIdx: null
    });
  };

  deleteExercise = (sectionIdx, itemIdx) => {
    this.setState(prevState => {
      const newSections = [...prevState.sections];
      if (newSections[sectionIdx] && newSections[sectionIdx].data) {
        newSections[sectionIdx].data.splice(itemIdx, 1);
        return { sections: newSections };
      }
      return prevState;
    });
  };

  handleExerciseDelete = () => {
    const { exerciseActionSectionIdx, exerciseActionItemIdx } = this.state;
    if (exerciseActionSectionIdx !== null && exerciseActionItemIdx !== null) {
      this.deleteExercise(exerciseActionSectionIdx, exerciseActionItemIdx);
      this.closeExerciseActionModal();
    }
  };

  handleExerciseDragDrop = () => {
    // This function is no longer needed since exercises are automatically activated
    // when round drag & drop is activated
    this.closeExerciseActionModal();
  };

  // Drag & Drop Functions for Exercises
  moveExerciseUp = (sectionIdx, itemIdx) => {
    if (itemIdx > 0) {
      this.setState(prevState => {
        const newSections = [...prevState.sections];
        const section = newSections[sectionIdx];
        const temp = section.data[itemIdx];
        section.data[itemIdx] = section.data[itemIdx - 1];
        section.data[itemIdx - 1] = temp;
        return { sections: newSections };
      });
    }
  };

  moveExerciseDown = (sectionIdx, itemIdx) => {
    this.setState(prevState => {
      const section = prevState.sections[sectionIdx];
      if (itemIdx < section.data.length - 1) {
        const newSections = [...prevState.sections];
        const temp = section.data[itemIdx];
        section.data[itemIdx] = section.data[itemIdx + 1];
        section.data[itemIdx + 1] = temp;
        return { sections: newSections };
      }
      return prevState;
    });
  };

  // Round Drag & Drop Toggle
  toggleRoundDragDrop = (sectionIdx) => {
    this.setState(prevState => {
      if (prevState.dragDropActive && prevState.dragDropType === 'round') {
        // Deactivate
        return {
          dragDropActive: false,
          dragDropType: '',
          dragDropSectionIdx: null,
          dragDropItemIdx: null
        };
      } else {
        // Activate
        return {
          dragDropActive: true,
          dragDropType: 'round',
          dragDropSectionIdx: null,
          dragDropItemIdx: null
        };
      }
    });
  };

  // Deactivate Drag & Drop
  deactivateDragDrop = () => {
    this.setState({
      dragDropActive: false,
      dragDropType: '',
      dragDropSectionIdx: null,
      dragDropItemIdx: null
    });
  };

  renderSectionHeader = ({ section, index }) => {
    const isActive = index === this.state.activeSectionIndex;
    const isDragDropActive = this.state.dragDropActive && 
                           this.state.dragDropType === 'round';
    
    if (isDragDropActive) {
      return (
        <SectionHeader
          text={section.title}
          number={section.times}
          repText="x"
          selected={true}
          draggable={true}
          onPress={() => this.openEditTimesModal(index)}
          onLongPress={() => this.toggleRoundDragDrop(index)}
          onUp={() => this.moveRoundUp(index)}
          onDown={() => this.moveRoundDown(index)}
          delayLongPress={500}
        />
      );
    }
    
    return (
      <View style={[styles.sectionHeader, isActive && styles.sectionHeaderActive, { overflow: 'hidden' }]}>
        <TouchableOpacity 
          style={{ position: 'absolute', left: 0, top: 0, right: 'auto', bottom: 0, width: 45, justifyContent: 'center', alignItems: 'center', zIndex: 1 }}
          onPress={() => this.setActiveSection(index)}
          activeOpacity={0.7}
        />
        <View style={{ marginRight: 2, position: 'relative', width: 32, height: 32, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name={isActive ? "checkmark-circle" : "ellipse-outline"} size={20} color={isActive ? "#009e6e" : "#bbb"} />
        </View>
        <TouchableOpacity
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => this.openEditTimesModal(index)}
          onLongPress={() => this.toggleRoundDragDrop(index)}
          delayLongPress={500}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <TouchableOpacity 
              onPress={() => this.openEditTimesModal(index)}
              style={{ marginLeft: 4 }}
              activeOpacity={0.7}
            >
              <Text style={styles.sectionTimes}>{section.times}x</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            onPress={() => this.confirmDeleteRound(index)} 
            style={{ padding: 8 }}
            activeOpacity={0.7}
          >
            <MaterialIcons name="delete" size={20} color="#dc3545" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  renderExercise = ({ item, index, section }) => {
    const sectionIdx = this.state.sections.findIndex(s => s.title === section.title);
    const isDragDropActive = this.state.dragDropActive && 
                           this.state.dragDropType === 'round';
    
    if (isDragDropActive) {
      return (
        <ListItem
          text={item.title}
          number={item.reps}
          repText={item.repText}
          selected={true}
          draggable={true}
          onPress={() => this.openEditExerciseModal(sectionIdx, index)}
          onLongPress={() => this.deactivateDragDrop()}
          onUp={() => this.moveExerciseUp(sectionIdx, index)}
          onDown={() => this.moveExerciseDown(sectionIdx, index)}
          delayLongPress={500}
        />
      );
    }
    
    return (
      <TouchableOpacity 
        style={styles.exerciseRow}
        onPress={() => this.openEditExerciseModal(sectionIdx, index)}
        onLongPress={() => {
          Alert.alert(
            'Übung löschen',
            'Willst du diese Übung wirklich löschen?',
            [
              { text: 'Abbrechen', style: 'cancel' },
              { text: 'Löschen', style: 'destructive', onPress: () => this.deleteExercise(sectionIdx, index) }
            ]
          );
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.exerciseText} includeFontPadding={false}>{item.title}</Text>
        <Text style={styles.exerciseReps}>{item.reps} {item.repText}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { safeAreaInsets = { top: 0, bottom: 0 } } = this.props;
    if (!this.state.dbReady) {
      return (
        <SafeAreaView style={[styles.container, { paddingTop: safeAreaInsets.top, paddingBottom: 16 + safeAreaInsets.bottom }]}> 
          <StatusBar barStyle="dark-content" translucent={false} />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LoadingIcon loadingText={"Lade Datenbank..."} iconColor={"#006C51"} />
          </View>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={[styles.container, { paddingTop: safeAreaInsets.top, paddingBottom: 16 + safeAreaInsets.bottom }]}> 
        <StatusBar barStyle="dark-content" translucent={false} />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.workoutInput}
            value={this.state.workoutTitle}
            editable={!this.state.edit}
            placeholder="Workout Name"
            onChangeText={text => this.handleTextChange(text)}
            clearTextOnFocus={true}
          />
          <TouchableOpacity style={styles.saveButton} onPress={this.handlePressSaveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listsContainer}>
          <View style={styles.listBox}>
            <FlatList
              data={this.state.exerciseList}
              renderItem={({ item }) => (
                <ListItem
                  text={item.exercise_name}
                  musclegroup={item.muscle_group + " / " + item.difficulty}
                  selected={false}
                  onPress={() => {
                    this.setState({ repText: "Reps" });
                    this.setModalVisible(true);
                    this.setState({ itemTitle: item });
                  }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={Separator}
              ListEmptyComponent={LoadingIcon}
            />
          </View>
          <View style={styles.listBox}>
            <PopUpModal
              value={this.state.modalValue}
              onChangeText={text => this.onNumberChanged(text)}
              modalVisible={this.state.modalVisible}
              onSave={() => {
                this.setModalVisible(!this.state.modalVisible);
                this.addExerciseToList(this.state.itemTitle);
              }}
              onCancel={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              onPress2={() => this.changeRepSecs()}
              buttonText={this.state.repText}
              showRepSecButton={true}
            />
            <PopUpModal
              title="Rundenanzahl bearbeiten"
              value={this.state.timesEditValue}
              modalVisible={this.state.editTimesModalVisible}
              onSave={this.saveEditedTimes}
              onCancel={this.closeEditTimesModal}
              showRepSecButton={false}
            />
            <PopUpModal
              title="Übung bearbeiten"
              value={this.state.exerciseEditValue}
              modalVisible={this.state.editExerciseModalVisible}
              onSave={this.saveEditedExercise}
              onCancel={this.closeEditExerciseModal}
              onPress2={this.changeExerciseRepSecs}
              buttonText={this.state.exerciseEditRepText}
              showRepSecButton={true}
            />
            <ExerciseActionModal
              modalVisible={this.state.exerciseActionModalVisible}
              onCancel={this.closeExerciseActionModal}
              onDelete={this.handleExerciseDelete}
              onDragDrop={this.handleExerciseDragDrop}
              showDragDrop={false}
            />
            <SectionList
              sections={this.state.sections}
              renderSectionHeader={({ section }) => this.renderSectionHeader({ section, index: this.state.sections.indexOf(section) })}
              renderItem={this.renderExercise}
              keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
              ItemSeparatorComponent={Separator}
              ListEmptyComponent={placeHolder("Keine Runden vorhanden")}
              stickySectionHeadersEnabled={false}
              showsVerticalScrollIndicator={false}
              ref={this.sectionListRef}
              getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index
              })}
              onScrollToIndexFailed={({ sectionIndex, index, highestMeasuredFrameIndex }) => {
                if (highestMeasuredFrameIndex >= 0) {
                  if (this.sectionListRef.current) {
                    this.sectionListRef.current.scrollToLocation({
                      sectionIndex,
                      itemIndex: highestMeasuredFrameIndex,
                      animated: true,
                      viewPosition: 1
                    });
                  }
                }
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 12, marginBottom: 8 }}>
          <View style={{ flex: 1, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', elevation: 1 }}>
            <View style={{ width: '100%', position: 'relative' }}>
              <TextInput
                style={{
                  height: 48,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  paddingHorizontal: 16,
                  paddingRight: 44,
                  fontSize: 16,
                  backgroundColor: '#fff',
                  textAlignVertical: 'center',
                }}
                placeholder="Search"
                placeholderTextColor="#868686"
                onChangeText={text => this.filterList(text)}
              />
              <Ionicons
                name="search"
                size={20}
                color="#868686"
                style={{ position: 'absolute', right: 12, top: 14 }}
              />
            </View>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <FloatingActionButton
          onPress={this.addRound}
          icon="add"
          label="Add Round"
          style={undefined}
        />
      </SafeAreaView>
    );
  }
}

export default connectAlert(CreateWorkoutsWithSafeArea);
