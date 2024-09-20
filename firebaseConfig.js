import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
    apiKey: "AIzaSyD_3aqjfNTb-qIdJBpuV7ROBcRVXaoLkmE",
    authDomain: "todolist-fbdcd.firebaseapp.com",
    projectId: "todolist-fbdcd",
    storageBucket: "todolist-fbdcd.appspot.com",
    messagingSenderId: "114558576518",
    appId: "1:114558576518:web:852cbe920d2e7b1b9aee07",
    measurementId: "G-NHTRP9G8Z5",
    databaseURL: "https://todolist-fbdcd-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig)

export const database = getDatabase(app)