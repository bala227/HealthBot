import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../component/Navbar';
import Footer from './Footer';

const Home = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  let recognition;

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognition = new window.webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
      recognition = new window.SpeechRecognition();
    }

    if (recognition) {
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }

        setInput(finalTranscript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error detected: ' + event.error);
        setIsListening(false);
      };
    }

    // Cleanup function to cancel speech synthesis
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent empty submissions
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, type: 'user' }
    ]);
    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, type: 'bot' },
      ]);
      // Call the function to read out the bot's response
      speak(data.response);
    } catch (error) {
      console.error('Error:', error);
    }
    setInput('');
  };

  const handleSpeak = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        setInput(''); // Clear the input before starting
        recognition.start();
        setIsListening(true);
      }
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech synthesis
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported in this browser.');
    }
  };

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='home'>
          <div className='answer'>
            {messages.length === 0 ? (
              <div className='no-messages'>
                No messages
              </div>
            ) : (
              messages.map((msg, index) => (
                <pre key={index} className={msg.type} id='pre'>
                  {msg.text}
                </pre>
              ))
            )}
          </div>
          <form onSubmit={handleSubmit} className='prompt'>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <p className='button' type="submit" onClick={handleSubmit}>Send</p>
            <p className='button' onClick={handleSpeak}>
              {isListening ? 'Listening...' : 'Speak'}
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
