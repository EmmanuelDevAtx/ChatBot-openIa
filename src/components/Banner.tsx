import * as React from 'react'
import {  Dimensions, View } from 'react-native';
import { Text, Banner, Button, TextInput } from "react-native-paper";

const {width} = Dimensions.get('window');

interface bannerData{
    styles: {},
    visible: boolean,
    loadingResponse: boolean,
    question: string,
    
    onChangeText: (text:string)=> void,
    askQuestion: ()=> void,

}

export const BannerOpenIa=(banner: bannerData)=>{
    return(
      <Banner
        style={{...banner.styles,backgroundColor:'#21252A', borderBottomWidth:5, borderColor:'rgba(16, 17, 20, 0.3)'}}
      visible={banner.visible}
      >
        <View >
          <Text style={{alignSelf:'center', fontSize:20, marginVertical:10}}>Welcom to Chat bot</Text>
          <TextInput
              disabled = {banner.loadingResponse}
              mode='outlined'
              label="Enter your question"
              value={banner.question}
              onChangeText={text => banner.onChangeText(text)}
              style={{marginVertical:15, width: (width -(width / 14)), height: 50, alignSelf:'center'}}
            />
          {
            !banner.loadingResponse 
            ? <Button  mode='outlined' onPress={()=>
              {
                banner.askQuestion();
              }} style={{marginVertical:5}}> Ask OpenIA</Button>
            : <></>
          }
        </View>
        
    </Banner>
    );
}