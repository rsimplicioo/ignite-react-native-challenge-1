import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

import { EditTaskArgs } from "../pages/Home";

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({taskId, taskNewTitle}: EditTaskArgs) => void;
}

export function TaskItem({ task, editTask, removeTask, toggleTaskDone } : TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: taskNewTitleValue })
    setIsEditing(false);
  }

  useEffect(() => {
    if(textInputRef.current){
      if(isEditing){
        textInputRef.current.focus();
      }else{
        textInputRef.current.blur();
      }
    }
  }, [isEditing])
  
  return(
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
          //TODO - use onPress (toggle task) prop
        >
          <View 
            //TODO - use style prop 
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          {/* <TextInput 
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={taskNewTitleValue}
            editable={isEditing}
            onChangeText={setTaskNewTitleValue}
            onSubmitEditing={handleSubmitEditing}
          /> */}

        </TouchableOpacity>
      </View>

      <View style={styles.containerButtons}>
        {
          isEditing ? 
            <TouchableOpacity
              //TODO - use onPress (remove task) prop
              onPress={handleCancelEditing}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>
          : 
            <TouchableOpacity
              //TODO - use onPress (remove task) prop
              onPress={handleStartEditing}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
        }

        <View />
        
        <TouchableOpacity
          style={{ paddingHorizontal: 24 }}
          //TODO - use onPress (remove task) prop
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  containerButtons: {
    paddingVertical: '1px',
    paddingHorizontal: '24px',
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  }
})