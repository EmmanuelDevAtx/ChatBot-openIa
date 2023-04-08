import * as React from 'react';
import { Image, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Button, Card, Text, useTheme } from "react-native-paper";
import BotSvg from '../img/svg/icons/gorro-de-graduacion.svg'
import ButonPlay from '../img/svg/icons/tocar_1.svg'
import ButonStopt from '../img/svg/icons/cuadrado.svg'
import { useState } from 'react';
import { stopSpeaking, textRead } from '../helpers/readText';

interface cardInformation{
    onPress: () => void,
    responseUser: string,
    style: {},
    styleBackgroundCard: {},
    questionUser: string,
    uriImg?: string,
};
export const CardCenterIaResponse=(data: cardInformation)=>{
    const theme = useTheme();
    const [onReproducer, setOnReproducer]= useState(false);
    return(
      <>
        <View style={{marginVertical:20 , paddingLeft:20, paddingRight:60 , flexDirection:'row'
      }}>
      
        <Card onPress={()=>data.onPress()} style={{...data.style, alignSelf:'flex-start'}}>
          <LinearGradient colors={['#2F3843','#394451']} style={data.styleBackgroundCard}>
          <Card.Content >
            <View style={{flexDirection:'row'}}>
            <Text style={{alignSelf:'flex-start', fontSize:17,  marginBottom:10}}>Bot: </Text>
            <BotSvg height={20} width={20} fill={theme.colors.onSurface}/>
            </View>

             <Text style={{alignSelf:'center', fontSize:15, marginVertical:0}}>{data.responseUser}</Text>
             {
               data.uriImg !== 'none' && data.uriImg
               ? <>
                <Image source={{uri: data.uriImg}}
              style={{width: 200, height: 200, alignSelf:'center'}} />
              
              </>
              : <></>
            }

            
          </Card.Content>
            </LinearGradient>
        </Card>
        {!onReproducer
        ?
        <Button onPress={()=>{
          setOnReproducer(!onReproducer);
          textRead(data.responseUser);
        }} style={{ justifyContent:'center', marginHorizontal: 5 }} icon={() => (
            <ButonPlay style={{ alignContent:'center', alignSelf: 'center'}}height={20} width={20} fill={theme.colors.onSurface} />
          )} children={undefined}/>


        :
        <Button onPress={()=>{
          setOnReproducer(!onReproducer);
          stopSpeaking();
        }} style={{ justifyContent:'center', marginHorizontal: 5 }} icon={() => (
            <ButonStopt style={{ alignContent:'center', alignSelf: 'center'}}height={20} width={20} fill={theme.colors.onSurface} />
          )} children={undefined}/>
        }
      </View>

      
      </>
    );
}