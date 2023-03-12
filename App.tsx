
import React, { useState } from 'react';
import { Clipboard, FlatList, Image, ScrollView, View } from 'react-native';

import { Button, Card, Provider as PaperProvider, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


import Rive from 'rive-react-native';
import "react-native-url-polyfill/auto";
import { responseIASelect } from './src/helpers/resolveURL';
import { openIA } from './src/helpers/responseIA';




const App = () => {
  const [question, setQuestion] = useState("");
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [responseArrayIA, setResponseArrayIA]=useState<any[]>([]);
  const [lastInformation, setLastInformation]=useState({});
 

  const cliBoard=(respuestaIa : string)=>{
    Clipboard.setString(respuestaIa);
  }

  const regenerateResponse=(questionBefore :string)=>{
    setResponseArrayIA([]);
    ask(questionBefore);
  }
  const updateInfotmation=()=>{
    const information: any[]= [lastInformation, ...responseArrayIA];
    setResponseArrayIA(information);
  }

  const ask=async(questionSelf: string)=>{
    try {
      
      setIsLoadingResponse(true);
      setQuestion('');
      const {message, urlImg}= await openIA(questionSelf);
      if(message === '' || urlImg === ''){
        return console.log('algo ha pasado');
      }
      setIsLoadingResponse(false);
      setLastInformation({questionUser: questionSelf,response : message, uriImg:urlImg});
      setLastInformation({});
    } catch (error) {
      console.log('algo salió mal :(r');
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
            <Button  mode='outlined' onPress={()=>regenerateResponse(questionUser)} style={{marginVertical:5}}> Regenerate Response</Button>
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
              disabled = {isLoadingResponse}
              mode='outlined'
              label="Enter your question"
              value={question}
              onChangeText={text => setQuestion(text)}
              style={{marginVertical:15}}
            />
          <Button  mode='outlined' onPress={()=>
          {
            ask(question);
          }} style={{marginVertical:5}}> Ask OpenIA</Button> 
          <Button  mode='outlined' onPress={async()=>{
              
              console.log('tus datos osn' ,lastInformation);

            }} style={{marginVertical:5}}> Regenerate Response</Button> 
          
          
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