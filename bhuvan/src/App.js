
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';
import Input from './Input';
import Nav from './Nav';
import axios from 'axios';
import About from './About';
import Contact from './Contact';
import Resource from './Resource';
import React, { useEffect, useState } from 'react';


function App()  {
   
  const [apiResponse, setApiResponse] = useState('');
  const [inputValue, setInputValue] = useState(''); //input
  const [prompts,setprompt] = useState(''); // response
  const [transcript, setTranscript] = useState(' ');
  const [listening, setListening] = useState(false);

  const [messages , setMessages] = useState([]);
  const [isLoading,SetisLoading] = useState(false)
 
  const sendInputToApi = async () => {
    console.log(inputValue);
    try {

      
      const userInput = inputValue ; 
      setMessages( msg => [...msg,{  msg : {inputValue}}])
      setInputValue('');
      const response = await axios.post('http://localhost:3001', { input: userInput });
      setApiResponse(response.data);
      console.log(apiResponse)

      
      
      SetisLoading(true)
      
      
    } catch (error) {
      console.error('Error sending input to API:', error);
    }

    const handleReq = async()=>{
       
      const respose = await fetch("http://localhost:3001/")
       const result = await respose.json();
       const prompt = result.Mainresponse.message; 
       setprompt(prompt);
       
       if(prompt.length!=0){
        SetisLoading(false)
       setMessages( msg => [...msg,{ type: "bot", msg : {prompt}}])

       }
      
 }
     
  
    setTimeout(
      handleReq, 2500);

     

  };

   const handleInputChange = (event) => {
    setInputValue(event.target.value);
   // console.log(inputValue);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

  };
  /// speech reconization
  

 

  const runSpeechRecog = () => {
    
     setTranscript("'Listening...")
    const recognition = new window.webkitSpeechRecognition();
    recognition.interimResults = true
   
    
    recognition.onstart = () => {
      setListening(true);
    };
    //   recognition.maxDuration = 5000; 
    // recognition.continuous = true;
    // //15sec
    //god its working
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
    
      setTranscript(transcript);
      
    };

    recognition.onend = () => {
      setListening(false);
      setInputValue(transcript)
      sendInputToApi()
      console.log(transcript);
    };

    recognition.start();
  

  };

  // useEffect(() => {
  //   if (listening) {
  //        var status =  'Listening...';
  //   }
  // }, [listening]);






  return (
    <div>
         <Routes>
       
  <Route path='/' element={
    <div>
      <Nav/>
      <Homepage
        prompt={prompts} 
        listening = {listening}
        messages={messages}
        transcript ={transcript}    //   final transcript
        isLoading ={isLoading}
      />
   
      <Input
        runSpeechRecog ={runSpeechRecog}

        apiResponse={apiResponse}
        setApiResponse={setApiResponse}
        inputValue={inputValue}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        sendInputToApi={sendInputToApi}
      />
    </div>
  } />
   
  <Route path='/About' element={<About />} />
  <Route path='/Contact' element={<Contact />} />
  <Route path='/Resource' element={<Resource />} />
</Routes>

    </div>
  );
}

export default App