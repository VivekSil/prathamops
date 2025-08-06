import os
import gradio as gr
from ollama import Client

OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "viveksil/prathamops-en-E2B:latest")

client = Client(host=OLLAMA_HOST)

def chat_with_ollama(message, history):
    messages = []
    for user_msg, bot_msg in history:
        messages.append({"role": "user", "content": user_msg})
        messages.append({"role": "assistant", "content": bot_msg})
    messages.append({"role": "user", "content": message})

    response = client.chat(model=OLLAMA_MODEL, messages=messages)
    bot_reply = response["message"]["content"]
    history.append((message, bot_reply))
    return history, history

# Custom CSS and header
header_html = """
<style>
  body {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f5f9f8;
  background-image: url('/home/viveks/Desktop/experiments/g3n/ollama/app/img1.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  }
  .gradio-container {
    padding: 0 !important;
  }
  .title-wrapper {
    background-color: #2E9E84;
    padding: 1.2em;
    text-align: center;
    color: #d32f2f;
    border-bottom: 4px solid #b71c1c;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  .title-wrapper h1 {
    margin: 0;
    font-size: 2em;
  }
  .title-wrapper p {
    margin: 0.5em 0 0;
    font-size: 1.1em;
    color: #ffeaea;
  }
  .footer {
    margin-top: 2em;
    font-size: 0.85em;
    text-align: center;
    color: #666;
  }
  .gr-chatbot {
    border-radius: 10px !important;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  }
  .gr-textbox textarea {
    border-radius: 8px !important;
  }
  .gr-button {
    border-radius: 8px !important;
    background-color: #d32f2f !important;
    color: #d32f2f !important;
  }
</style>
<div class="title-wrapper">
  <h1>🩺 PrathamOps Assistant</h1>
  <p>You on-device first aid assistant</p>
</div>
"""

with gr.Blocks() as demo:
    gr.HTML(header_html)

    chatbot = gr.Chatbot(label="", bubble_full_width=False, height=450)
    with gr.Row(equal_height=True):
        msg = gr.Textbox(placeholder="Ask a first aid question...", scale=8, lines=1)
        submit = gr.Button("Send", variant="primary", scale=1)

    state = gr.State([])

    def respond(message, chat_history):
        return chat_with_ollama(message, chat_history)

    submit.click(respond, [msg, state], [chatbot, state])
    msg.submit(respond, [msg, state], [chatbot, state])

    gr.HTML("<div class='footer'>&copy; 2025 PrathamOps by Vivek Silimkhan</div>")

if __name__ == "__main__":
    demo.launch()
