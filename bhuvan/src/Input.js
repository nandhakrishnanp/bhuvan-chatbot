
import { FaMicrophone, FaArrowRight } from 'react-icons/fa';

const Input = ({apiResponse,
  setApiResponse,
  inputValue,
 

  handleFormSubmit,
  handleInputChange,

  sendInputToApi,
  runSpeechRecog
  

}) => {
 
  
  return (
    <div className="chat-input-container">
         

      <div className="textcontainer">
        <form action="" id="inputbar" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Type something..."
            
            value={inputValue}

            onChange={handleInputChange}
          
          />
         
          <button type="button" onClick={ runSpeechRecog}   >
           <FaMicrophone/>
          </button>
          <button onClick={sendInputToApi}>
            <FaArrowRight />
          </button>
        </form>
        
      </div>
    
    </div>
  );
};

export default Input;
