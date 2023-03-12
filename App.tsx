
import React, { useState } from 'react';
import { Clipboard, FlatList, Image, ScrollView, View } from 'react-native';

import { Button, Card, Provider as PaperProvider, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});
import Rive from 'rive-react-native';
import "react-native-url-polyfill/auto";
import { responseIASelect } from './src/helpers/ResponseIA';


const openai = new OpenAIApi(configuration);

const App = () => {
  const [question, setQuestion] = useState("");
  const [questionEnable, setQuestionEnable]=useState(false);
  const [button, setButton]=useState(false);
  const [repsonseIA, setResponseIA] = useState("");
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  // const [arreglo, setArreglo] = useState<string[]>([]);
  const [lastQuestion, setLastQuestion] = useState("");
  const [responseArrayIA, setResponseArrayIA]=useState<any[]>([]);
  const [responseArrayIABefore, setResponseArrayIABefore]=useState<any[]>([]);

  const cliBoard=(respuestaIa : string)=>{
    Clipboard.setString(respuestaIa);
    setButton(false);
  }

  const regenerateResponse=(questionBefore :string)=>{
    // console.log(questionBefore);
    setResponseArrayIA([]);
    // console.log("La resupesta es "+responseArrayIA);
    setResponseArrayIA(responseArrayIABefore);
    openIA(questionBefore);
  }

  const openIA=async(questionSelf: string)=>{
    try {
      setLastQuestion(questionSelf);
    setIsLoadingResponse(true);
    setQuestionEnable(true);
    setResponseIA("");
    setResponseArrayIABefore(responseArrayIA);
    console.log(questionSelf);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      temperature: 0.8,
      max_tokens: 300,
    });
    const datos = response.data.choices as JSON;
    const {message, urlImg} = responseIASelect(datos[0].text);
    setQuestion('');
    setQuestionEnable(false);
    setButton(true);
    setIsLoadingResponse(false);
    setResponseIA(message);

    const addResponse=[{questionUser: questionSelf ,response : message, uriImg:urlImg },...responseArrayIA];
    setResponseArrayIA(addResponse);
    // console.log(responseArrayIA);
    } catch (error) {
      console.log('algo salió mal :(r');
      setQuestionEnable(false);
    setButton(true);
    setIsLoadingResponse(false);
    }
  }
  const renderItem = ({
    item: {
      questionUser = '',
      response = '',
      uriImg = '',
    },
  }) => (
    <View style={{marginVertical:20 , paddingHorizontal:20
    }}>
    <Card onPress={()=>cliBoard(response)}>
          <Card.Content >
           <Text style={{alignSelf:'flex-start', fontSize:19, marginVertical:0, flex:1}}>{questionUser}</Text>
            <Text style={{alignSelf:'center', fontSize:15, marginVertical:0, flex:1}}>{response}</Text>
            {
              uriImg !== 'none'
              ? <>
                <Image source={{uri: uriImg}}
              style={{width: 200, height: 200, alignSelf:'center'}} />
              
              </>
              : <></>
            }
            <Button  mode='outlined' onPress={()=>regenerateResponse(lastQuestion)} style={{marginVertical:5}}> Regenerate Response</Button> 
          </Card.Content>
        </Card>
    </View>
  );

  return (
        
    <PaperProvider>
      
        
        
      <SafeAreaView style={{justifyContent:'center', alignContent:'center', flex:1 }}>
        <Card  style={{}}>
          <Card.Content >
            <Text style={{alignSelf:'center', fontSize:20, marginVertical:10}}>Welcom to Chat bot</Text>
            <TextInput
              disabled = {questionEnable}
              mode='outlined'
              label="Enter your question"
              value={question}
              onChangeText={text => setQuestion(text)}
              style={{marginVertical:15}}
            />
          <Button  mode='outlined' onPress={()=>openIA(question)} style={{marginVertical:5}}> Ask OpenIA</Button> 
          
          
          
          </Card.Content>
        </Card>
        <ScrollView>
          
              
            {isLoadingResponse ? 
      <View style={{marginVertical:20 , paddingHorizontal:20
      }}>
        <Card>

         <Card.Content >
          <Rive
          
            resourceName='making_message'
            style={{width: 200, height: 200, alignSelf:'center'}}
            />
         </Card.Content>
            </Card>
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
        {/* <Text style={{alignSelf:'center', fontSize:14, marginVertical:10}}>{responseArrayIA}</Text> */}
        </ScrollView>
      </SafeAreaView>
   </PaperProvider>
    
  );
};
export default App;