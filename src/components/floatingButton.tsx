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
          // <></>
        )}
        
        color='black'
        label={''}
        extended={false}
        // onPress={() => setShhowQuestion(!showQuestion)}
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
      // bottom:30,
      // alignItems: 'center',
      // alignContent:'flex-end',
      // right: 16,
      alignSelf:'center',
      position: 'relative',
      backgroundColor:'white',
      color:'black'
    },
  });