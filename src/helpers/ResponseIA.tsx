import { responseIASelect } from "./resolveURL";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export const openIA=async(question: string)=>{
    try {
    const respuesta =  JSON.stringify(question);
    console.log(respuesta);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: respuesta,
      temperature: 0.8,
      max_tokens: 250,
    });
    const datos = response.data.choices;
    const message = datos[0].text as string;

    return {message};
    } catch (error) {
    
    }
    return {message: ''};
  }