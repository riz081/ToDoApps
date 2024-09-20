// src/redux/tasksSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { getDatabase, onValue, push, ref, remove, update } from 'firebase/database';

const db = getDatabase();

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasksList: [],
    task: '',
  },
  reducers: {
    setTasksList: (state, action) => {
      state.tasksList = action.payload;
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    clearTaskInput: (state) => {
      state.task = '';
    },
  },
});

export const { setTasksList, setTask, clearTaskInput } = tasksSlice.actions;

export const readTaskData = () => (dispatch) => {
  onValue(ref(db, '/tasks'), (snapshot) => {
    const data = snapshot.val();
    const list = [];
    for (let key in data ? data : []) {
      list.push({ key, ...data[key] });
    }
    dispatch(setTasksList(list));
  });
};

export const writeTaskData = (task) => () => {
  push(ref(db, '/tasks'), {
    value: task,
    completed: false,
  });
};

export const updateTaskData = (key, completed, value) => () => {
  update(ref(db, `/tasks/${key}`), {
    completed,
    value,
  });
};

export const removeTaskData = (key) => () => {
  remove(ref(db, `/tasks/${key}`));
};

export default tasksSlice.reducer;
