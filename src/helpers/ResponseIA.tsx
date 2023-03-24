import { responseIASelect } from "./resolveURL";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export const openIA=async(question: string, context:responseInfo[])=>{
    console.log(context);
    try {
    // const getContext = await contextIa(context);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: 'contexto :'+context + 'mi pregunta es: '+question,
      temperature: 0.8,
      max_tokens: 300,
      // context
    });
    const datos = response.data.choices as JSON;
    const {message, urlImg} = responseIASelect(datos[0].text);

    return {message, urlImg};
    } catch (error) {
    
    }
    return {message: '', urlImg:''};
  }

  type responseInfo={
    questionUser: string,
    response: string,
  }
  const contextIa=async(context: responseInfo[])=>{
  const response:any = await context.map((data, index) =>{
    if(index < 3){
      return({
        question: data.questionUser
      });
    }
    return;
  }
  );
  // console.log(response);
}