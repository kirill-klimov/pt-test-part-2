import { useState, useEffect } from 'react';

export function useSpeechRecognition() {

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    const [recognizedText, setRecognizedText] = useState<string>('');
    const [isRecognizing, setRecognizing] = useState<boolean>(false);
    
    useEffect(() => {

        if (!recognition) {
            console.error('Speech recognition is not supported.');
            return;
        }

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'ru-RU';

        recognition.addEventListener('result', (event: any) => {
            try {
                let transcript = '';
                for (const result of event.results) {
                    const number = Math.floor(Math.random() * 100);
                    transcript += `${result[0].transcript} ${number}`;
                }
                setRecognizedText(transcript);
            } catch(e) {
                console.log(e);
            }
        });

        recognition.addEventListener('start', () => {
            setRecognizedText('Listening...');
            setRecognizing(true);
        });

        recognition.addEventListener('end', () => {
            setRecognizedText('Recongnition ended');
            setRecognizing(false);
        });

        recognition.addEventListener('error', (event: any) => {
            console.error(event.error);
            setRecognizedText('No speech');
            setRecognizing(false);
        });

        return () => { 
            recognition.stop(); 
        };
    }, [recognition]);

    function startListening() {
        if (recognition && !isRecognizing) {
            try {
                recognition.start();
            } catch(e) {
                console.log(e);
            }
        }
    };

    return { 
        recognizedText, 
        startListening,
        isRecognizing,
    };
};