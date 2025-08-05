from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# All the categorical corpus of data
with open("./generic.txt","r") as f:
# with open("./bonemusclejoint.txt","r") as f:
# with open("./burnposforobj.txt","r") as f:
# with open("./circprob.txt","r") as f:
# with open("./airbreprob.txt","r") as f:
# with open("./resprob.txt","r") as f:
# with open("./unrresbrecas.txt","r") as f:
# with open("./assess.txt","r") as f:
# with open("./pre.txt","r") as f:
    contents = f.read()


# Set of prompts for synthetic data generation
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=f"You need to generate real-life first aid scenarios happening anywhere outside where you are the one helping another baby who is a casualty (not you) when the following content will be useful. You need to generate 20 pairs of diverse real life condition(in normal human description (you are reporting the condition, don't take the person's name, use my, I to refer the reporter) < 100 words) and it's diverse solution (should start with different words and simple, and second person perspective (you,your)) strictly based on the given context. \n\n {contents} \n Strictly return a JSON of condition and solution",
    # contents=f"You need to generate real-life first aid scenarios happening anywhere outside where you are helping another toddler who is a casualty when the following content will be useful. You need to generate 10 pairs of diverse real life condition(in naive human description, in first person perspective (I,Me)< 100 words) and it's diverse solution (should start with different words and simple, and second person perspective (you,your)) strictly based on the given context. \n\n {contents} \n Strictly return a JSON of condition and solution",
    # contents=f"You need to generate real-life first aid scenarios happening anywhere outside where another child < 10 years old is a casualty when the following content will be useful. You need to generate 10 pairs of diverse real life condition(in naive human description, in first person perspective (I,Me)< 100 words) and it's diverse solution (should start with different words and simple, and second person perspective (you,your)) strictly based on the given context. \n\n {contents} \n Strictly return a JSON of condition and solution",
    # contents=f"You need to generate real-life first aid scenarios happening anywhere on the street where baby <3 years is a casualty when the following content will be useful. You need to generate 10 pairs of diverse real life condition(in normal human description, in first person perspective (I,Me)< 100 words) and it's diverse solution (should start with different words, and second person perspective (you,your)) strictly based on the given context. \n\n {contents} \n Strictly return a JSON of condition and solution",
    # contents=f"You need to generate real-life first aid scenarios happening anywhere on the street where child>7 years is a casualty when the following content will be useful. You need to generate 10 pairs of diverse real life condition(in normal human description, in first person perspective (I,Me)< 100 words) and it's diverse solution (should start with different words, and second person perspective (you,your)) strictly based on the given context. \n\n {contents} \n Strictly return a JSON of condition and solution",
    # contents=f"You need to generate real-life first aid scenarios happening anywhere on the street where adult is a casualty when the following content will be useful. You need to generate 10 pairs of diverse real life condition(in normal human description, in first person perspective (I,Me)< 100 words) and it's diverse solution (should start with different words, and second person perspective (you,your)) strictly based on the given context. \n\n {contents} \n Return a JSON of condition and solution",
    # contents=f"You need to generate real-life first aid terrible scenarios happening anywhere when the following content will be useful. You need to generate 10 pairs of diverse real life condition(in naive description, in first person perspective (I,Me)< 100 words) and it's diverse solution (should start with different words, and second person perspective (you,your)) strictly based on the given context. \n\n {contents} \n Return a JSON of condition and solution",
    # contents=f"Precisely generate simple instruction steps for first aiders in 150 words, don't keep any organization's name here and make it easily understandable. \n\n {contents}",
    # contents=f"Precisely summarize this into 300 words, don't keep any organization's name here and make it easily understandable. \n\n {contents}",
)

# Printing the output generated for human curation
print(response.text)