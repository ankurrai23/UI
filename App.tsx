import React, { useState } from 'react';
import { View, Text,Image, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';


const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [ispasswordVisible, setIsPasswordVisible] = useState(false)

  const handleEmailChange = (email) => {
    setEmail(email);
    validateEmail(email);
  }

  const handlePasswordChange = (password) => {
    setPassword(password);
    validatePassword(password);
  }

  const validateEmail = (email) => {
    if (!email) {
      setErrorMessage('Please enter an email address');
      setIsEmailValid(false);
      return;
    }

    const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!EmailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setIsEmailValid(false);
      return;
    }
    
    setErrorMessage('');
    setIsEmailValid(true);
  }

  const validatePassword = (password) => {
    if (!password) {
      setErrorMessage('Please enter a password');
      setIsPasswordValid(false);
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      setIsPasswordValid(false);
      return;
    }
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(password)) {
      setErrorMessage('Password must not contain Whitespaces.');
      setIsPasswordValid(false);
      return;
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(password)) {
      setErrorMessage('Password must contain at least one UpperCase Letter.');
      setIsPasswordValid(false);
      return;
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(password)) {
      setErrorMessage('Password must contain at least one LowerCase Letter');
      setIsPasswordValid(false);
      return;
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(password)) {
      setErrorMessage('Password must contain at least one Number');
      setIsPasswordValid(false);
      return;
    }
    const isContainSpecialCharacter=/^(?=.*[@#$%^&+=]).*$/;
    if (!isContainSpecialCharacter.test(password)) {
      setErrorMessage('Password must contain at least one Special Character');
      setIsPasswordValid(false);
      return;
    }
    setErrorMessage('');
    setIsPasswordValid(true);
  }

  const handleSubmit = () => {
    if (isEmailValid && isPasswordValid) {
      Alert.alert('Thank You', 'You are succesfully registered', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {}}
      ])
    }
  }

  const togglePasswordVisibility=()=>{
    setIsPasswordVisible(prev => !prev);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => handleEmailChange(text)}
      />
        <View style={styles.passSection}>
      <TextInput
        style={[styles.input,{flex:1}]}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={!ispasswordVisible}
        value={password}
        onChangeText={(text) => handlePasswordChange(text)}
      />
      <TouchableOpacity activeOpacity={0.8} onPress={togglePasswordVisibility} style={[{zIndex:1,position:'absolute',right:16}]}>
                  <Image
                    source={
                      ispasswordVisible
                        ? require('/Users/fabhotels/Desktop/ReactNative/loginUI/UINEW/LOGINUI/assets/hide.png')
                        : require('/Users/fabhotels/Desktop/ReactNative/loginUI/UINEW/LOGINUI/assets/view.png')
                    }
                    style={[styles.btnImage,{marginTop:10}]}
                  />
                </TouchableOpacity>
      </View>
      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
      <TouchableOpacity
        style={[styles.button, isEmailValid && isPasswordValid ? styles.buttonEnabled : styles.buttonDisabled]}
        disabled={!isEmailValid || !isPasswordValid}
        onPress={handleSubmit}
      >
        <Text style={[styles.buttonText]}>Login</Text>
      </TouchableOpacity>

        <View>
          <Text style={styles.fp}>Forgot Password?</Text>
        </View>

        <View style={styles.logo}>
          <Text style={[styles.logocard, {color: '#f58e07'}]}><Image source={require('/Users/fabhotels/Desktop/ReactNative/loginUI/UINEW/LOGINUI/assets/Google-logo.webp')} style={styles.limage}></Image>Google</Text>
          <Text style={[styles.logocard, {color:'#065ec2'}]}><Image source={require('/Users/fabhotels/Desktop/ReactNative/loginUI/UINEW/LOGINUI/assets/Facebook-logo.png')} style={styles.limage}></Image>Facebook</Text>
        </View>

        <View>
          <Text style={styles.signup}>
            Don't have an account?
            <Text style={[{fontWeight: 'bold'}, {color: '#f58e07'}]}>
              Sign Up
            </Text>
          </Text>
        </View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight:'bold'
  },
  fp:{
    marginTop:60,
    textAlign:'center',
    color:'#d67104',
    fontWeight:600
  },
  input: {
    padding: 10,
    borderWidth: 0.1,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor:'#e6e3e1'
  },
  button: {
    backgroundColor: '#f78000',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  buttonEnabled: {
    opacity: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight:'bold',
  },
  logo:{
    flexDirection:'row',
    justifyContent:'center'
  },
  logocard:{
    flexDirection:'row',
    borderWidth:1,
    borderRadius:10,
    padding:40,
    paddingVertical:10
  },
  signup:{
    textAlign:'center',
    marginTop:50
  },
  limage:{
    width:20,
    height:30
  },
  btnImage:{
    width:15,
    height:15,
  },
  passSection:{
    flexDirection:'row'
  }
})
export default App;
