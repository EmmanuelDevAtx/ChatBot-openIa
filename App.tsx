
import React, { useState } from 'react';

import { Button, Card, Provider as PaperProvider, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';



const App = () => {
  const [question, setQuestion] = useState("");

  return (
        
    <PaperProvider>
      
      <SafeAreaView style={{justifyContent:'center', alignContent:'center', flex:1 }}>
        
        <Card>
          <Card.Content >
            <Text style={{alignSelf:'center', fontSize:20, marginVertical:10}}>Welcom to Chat bot</Text>
            <TextInput
              mode='outlined'
              label="Enter your question"
              value={question}
              onChangeText={text => setQuestion(text)}
              style={{marginVertical:15}}
            />
          <Button  mode='outlined' onPress={()=>{}}> Ask OpenIA</Button> 
          </Card.Content>
        </Card>
      </SafeAreaView>
   </PaperProvider>
    
  );
};
export default App;