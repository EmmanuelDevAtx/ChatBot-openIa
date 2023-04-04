import { responseIASelect } from "./resolveURL";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export const openIA=async(question: string)=>{

    try {
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      temperature: 0.8,
      max_tokens: 300,
    });
    const datos = response.data.choices as JSON;
    const {message, urlImg} = responseIASelect(datos[0].text);

    return {message, urlImg};
    } catch (error) {
    
    }
    return {message: '', urlImg:''};
  }