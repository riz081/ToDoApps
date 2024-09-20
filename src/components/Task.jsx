// src/components/Task.jsx

import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeTaskData, updateTaskData } from '../redux/tasksSlice';

const Task = ({ value, taskID, completed }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(value);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateTaskData(taskID, completed, editedTask));
    setEditing(false);
  };

  return (
    <View style={completed ? styles.containerDone : styles.container}>
      <View style={styles.task}>
        {isEditing ? (
          <TextInput 
            style={styles.textInput}
            value={editedTask}
            onChangeText={setEditedTask}
            placeholder="Edit Task"
          />
        ) : (
          <Text style={styles.text}>{value}</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <View style={styles.buttonWrapper}>
            <Button title="Save" color="#10B981" onPress={handleUpdate} />
          </View>
        ) : (
          <>
            <View style={styles.buttonWrapper}>
              <Button title="Edit" color="#4F75FF" onPress={() => setEditing(true)} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="Delete" color="#EF4444" onPress={() => dispatch(removeTaskData(taskID))} />
            </View>
          </>
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 50,
    width: '95%',
    borderWidth: 1,
    borderColor: '#4F75FF',
    borderRadius: 8,
    flexDirection: 'row',
    margin: 5,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  containerDone: {
    display: 'flex',
    height: 50,
    width: '95%',
    borderWidth: 1,
    borderColor: '#4F75FF',
    borderRadius: 8,
    flexDirection: 'row',
    margin: 5,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginLeft: 16,
  },
  textInput: {
    fontSize: 18,
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#4F75FF',
    width: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginHorizontal: 2
  }
});

export default Task;
