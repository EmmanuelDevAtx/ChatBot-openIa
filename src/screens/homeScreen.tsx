import * as React from 'react'
import { useEffect, useState } from 'react';
import { Clipboard, FlatList, ScrollView, StyleSheet, View } from 'react-native'
import { openIA } from '../helpers/ResponseIA';
import { Button,  Card,  Divider, Text, } from 'react-native-paper';

import { BannerOpenIa } from '../components/Banner';
import { CardCenterEmpty } from '../components/cardCenterEmpty';
import { FloatingCustomButton } from '../components/floatingButton';
import { stopSpeaking, textRead } from '../helpers/readText';
import { CardCenterIaResponse } from '../components/cardCenterIaResponse';
import { CardCenterUserQuestion } from '../components/cardCenterUserQuestion';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';


const contextIaSend={
  data:[
    {role: "system", content: "Eres un asistente util que va a ayudar a los niños a estudiar"}
  ]
}
export const HomeScreen = () => {
  const [showQuestion, setShhowQuestion] = useState(true);
  const [question, setQuestion] = useState("");
  const [lastquestion, setLastQuestion]= useState("");
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const cliBoard=(respuestaIa : string)=>{
    Clipboard.setString(respuestaIa);
    Toast.show({
      type: 'copyAswer',
      text1: 'Has copeado la respuesta',
      text2: respuestaIa,
      styl: styles.cardResponse,
    });
  }

  const regenerateResponse = async(questionBefore :string)=>{
    stopSpeaking();
    contextIaSend.data.splice(contextIaSend.data.length - 1,1);
    contextIaSend.data.splice(contextIaSend.data.length - 1,1);
    setTimeout(()=>{ask(questionBefore);},1000);
  }


  const ask=async(questionSelf: string)=>{
    try {
      stopSpeaking();
      setIsLoadingResponse(true);
      setQuestion('');
      setLastQuestion(questionSelf);
      const newUserMessage = { role: "user", content: questionSelf };
      contextIaSend.data.push(newUserMessage);
      const {message}= await openIA(questionSelf);
      if(message === ''){
        setIsLoadingResponse(false);
        return console.log('algo ha pasado');
      }
      const newData = { role: "assistant", content: message };
      contextIaSend.data.push(newData); 
      setIsLoadingResponse(false);
      textRead(message);
    } catch (error) {
      console.log('algo salió mal :(r');
    }
    setIsLoadingResponse(false);
  }

  const renderItem = ({
    item: {
      content = '',
      role = '',
    },
  }) => (
          role === "assistant"
          ?
          <CardCenterIaResponse
          onPress={()=>cliBoard(content)}
          questionUser={content}
          responseUser={content}
          style={styles.cardResponse}
          styleBackgroundCard={styles.cardResponseBackground}
          />
          :
          role === "user"
          ?<CardCenterUserQuestion
          onPress={()=>cliBoard(content)}
          questionUser={content}
          style={styles.cardResponse}
          styleBackgroundCard={styles.cardResponseBackground}
        />
        :<></>
        
  );
  
  return (
    <> 
      <BannerOpenIa
          styles={styles.cardResponse}
          visible={showQuestion}
          loadingResponse={isLoadingResponse}
          askQuestion={()=> ask(question)}
          onChangeText={(text) => setQuestion(text)}
          question={question}
        />       
        <ScrollView>
        <>
        <View style={{marginVertical:20 , paddingHorizontal:20}}>
        <Card style={styles.cardResponse}>
             <LinearGradient colors={['#2F3843','#394451']} style={styles.cardResponseBackground}>
         <Card.Content>
          <Text  style={{alignSelf:'center', fontSize:20}}> Hola!</Text>
          <Text  style={{alignSelf:'center', fontSize:15}}> Soy tu asistente personal, puedes preguntarme lo que gustes, puedo ayudarte a entender cualquier tema!</Text>
         </Card.Content>
         </LinearGradient>
            </Card>
      </View>
        </>

        {contextIaSend.data.length ? 
          <FlatList
          // onScroll={onScroll}
          data={contextIaSend.data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={isLoading}
          //     onRefresh={fetchData}
          //   />
          // }
        />
        :
          <></>
      }
           {isLoadingResponse ? 
      <View style={{marginVertical:20 , paddingHorizontal:20
      }}>
        
        <CardCenterEmpty
          resourceName='making_message'
          styles={styles.cardResponse}
          styleBackgroundCard={styles.cardResponseBackground}
        />
      </View>
      : <></>
      }   
      
        {contextIaSend.data.length > 1
        ?<Button mode='outlined' onPress={()=> regenerateResponse(lastquestion)} style={{marginVertical: 5}} > Regenerar la respuesta</Button>
        : <></>
      }
        </ScrollView>
        <FloatingCustomButton 
            setShowQuestion={()=> setShhowQuestion(!showQuestion)}
            showquestion={showQuestion}
          />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    alignSelf:'center',
    position: 'absolute',
    backgroundColor:'white',
    color:'black'
  },
  cardResponse:{
    backgroundColor:'rgba(19, 19, 19, 0.2)', 
    borderRadius:15,
    shadowColor:'rgba(16, 17, 20, 2)',
    paddingBottom:10,
    paddingRight:3,
    borderColor:'#FFFFFF',
  },
  cardResponseBackground:{
    paddingVertical:15,
    borderRadius:15, 
  },
});