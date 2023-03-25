
import React, { useEffect, useState } from 'react';
import { Clipboard, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import {Provider as PaperProvider, MD3DarkTheme as DefaultTheme, } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen'

import "react-native-url-polyfill/auto";

import { colors } from './src/Theme/Colors';
import { HomeScreen } from './src/screens/homeScreen';

const theme = {...DefaultTheme, ...colors};


const App = () => {
  useEffect(() =>{
    setTimeout(() => SplashScreen.hide(), 1000);
  },[])
  return (
    <PaperProvider theme={theme}>  
      <SafeAreaView style={{justifyContent:'center', alignContent:'center', flex:1 }}>
        <LinearGradient colors={['#29313B','#1A1E23']} style={{height:'100%'}}>
          <HomeScreen/>
        </LinearGradient>
      </SafeAreaView>
   </PaperProvider>
    
  );
};



export default App;