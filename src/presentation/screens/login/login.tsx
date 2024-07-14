/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../interfaces/types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleSignIn = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN INTO YOUR ACCOUNT</Text>
      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry />
      <TouchableOpacity>
        <Text style={styles.forgot}>FORGOT YOUR PASSWORD?</Text>
      </TouchableOpacity>
      <Button
        title="SIGN IN"
        style={styles.signInButton}
        textStyle={styles.signInText}
        onPress={handleSignIn}
      />
      <Button
        title="REGISTER"
        style={styles.registerButton}
        textStyle={styles.registerText}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  forgot: {
    color: '#000',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#B9FF00',
  },
  signInText: {},
  registerButton: {
    backgroundColor: '#FF6C00',
  },
  registerText: {},
});

export default Login;
