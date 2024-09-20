import { createSlice } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// Define the initial state for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {

      const { uid, email, displayName } = action.payload;
      state.user = { uid, email, displayName };
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, setError, setLoading, logout } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  const auth = getAuth();
  dispatch(setLoading(true));
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    dispatch(setUser({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || null,  
    }));
  } catch (error) {
    dispatch(setError(error.message));
  }
  dispatch(setLoading(false));
};

export const register = (email, password) => async (dispatch) => {
  const auth = getAuth();
  dispatch(setLoading(true));
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    dispatch(setUser({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || null,
    }));
    return { success: true }; 
  } catch (error) {
    dispatch(setError(error.message));
    return { success: false, error: error.message }; 
  } finally {
    dispatch(setLoading(false));
  }
};


export const logoutUser = () => async (dispatch) => {
  const auth = getAuth();
  await signOut(auth);
  dispatch(logout());
};

export default authSlice.reducer;
