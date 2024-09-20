import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { View, Button, Text, StyleSheet, SafeAreaView, Alert, Platform } from 'react-native';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => dispatch(logoutUser()),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {user && (
          <Text style={styles.userText}>
            Logged in as: {user.email}
          </Text>
        )}
        <Button
          title="Logout"
          onPress={handleLogout}
          color="#EF4444"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  userText: {
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 20,
  },
});

export default SettingsScreen;
