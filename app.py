from flask import Flask, render_template, request, jsonify
import openai
import os

app = Flask(__name__)

# הגדרת מפתח API (יש להכניס את המפתח שלך)
os.environ["OPENAI_API_KEY"] = "sk-proj-7eRuYcMbSObtd_VC60zFOXlbD639tYnBy30yPX_0A19zhMyirqH45TdYCQvb" \
                               "-aAYAiOiuSWbT4T3BlbkFJBUK6g0EE0xFxnPUCbPGBxqWeQf3umILjT9iiq8AI8a8hAwNgOD7AYZVNOGvNWUqoFlIbV-atcA"


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"error": "No message received"}), 400

    try:
        client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": "You are an expert in communication systems, satellite "
                                                    "communications, RF, and military and civilian radios."},
                      {"role": "user", "content": user_message}]
        )
        bot_reply = response.choices[0].message.content
    except Exception as e:
        bot_reply = "שגיאה בעת עיבוד הבקשה, אנא נסה שוב."

    return jsonify({"reply": bot_reply})


if __name__ == '__main__':
    app.run(debug=True)
