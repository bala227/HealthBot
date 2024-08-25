# Personal Healthcare Assistant with Gemini Pro

## Overview

This project is a web application designed as a personal healthcare assistant, integrating speech recognition and text-to-speech functionalities using React for the frontend and Flask for the backend. The application leverages the Gemini Pro model to provide intelligent responses and manage user interactions. Users can communicate with the assistant through voice or text and receive healthcare-related information and support.

## Getting Started

Follow these steps to run the project locally.

### 1. Setting Up Flask Backend

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>

2. **Install required packages:**

    ```bash
    pip install flask
    pip install -U flask-cors
    pip install -q -U google-generativeai

3. **Run the application:**

    ```bash
    python bot.py
    npm start

**Note :** Paste your gemini api key in the file "bot.py"  

### Features:

1.**Speech Recognition:**
        Converts user speech to text using the Web Speech API.
        Supports browsers that implement webkitSpeechRecognition or SpeechRecognition.

2.**Text-to-Speech:**
        Converts text responses into audible speech.
        Uses the Web Speech API for speech synthesis.
        Supports different voices, including 'Heera'.

3.**Gemini Pro Integration:**
        Utilizes the Gemini Pro model to generate intelligent responses and provide healthcare-related information.

 ### Technologies Used:
 
1. **Frontend:** React, JavaScript, CSS.

2. **Backend:** Flask, Python.

3. **APIs:** Web Speech API (Speech Recognition and Speech Synthesis), Gemini Pro.

