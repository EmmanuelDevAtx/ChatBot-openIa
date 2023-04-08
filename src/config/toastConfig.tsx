// App.jsx
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import  { BaseToast, ErrorToast } from 'react-native-toast-message';

/*
  1. Create the config
*/
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: () => (
    <BaseToast
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: () => (
    <ErrorToast
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
 copyAswer: ({ text1, text2,props }: {text1: string,text2: string, props:any, styl:any}) => (
    <View style={{ borderLeftWidth:3, borderColor:'green',backgroundColor:'rgba(19, 19, 19, 0.97)', 
    borderRadius:15, padding:10, width: '85%'}}>
      <Text>{text1}</Text>
      <Text>{text2}</Text>
    </View>
  ),
  copyAsk: ({ text1, text2,props }: {text1: string,text2: string, props:any}) => (
    <View style={{borderRadius:15, padding:10, width: '85%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{text2}</Text>
    </View>
  ),

};
