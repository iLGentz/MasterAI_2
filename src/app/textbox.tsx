'use client'

import { LuSpeech } from 'react-icons/lu';
import { GoogleGenAI } from "@google/genai";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { textareaClasses, buttonClasses, containerClasses, buttonClassesX } from "../styles/components";
import { send } from "process";
const ai = new GoogleGenAI({ apiKey: "AIzaSyCULxtrZWIXbg0YZ35JmyMwf8PsBU9Fbvw" });

export default function PromptAI() {
    const [text, setText] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const responseRef = useRef<HTMLTextAreaElement>(null);

    // Effetto per gestire l'auto-resize della textarea di risposta
    useEffect(() => {
        if (responseRef.current) {
            responseRef.current.style.height = 'auto';
            responseRef.current.style.height = `${responseRef.current.scrollHeight}px`;
        }
    }, [response]); // Si attiva quando cambia la risposta



    const SendToAI = async () => {
        //if (isLoading) return;
        setIsLoading(true);


        try {
            const result = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: text
            });

            setResponse(result.text || 'No response received');
        }
        catch (err) {
            console.error(err);
            setResponse('Error occurred while processing request');
        } finally {
            setIsLoading(false);
        }
    }

    const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setText(e.target.value);
    };

    const readResponse = () => {
        if ('speechSynthesis' in window) {
            const toRead = new SpeechSynthesisUtterance(response);
            speechSynthesis.speak(toRead);
        }
        console.log("Reading response: " + response);
    }


    // Aggiungo listener per la scorciatoia Ctrl + Invio
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "Enter") {
                e.preventDefault();
                SendToAI();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [SendToAI, text]);



    return (
        <>
            <div className={containerClasses.section}>
                <label className={containerClasses.label}>
                    Write your Prompt:
                    <br />
                    <textarea // Input del prompt
                        id="promptAI"
                        value={text}
                        onChange={autoResize}
                        placeholder="Incolla il tuo testo qui..."
                        className={`${textareaClasses.base} ${textareaClasses.default}`}
                        style={{ resize: 'none' }}
                    />

                    <>
                        <br />
                        <div className="flex gap-2"> {/* Add this container div */}
                            <button
                                className={`${buttonClasses.base} ${isLoading ? buttonClasses.loading : buttonClasses.primary}`}
                                onClick={SendToAI}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Press to send!'}
                            </button>
                            <button
                                className={`${buttonClassesX.clear}`}
                                onClick={() => setText('')}
                            >
                                X
                            </button>
                        </div>
                    </>
                </label>
            </div>

            <div className={containerClasses.section}>
                <label className={containerClasses.label}>
                    Response by Gemini:
                    <br />
                    <div className="relative">{/* container relative per posizionare il bottone dentro la textarea */}
                        <textarea
                            ref={responseRef}
                            id="responseBox"
                            value={response}
                            readOnly
                            className={`${textareaClasses.response} ${textareaClasses.default}`}
                            style={{ resize: 'none' }}
                        />

                        {/* Bottone posizionato dentro la textarea, usa le stesse classi del tasto X per dimensione */}
                        <button
                            className={`${buttonClassesX.speech} absolute right-2 top-2`}
                            onClick={() => readResponse()}
                            aria-label="Read response"
                        >
                            <LuSpeech />
                        </button>
                    </div>
                </label>
            </div>
        </>
    );
}