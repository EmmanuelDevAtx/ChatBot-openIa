import * as React from 'react';
import { Image, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Button, Card, Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
import { stopSpeaking, textRead } from '../helpers/readText';
const myIcon = <Icon name="rocket" size={30} color="#900" />;

interface cardInformation{
    onPress: () => void,
    responseUser: string,
    style: {},
    styleBackgroundCard: {},
    questionUser: string,
    uriImg?: string,
};
export const CardCenterIaResponse=(data: cardInformation)=>{

    return(
      <>
        <View style={{marginVertical:20 , paddingLeft:20, paddingRight:60
      }}>
      
        <Card onPress={()=>data.onPress()} style={{...data.style, alignSelf:'flex-start'}}>
          <LinearGradient colors={['#2F3843','#394451']} style={data.styleBackgroundCard}>
          <Card.Content >
            <View style={{flexDirection:'row'}}>
            <Text style={{alignSelf:'flex-start', fontSize:17,  marginBottom:10}}>Bot: </Text>
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
            <View style={{marginTop:30, flexDirection:'row'}}>
              <Button
              mode='outlined'
              onPress={() => stopSpeaking()}
              icon={() => (
                <Icon style={{padding:0, margin:0}} name={'square-outline'} size={30} color='gray'/>
              )}>
                <Text>Parar</Text>
                </Button>

                <Button
              mode='outlined'
              onPress={() => textRead(data.responseUser)}
              icon={() => (
                <Icon style={{padding:0, margin:0}} name={'play-outline'} size={30} color='gray'/>
              )}>
                <Text>Reproducir</Text>
                </Button>
              </View>
          </Card.Content>
            </LinearGradient>
        </Card>
      </View>

      
      </>
    );
}