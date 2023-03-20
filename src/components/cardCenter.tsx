import React from 'react';
import { Image, View } from "react-native";
import { Card, Text } from "react-native-paper";
import {Fill, BackdropFilter, Blur, Canvas} from "@shopify/react-native-skia"

interface cardInformation{
    onPress: ()=>void,
    responseUser: string,
    style: {},
    questionUser: string,
    uriImg: string
};
export const CardCenter=(data: cardInformation)=>{

    return(
        <Card onPress={()=>data.onPress()} style={data.style}>
          <Card.Content >
           <Text style={{alignSelf:'flex-start', fontSize:19, marginVertical:0, flex:1}}>{data.questionUser}</Text>
            <Text style={{alignSelf:'center', fontSize:15, marginVertical:0, flex:1}}>{data.responseUser}</Text>
            {
              data.uriImg !== 'none'
              ? <>
                <Image source={{uri: data.uriImg}}
              style={{width: 200, height: 200, alignSelf:'center'}} />
              
              </>
              : <></>
            }
            <Canvas style={{width:100, height:100}}>
                <BackdropFilter filter={ <Blur blur={20}/>}>
                <Fill color={'4E9AF9'}/>    
                </BackdropFilter>
            </Canvas>
            
          </Card.Content>
        </Card>
    );
}