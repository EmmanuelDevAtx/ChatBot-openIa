import * as React from 'react';
import { Image, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Button, Card, Text, useTheme } from "react-native-paper";
import UserSvg from '../img/svg/icons/sonreir.svg'

interface cardInformation{
    onPress: () => void,
    style: {},
    styleBackgroundCard: {},
    questionUser: string,
};
export const CardCenterUserQuestion=(data: cardInformation)=>{
  const theme = useTheme();

    return(
      <View style={{  paddingHorizontal:20
      }}>
      
        <Card onPress={()=>data.onPress()} style={{...data.style, alignSelf:'flex-end'}}>
          <LinearGradient colors={['#384C64','#435D7B']} style={data.styleBackgroundCard}>
          <Card.Content style={{alignSelf:'flex-end'}}>
          <View style={{flexDirection:'row'}}>
          <Text style={{ fontSize:17, marginBottom:10}}>Yo </Text>
            <UserSvg height={20} width={20} fill={theme.colors.onSurface}/>
            </View>
            
            <Text style={{ fontSize:15}}>{data.questionUser}</Text>
          </Card.Content>
            </LinearGradient>
        </Card>
      </View>

    );
}