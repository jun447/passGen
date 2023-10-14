import React from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView,TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Formik } from 'formik';
import * as Yup from 'yup';

// validate number with Yup
const validationSchema = Yup.object().shape({
  passwordLength: Yup.number().required('Length Tery Abu Deni').min(4,'Should be of 4 chars')
  .max(12,'Should be less than 12 chars'),
});

export default function App() {

  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);

  const generatedpasswordString = (passwordLength) => {
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
    const pswrdFinal = createpassword(characters,passwordLength);
    setPassword(pswrdFinal);
    setIsPasswordVisible(true);
    console.log("Password is -> ",password);
    console.log("Is Password generated ->",isPasswordVisible);

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
  //  write all state reset code here
   setIsPasswordVisible(false);
   setPassword('');
    setLowerCase(true);
    setUpperCase(false);
    setNumber(false);
    setSpecialChar(false);


  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled' >
        <SafeAreaView style={styles.appContainer}>
           <View style={styles.formContainer} >
           <Text style={styles.title}>Generate Password</Text>
             <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={validationSchema}
       onSubmit={values => {
        console.log(values);
        generatedpasswordString(Number(values.passwordLength));
        
       }}
     >
       {({
           values,
           errors,
           touched,
           isValid,
           handleChange,
           handleSubmit,
           handleReset,
         /* and other goodies */
       }) => (
         <>
           <View style={styles.inputWrapper} >
            <View style={styles.inputColumn}>
              <Text style={styles.heading}>Password Length</Text>
              {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
            </View>
                <TextInput 
                     style={styles.inputStyle} 
                     value={values.passwordLength} 
                     onChangeText={handleChange('passwordLength')}
                      placeholder='Password Length Ex. 7'
                      keyboardType='numeric'
                >
                  
                </TextInput>
            </View>
          <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include lowercase</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={lowerCase}
          onPress={() => setLowerCase(!lowerCase)}
          fillColor="#29AB87"
          />
         </View>
         <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#FED85D"
                  />
          </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={number}
                    onPress={() => setNumber(!number)}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={specialChar}
                    onPress={() => setSpecialChar(!specialChar)}
                    fillColor="#FC80A5"
                  />
                </View>

           <View style={styles.formActions}>
           <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn}
          onPress={handleSubmit}
          >
            <Text style={styles.primaryBtnTxt}>Generate</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={ () => {
            handleReset();
            resetPasswordState()
          }}
          >
            <Text style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
           </View>  

         </>
       )}
             </Formik>
           </View>
           {isPasswordVisible? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
        </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor:'black'
  },
  formContainer: {
    margin: 8,
    padding: 8,
    // borderWidth: 1,
    // borderColor:'black'
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});
