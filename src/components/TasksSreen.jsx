// src/components/TasksScreen.jsx

import React, { useEffect } from 'react';
import { Button, FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import Task from './Task';
import { useSelector, useDispatch } from 'react-redux';
import { readTaskData, setTask, writeTaskData, clearTaskInput } from '../redux/tasksSlice';

const TasksScreen = () => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.task);
  const tasksList = useSelector((state) => state.tasks.tasksList);

  useEffect(() => {
    dispatch(readTaskData());
  }, [dispatch]);

  const renderTask = ({ item }) => (
    <Task
      value={item.value}
      taskID={item.key}
      completed={item.completed}
    />
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={styles.innerContainer}>
        <View style={styles.taskListContainer}>
          <FlatList
            data={tasksList}
            renderItem={renderTask}
            keyExtractor={(item) => item.key}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={task}
            onChangeText={(text) => dispatch(setTask(text))}
            placeholder="Enter the Task"
            placeholderTextColor="#9CA3AF"
          />
          <Button
            title="Add"
            onPress={() => {
              if (task.trim()) {
                dispatch(writeTaskData(task));
                dispatch(clearTaskInput());
              }
            }}
            color="#00CCDD"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 10
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  taskListContainer: {
    flex: 1,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#4F75FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    color: '#1F2937',
    marginRight: 8,
  },
});

export default TasksScreen;
