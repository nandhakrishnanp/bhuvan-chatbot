import React, { useEffect, useRef } from 'react';
import { FaComment } from 'react-icons/fa';
import Linkify from 'react-linkify';
import './Homepage.css'; // Import your CSS file
import Popup from './Popup';

const Homepage = ({  isspeaking, stopSpeech,setListening,  messages  ,transcript , isLoading , listening}) => {
  const containerRef = useRef(null);

  const TextWithClickableLinks = ({ text }) => (
    <Linkify>{text}</Linkify>
  );

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);             //>>>> For scrolling

  return (
    <div className='homepage-container'>
      <h1>
        Bhuvan ChatBot
        <FaComment style={{ paddingLeft: '14px' }} />
      </h1>
      <div id='how'>
        { messages.length ==0 ?  <h3>Hello How Can I Help You Today ?</h3> :null }
   
      </div>
      

      <div className='empty'>
        {messages.length === 0 ? (
          <img id='img' width="100px" src="bg.png" alt="bot" />
      
        ) : null}
        
      </div>
      <div id='container-msg' ref={containerRef} className='conversation-container'>
        {messages.map((data, index) => (
          <div key={index} className={data.msg.inputValue || data.msg.transcript ? 'right-msg' : 'left-msg'}>
            
            <p >
              <TextWithClickableLinks text={data.msg.inputValue || data.msg.prompt || data.msg.transcript} />
             
           </p>
       
          </div>
        ))}
           {isLoading ? <p id="loading"> typing....</p>: null}
      </div >
        <div >

        { listening ?  <Popup id="voicebg"  isspeaking={isspeaking} stopSpeech={stopSpeech}  setListening={setListening}  transcript={transcript}/>: null}
        </div>
         
    </div>
  );
};

export default Homepage;
