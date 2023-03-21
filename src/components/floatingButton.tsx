import * as React from 'react'
import { StyleSheet } from "react-native";
import { AnimatedFAB, Text } from "react-native-paper"

interface floatData{
    showquestion: boolean,
    setShowQuestion: ()=>void,
}

export const FloatingCustomButton= (props: floatData)=>{
    return(
        <AnimatedFAB
        icon={({size}) => (
          <Text style={{color:'black', alignSelf:'center'}}>{!props.showquestion ?  'Open IA' : 'Hide IA'}</Text>
        )}
        
        color='black'
        label={''}
        extended={false}
        onPress={() => props.setShowQuestion()}
        visible={true}
        animateFrom={'right'}
        iconMode={'static'}
        style={styles.fabStyle}
      />
    );
}

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 16,
    alignSelf:'center',
    position: 'absolute',
      backgroundColor:'white',
      color:'black'
  },
  });