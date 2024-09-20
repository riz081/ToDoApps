import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { 
  View, 
  TextInput, 
  Button, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  TouchableOpacity, 
  Keyboard,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for eye icon

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const validateForm = () => {
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      dispatch(login(email, password));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />
          {emailError ? <Text style={styles.validationError}>{emailError}</Text> : null}

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              style={[styles.input, styles.passwordInput]}
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={passwordVisible ? 'eye-off' : 'eye'}
                size={24}
                color="#4F46E5"
              />
            </TouchableOpacity>
          </View>

          {passwordError ? <Text style={styles.validationError}>{passwordError}</Text> : null}

          <View style={styles.buttonContainer}>
            <Button
              title="Login"
              onPress={handleLogin}
              disabled={loading}
              color="#4F46E5"
            />
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.buttonContainer}>
            <Button
              title="Go to Register"
              onPress={() => navigation.navigate('Register')}
              color="#22D3EE"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
    backgroundColor: '#F3F4F6',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1F2937',
  },
  input: {
    width: '100%',
    height: 50,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#1F2937',
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 18,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  validationError: {
    color: '#EF4444',
    marginBottom: 8,
    fontSize: 14,
  },
  error: {
    color: '#EF4444',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default LoginScreen;
