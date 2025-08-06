from pathlib import Path
import transformers
# from transformers.onnx import FeaturesManager
from transformers import AutoConfig, AutoTokenizer, AutoModelForSequenceClassification,Gemma3nForConditionalGeneration
# load model and tokenizer

from unsloth import FastModel
import torch
from transformers import TextStreamer
from unsloth.chat_templates import get_chat_template
from datasets import load_dataset
from unsloth.chat_templates import standardize_data_formats
from trl import SFTTrainer, SFTConfig
from unsloth.chat_templates import train_on_responses_only


model_id = "viveksil/prathamops-en-E2B"

model, tokenizer = FastModel.from_pretrained(
    model_name = model_id,
    dtype = None, # None for auto detection
    max_seq_length = 1024, # Choose any for long context!
    load_in_4bit = True,  # 4 bit quantization to reduce memory
    full_finetuning = False, # [NEW!] We have full finetuning now!
    # token = "hf_...", # use one if using gated models
)


model.save_pretrained_gguf(
        "gemma-3N-2B-en",
        quantization_type = "Q8_0", # For now only Q8_0, BF16, F16 supported
    )

# gemma3n model not supported yet
# model_kind, model_onnx_config = FeaturesManager.check_supported_model_or_raise(base_model, feature=feature)
# onnx_config = model_onnx_config(base_model.config)
# # export
# onnx_inputs, onnx_outputs = transformers.onnx.export(
#         preprocessor=tokenizer,
#         model=base_model,
#         config=onnx_config,
#         opset=13,
#         output=Path("./gemma-3n-2B-en-fa.onnx")
# )