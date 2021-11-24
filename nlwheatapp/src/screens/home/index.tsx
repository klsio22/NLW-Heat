import React from 'react';

import {View,Text} from 'react-native';
import{styles} from './styles'
import Header from '../../components/Header'

export function Home(){
  return(
    <View style={styles.container}>
      
      <Header/>
    
    </View>
  )
}