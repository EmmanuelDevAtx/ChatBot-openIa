
import React, { useState } from 'react';

import { Button, Card, Provider as PaperProvider, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});
import "react-native-url-polyfill/auto";

const openai = new OpenAIApi(configuration);

const App = () => {
  const [question, setQuestion] = useState("");
  const [questionEnable, setQuestionEnable]=useState(false);
  const [repsonseIA, setResponseIA] = useState("");



  const openIA=async()=>{
    setQuestionEnable(true);
    setResponseIA("");
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      temperature: 0.5,
      max_tokens: 300,
    });
    const datos = response.data.choices as JSON;
    setQuestion('');
    setQuestionEnable(false);
    setResponseIA(datos[0].text);
    
  }

  return (
        
    <PaperProvider>
      
      <SafeAreaView style={{justifyContent:'center', alignContent:'center', flex:1 }}>
        
        <Card>
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
          <Button  mode='outlined' onPress={()=>openIA()}> Ask OpenIA</Button> 

          
          </Card.Content>
        </Card>
        <Text style={{alignSelf:'center', fontSize:14, marginVertical:10}}>{repsonseIA}</Text>
      </SafeAreaView>
   </PaperProvider>
    
  );
};
export default App;