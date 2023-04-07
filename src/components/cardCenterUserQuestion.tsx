import * as React from 'react';
import { Image, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Button, Card, Text } from "react-native-paper";

interface cardInformation{
    onPress: () => void,
    style: {},
    styleBackgroundCard: {},
    questionUser: string,
};
export const CardCenterUserQuestion=(data: cardInformation)=>{

    return(
      <View style={{  paddingHorizontal:20
      }}>
      
        <Card onPress={()=>data.onPress()} style={{...data.style, alignSelf:'flex-end'}}>
          <LinearGradient colors={['#384C64','#435D7B']} style={data.styleBackgroundCard}>
          <Card.Content style={{alignSelf:'flex-end'}}>
          <View style={{flexDirection:'row'}}>
          <Text style={{ fontSize:17, marginBottom:10}}>Yo </Text>
            
            </View>
            
            <Text style={{ fontSize:15}}>{data.questionUser}</Text>
          </Card.Content>
            </LinearGradient>
        </Card>
      </View>

    );
}