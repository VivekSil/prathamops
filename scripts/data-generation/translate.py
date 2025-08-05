from google import genai
import json
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

with open("./dataset/all.json","r") as f:
    dataset = json.load(f)


for i in range(0,220):
    data = str(dataset[i*5:(i+1)*5])
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"Translate the following JSON to Kannada, but keep the keys of the JSON in English and the structure as it is. Only return the JSON \n{data}"
    )
    if(response.text):
        with open(f"./ka-dataset/{i}.jsonl","w") as f:
            f.write(response.text)
        print(f"Completed: {i+1}")