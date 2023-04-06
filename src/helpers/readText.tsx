
import Tts from 'react-native-tts';

export const textRead=async (text :string)=>{
  await Tts.speak(text,{
    iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
    rate: 0.5,
    androidParams: {
      KEY_PARAM_PAN: 0,
      KEY_PARAM_VOLUME: 1,
      KEY_PARAM_STREAM: 'STREAM_MUSIC',
    },});
      
}

export const stopSpeaking=async ()=>{
  await Tts.stop();
}