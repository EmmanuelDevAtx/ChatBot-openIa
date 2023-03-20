import * as React from 'react';
import { Image, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Button, Card, Text } from "react-native-paper";

interface cardInformation{
    onPress: () => void,
    responseUser: string,
    style: {},
    styleBackgroundCard: {},
    questionUser: string,
    uriImg?: string,
    onRegenerate?: ()=>void,
};
export const CardCenter=(data: cardInformation)=>{

    return(
        <Card onPress={()=>data.onPress()} style={data.style}>
          <LinearGradient colors={['#2F3843','#394451']} style={data.styleBackgroundCard}>
          <Card.Content >
            <Text style={{alignSelf:'flex-start', fontSize:19, marginVertical:0, flex:1}}>{data.questionUser}</Text>
             <Text style={{alignSelf:'center', fontSize:15, marginVertical:0, flex:1}}>{data.responseUser}</Text>
             {
              data.uriImg !== 'none' && data.uriImg
              ? <>
                <Image source={{uri: data.uriImg}}
              style={{width: 200, height: 200, alignSelf:'center'}} />
              
              </>
              : <></>
            }

            {
              data.onRegenerate ?
              <Button  mode='outlined' onPress={()=>data.onRegenerate() } style={{marginVertical:5}}> Regenerate Response</Button>
              : <></>
            }
          </Card.Content>
            </LinearGradient>
        </Card>

    );
}