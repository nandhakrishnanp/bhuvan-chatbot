import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'; 

import express, { response, request } from 'express';
import pkg from 'node-wit';
import mongoose from 'mongoose';
const { Wit } = pkg;
const app = express();
app.use(express.json());
app.use(cors());
const accessToken = process.env.WIT_TOKEN;
let intentdb;
const connection= async ()=>{
   const connect = await mongoose.connect(process.env.MONGO_DB_URL);
   console.log("Connected to mongodb suceessfully");
   const chatbotSchema = new mongoose.Schema(
    {
      intent: {
        type: String,
        required: true,
      },
      response: {
        message: {
          type: String,
          required: true,
        },
      },

    }
   );

  

    intentdb = mongoose.model('intents', chatbotSchema);

    
}
connection();

 

  let Mainresponse = {};   //--->Main response variable 
    
  app.post('/', async (req, res) => {
    const { input } = req.body;
    try {
        const final = await handleMsg(input);
        console.log(final);

        res.json({ final });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const handleMsg = async (message) => {
    try {
        console.log('Received message:', message);
        const client = new Wit({ accessToken });
        const response = await client.message(message, {});
        if (response) {
            return handleres(response);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
   
    
    const handleres = async (response) => {
      let name = undefined;
      let confidence = 0;
      Array(response).forEach((r) => {                      //-->exatracting the Intent from wit response
        if (r.intents.length > 0) {
          name = r.intents[0].name;
          confidence = r.intents[0].confidence;
        }
      });
         console.log(name, confidence);                        
          if(name==undefined){
            return Mainresponse ={message: 'I did not find anything relevant to this request'}
          }
          
         const result =  await intentdb.find({intent:name});
         return Mainresponse ={message: result[0].response.message}
     
    }
  
      app.get('/',(req,res)=>{   
                                                               //sending the final prompt to Frontend
        res.json( {Mainresponse});
       Mainresponse = { message : "Server Error Try Again"};
        
    })
app.listen(process.env.PORT, () => {
  console.log(`Bhuvan server is live at ${process.env.PORT}`);
});