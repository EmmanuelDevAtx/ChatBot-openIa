
import React, { useEffect, useState } from 'react';
import { Clipboard, FlatList, Image, ScrollView, View } from 'react-native';

import { Button, Card, Provider as PaperProvider, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import Rive from 'rive-react-native';
import "react-native-url-polyfill/auto";
import { openIA } from './src/helpers/ResponseIA';


type responseInfo={
  questionUser: string,
  response: string,
  uriImg: string,
}

const App = () => {
  const [question, setQuestion] = useState("");
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [responseArrayIA, setResponseArrayIA]=useState<any[]>([]);
  const [lastInformation, setLastInformation]=useState<responseInfo>(
    {questionUser: 'Welcome to my chat bot ',
    response : 'please use to learn werever you want', 
    uriImg:'none'});
 
  useEffect(() => {
    console.log(lastInformation.questionUser);
  }, [lastInformation,...responseArrayIA]);
  const cliBoard=(respuestaIa : string)=>{
    Clipboard.setString(respuestaIa);
  }

  const regenerateResponse=async(questionBefore :string)=>{
    await cleanInformation();
    setIsLoadingResponse(true);
    const {message, urlImg}= await openIA(questionBefore);
      if(message === '' || urlImg === ''){
        return console.log('algo ha pasado');
      }
      setIsLoadingResponse(false);
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
      setIsLoadingResponse(true);
      setQuestion('');
      updateInfotmation();
      const {message, urlImg}= await openIA(questionSelf);
      if(message === '' || urlImg === ''){
        return console.log('algo ha pasado');
      }
      setIsLoadingResponse(false);
      setLastInformation({questionUser: questionSelf,response : message, uriImg:urlImg});
      console.log(lastInformation);
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
          </Card.Content>
        </Card>
    </View>
  );

  return (
    <PaperProvider>  
      <SafeAreaView style={{justifyContent:'center', alignContent:'center', flex:1 }}>
        <LinearGradient colors={['#CEEFF7','#7DBCFD','#3223BA']} style={{height:'100%'}}>
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
        <View style={{marginVertical:20 , paddingHorizontal:20
    }}>
        {
          
          lastInformation.questionUser !== 'none'
          ?
          <Card >
          <Card.Content >
              <Text style={{alignSelf:'flex-start', fontSize:19, marginVertical:0}}>{lastInformation.questionUser}</Text>
             <Text style={{alignSelf:'center', fontSize:15, marginVertical:0}}>{lastInformation.response}</Text>
             {
              lastInformation.uriImg !== 'none'
              ? <>
                <Image source={{uri: lastInformation.uriImg}}
              style={{width: 200, height: 200, alignSelf:'center'}} />
              
              </>
              : <></>
            }
             <Button  mode='outlined' onPress={()=>regenerateResponse(lastInformation.questionUser)} style={{marginVertical:5}}> Regenerate Response</Button>
          
          </Card.Content>
        </Card>
          : <></>
        }
        </View>
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
        
        </ScrollView>
        </LinearGradient>
      </SafeAreaView>
   </PaperProvider>
    
  );
};
export default App;