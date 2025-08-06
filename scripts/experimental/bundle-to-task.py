import mediapipe as mp
from mediapipe.tasks.python.genai import bundler

TFLITE = "./gemma3-1b_q4_block32_ekv256.tflite"
TOKEN = "./taskfileint4/tokenizer.model"
OUTPUT = "gemma-3-1B-en-fa-1b-q4-256.task"

config = bundler.BundleConfig(
    tflite_model=TFLITE,
    tokenizer_model=TOKEN,
    start_token="<start_of_turn>user\n",
    stop_tokens=["<end_of_turn>\n"],
    output_filename=OUTPUT,
    enable_bytes_to_unicode_mapping=True,
    prompt_prefix="<start_of_turn>user\n",
    prompt_suffix="<end_of_turn>\n<start_of_turn>model\n"
)

bundler.create_bundle(config)
print(f"Created bundle: {OUTPUT}")