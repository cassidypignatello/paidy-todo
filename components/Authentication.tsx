import React, { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Text, View, StyleSheet, Button } from 'react-native';

// Authentication component responsible for handling local device authentication
const Authentication: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function that calls Expo's LocalAuthentication module to authenticate the user
  const authenticate = async () => {
    const hasHardwareAsync = await LocalAuthentication.hasHardwareAsync();
    if (hasHardwareAsync) {
      const isEnrolledAsync = await LocalAuthentication.isEnrolledAsync();
      if (isEnrolledAsync) {
        const authenticationResult = await LocalAuthentication.authenticateAsync();
        if (authenticationResult.success) {
          setIsAuthenticated(true);
        }
      }
    }
  };

  // Call authenticate function when the component mounts
  useEffect(() => {
    authenticate();
  }, []);

  // If not authenticated, show a button to initiate authentication
  // Otherwise, render the children components (TodoForm and TodoList)
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text>You need to authenticate to continue</Text>
        <Button title="Authenticate" onPress={authenticate} />
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Authentication;
