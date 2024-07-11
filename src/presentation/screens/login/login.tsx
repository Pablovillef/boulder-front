/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from '../../styles/styles';


const LoginScreen: React.FC = () => {
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
        onPress={() => {}}
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

export default LoginScreen;
