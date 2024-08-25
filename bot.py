# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

# Configure API Key
GOOGLE_API_KEY = "your-api-key"
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

def chatbot(prompt):
    instructions = f'''
                    - Your role is to be a healthcare assistant and reply to user accordingly.
                    - Do not use bold text and asterisks.
                    - Answer must be short and precise.
                    - Dont use numbers or asterisks for a sentence other than bullet points.
                    - Use numbered lists for organization.
                    - Ensure your responses are empathetic and considerate.
                    - Keep your replies concise, under 100 words.
                    - Use numbers for only bullet points.
                    - Limit responses to 100 words or less.
                    - Respond with care and understanding.
                    - Act as a healthcare assistant, responding to related queries.
                    - If the prompt is not about healthcare, reply with "Sorry, I can only help with healthcare-related questions."
                    - Avoid using asterisks or bold text.
                    prompt = {prompt}
                  '''
    response = model.generate_content(instructions)
    return response.text

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_input = data.get('prompt')
        
        if not user_input:
            return jsonify({'error': 'No prompt provided'}), 400
        
        response_text = chatbot(user_input)
        return jsonify({'response': response_text})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(port=5000)
