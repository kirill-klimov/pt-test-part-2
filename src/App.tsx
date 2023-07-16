import { useEffect } from "react";
import { useSpeechRecognition } from "./hooks";
import MicIcon from './assets/mic.svg';
import XIcon from './assets/x.svg';
import ReloadIcon from './assets/reload.svg';

function App() {

  const { 
    startListening, 
    recognizedText,
    isRecognizing,
  } = useSpeechRecognition();

  useEffect(() => {
    console.log(isRecognizing);
    
    if (!isRecognizing) {
      startListening();
    }
  }, []);

  return (
    <div className="bg-lime-200 absolute top-0 left-0 w-full h-full grid place-items-center">
      <div className="flex flex-col items-center w-full">
        <div className="mb-4 relative">
          <MicIcon className={`h-16 w-16 ${isRecognizing ? '' : 'stroke-gray-500'}`} />
          {!isRecognizing && <XIcon className={`absolute top-[50%] left-[50%] -translate-y-[50%] 
          -translate-x-[50%] h-20 w-20`} />}
        </div>
        <div className="max-w-2xl w-full text-center">
          <span className="text-3xl font-medium">{recognizedText}</span>
          {
            isRecognizing ? <></> :
            <div 
            onClick={startListening}
            className="flex justify-center mt-4 cursor-pointer">
              <ReloadIcon className="h-12 w-12" />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App
