import * as React from 'react'
import { useEffect, useState } from 'react';
import { Clipboard, FlatList, ScrollView, StyleSheet, View } from 'react-native'
import { openIA } from '../helpers/ResponseIA';
import { Button, Card, Provider as PaperProvider, Text, TextInput, MD3DarkTheme as DefaultTheme, AnimatedFAB, Divider, } from 'react-native-paper';

import { BannerOpenIa } from '../components/Banner';
import { CardCenterEmpty } from '../components/cardCenterEmpty';
import { FloatingCustomButton } from '../components/floatingButton';
import { stopSpeaking, textRead } from '../helpers/readText';
import { CardCenterIaResponse } from '../components/cardCenterIaResponse';
import { CardCenterUserQuestion } from '../components/cardCenterUserQuestion';


type responseInfo={
  questionUser: string,
  response: string,
  uriImg: string,
}



export const HomeScreen = () => {
  const [showQuestion, setShhowQuestion] = useState(true);
  const [question, setQuestion] = useState("");
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [responseArrayIA, setResponseArrayIA]=useState<any[]>([]);
  const [lastInformation, setLastInformation]=useState<responseInfo>(
    {questionUser: 'Bienvenido! Pasala bien',
    response : 'Por favor preguntame tus dudas! :D', 
    uriImg:'none'});
 
  useEffect(() => {
    console.log(lastInformation.questionUser);
  }, [lastInformation,...responseArrayIA]);
  const cliBoard=(respuestaIa : string)=>{
    Clipboard.setString(respuestaIa);
  }

  const regenerateResponse=async(questionBefore :string)=>{
    stopSpeaking();
    await cleanInformation();
    setIsLoadingResponse(true);
    const {message, urlImg}= await openIA(questionBefore);
      if(message === '' || urlImg === ''){
        return console.log('algo ha pasado');
      }
      setIsLoadingResponse(false);
      textRead(message);
      setLastInformation({questionUser: questionBefore,response : message, uriImg:urlImg});
  }

  const cleanInformation=async()=>{
    await setLastInformation({questionUser: 'none',response : 'none', uriImg:'none'});
  }
  const updateInfotmation=()=>{
    const information: any[]= [lastInformation, ...responseArrayIA];
    setResponseArrayIA(information);
  }

  const ask=async(questionSelf: string)=>{
    try {
      await cleanInformation();
      stopSpeaking
      setIsLoadingResponse(true);
      setQuestion('');
      updateInfotmation();
      const {message, urlImg}= await openIA(questionSelf);
      if(message === '' || urlImg === ''){
        return console.log('algo ha pasado');
      }
      setIsLoadingResponse(false);
      textRead(message);
      setLastInformation({questionUser: questionSelf,response : message, uriImg:urlImg});
      console.log(lastInformation);
    } catch (error) {
      console.log('algo salió mal :(r', error);
    }
    setIsLoadingResponse(false);
  }

  const renderItem = ({
    item: {
      questionUser = '',
      response = '',
      uriImg = '',
    },
  }) => (
        <>
        <Divider />
          <CardCenterIaResponse
          onPress={()=>cliBoard(response)}
          questionUser={questionUser}
          responseUser={response}
          style={styles.cardResponse}
          styleBackgroundCard={styles.cardResponseBackground}
          uriImg={uriImg}
        />
        

        <CardCenterUserQuestion
          onPress={()=>cliBoard(questionUser)}
          questionUser={questionUser}
          style={styles.cardResponse}
          styleBackgroundCard={styles.cardResponseBackground}
        />
        
        </>
   
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
        {
          
          lastInformation.questionUser !== 'none'
          ?

          <>
            <CardCenterIaResponse
            onPress={()=>cliBoard(lastInformation.response)}
            questionUser={lastInformation.questionUser}
            responseUser={lastInformation.response}
            style={styles.cardResponse}
            styleBackgroundCard={styles.cardResponseBackground}
            uriImg={lastInformation.uriImg}/>

          <CardCenterUserQuestion
            onPress={()=>cliBoard(lastInformation.questionUser)}
            questionUser={lastInformation.questionUser}
            style={styles.cardResponse}
            styleBackgroundCard={styles.cardResponseBackground}/>
          <Button  mode='outlined' buttonColor='#202931' onPress={()=>regenerateResponse(lastInformation.questionUser) } style={{marginVertical:20}}> Regenerate Response</Button>
          
        </>
        
          : <></>
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
        

        {responseArrayIA.length ? 
          <FlatList
          // onScroll={onScroll}
          data={responseArrayIA}
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