import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Yup from 'yup';

// validate number with Yup
const validationSchema = Yup.object().shape({
  passLength: Yup.number().required().min(4,'Should be of 4 chars')
  .max(12,'Should be less than 12 chars'),
});

export default function App() {

  const [password, setPassword] = useState(0);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);

  const generatedpasswordString = (passLength) => {
    let characters = '';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    if(lowerCase){
      characters += lowerCaseChars;
    }
    if(upperCase){
      characters += upperCaseChars;
    }
    if(number){
      characters += numberChars;
    }
    if(specialChar){
      characters += specialChars;
    }
    const pswrdFinal = createpassword(characters,passLength);
    setPassword(pswrdFinal);
    setIsPasswordVisible(true);
  }

  const createpassword = (characters,passwordLength) => {
    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  }
  
  const resetPasswordState = () => {  
    setLowerCase(false);
    setUpperCase(false);
    setNumber(false);
    setSpecialChar(false);

  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
