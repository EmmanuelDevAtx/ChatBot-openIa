
import React, { useEffect, useState } from 'react';
import { Clipboard, FlatList, Image, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import { Button, Card, Provider as PaperProvider, Text, TextInput, MD3DarkTheme as DefaultTheme, AnimatedFAB, } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import Rive from 'rive-react-native';
import "react-native-url-polyfill/auto";
import { openIA } from './src/helpers/ResponseIA';

import { Banner } from 'react-native-paper';
import { colors } from './src/Theme/Colors';
import { CardCenter } from './src/components/cardCenter';
import { BannerOpenIa } from './src/components/Banner';
import { CardCenterEmpty } from './src/components/cardCenterEmpty';

// const theme = {...DefaultTheme, color:{
//   primary: '#66EAFF'
// }};

const theme = {...DefaultTheme, ...colors};

type responseInfo={
  questionUser: string,
  response: string,
  uriImg: string,
}

const App = () => {
  const [showQuestion, setShhowQuestion] = useState(true);
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
        <CardCenter
          onPress={()=>cliBoard(response)}
          questionUser={questionUser}
          responseUser={response}
          style={styles.cardResponse}
          styleBackgroundCard={styles.cardResponseBackground}
          uriImg={uriImg}
        />
    </View>
  );



  return (
    <PaperProvider theme={theme}>  
      <SafeAreaView style={{justifyContent:'center', alignContent:'center', flex:1 }}>
        <LinearGradient colors={['#29313B','#1A1E23']} style={{height:'100%'}}>
        <BannerOpenIa
          styles={styles.cardResponse}
          visible={showQuestion}
          loadingResponse={isLoadingResponse}
          askQuestion={()=> ask(question)}
          onChangeText={(text) => setQuestion(text)}
          question={question}
        />
        
        <ScrollView>
        <View style={{marginVertical:20 , paddingHorizontal:20
    }}>
        {
          
          lastInformation.questionUser !== 'none'
          ?
        <CardCenter
          onPress={()=>cliBoard(lastInformation.response)}
          questionUser={lastInformation.questionUser}
          responseUser={lastInformation.response}
          style={styles.cardResponse}
          styleBackgroundCard={styles.cardResponseBackground}
          uriImg={lastInformation.uriImg}
          onRegenerate={()=>regenerateResponse(lastInformation.questionUser)}
        />
          : <></>
        }
        </View>
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
        <AnimatedFAB
        icon={({size}) => (
          <Text style={{color:'black', alignSelf:'center'}}>{!showQuestion ?  'Open IA' : 'Hide IA'}</Text>
          // <></>
        )}
        
        color='black'
        label={''}
        extended={false}
        onPress={() => setShhowQuestion(!showQuestion)}
        visible={true}
        animateFrom={'right'}
        iconMode={'static'}
        style={styles.fabStyle}
      />
        </LinearGradient>
      </SafeAreaView>
   </PaperProvider>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    // right: 16,
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
    // borderWidth:1,
  },
  cardResponseBackground:{
    paddingVertical:15,
    borderRadius:15, 
  },
});
export default App;