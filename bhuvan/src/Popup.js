import React from 'react';
import './popup.css';
import SpeechRecognition from 'react-speech-recognition';
import { FaMicrophone } from 'react-icons/fa';

const Popup = ({ isspeaking, stopSpeech, setListening, transcript}) => {

  return (
    <div id='voicebg'>
     
      <div id='wrapper-voice'>
             <h5 id='trans'> {transcript} </h5> 
         <FaMicrophone onClick={stopSpeech} id='mic'></FaMicrophone>
         <p id='tap'>{isspeaking}</p>  
      </div>
     
    </div>
  );
};

export default Popup;
