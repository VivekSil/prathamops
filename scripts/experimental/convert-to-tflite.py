from mediapipe.tasks.python.genai import converter

#Not supported yet for gemma3n models
cfg = converter.ConversionConfig(
   input_ckpt="./prathamops-en-E2B",           # directory containing your safetensors
   ckpt_format="safetensors",
   model_type="GEMMA_2B",                         # or "GEMMA_3" if you fine‑tuned Gemma‑3
   backend="cpu",                                 # only 'cpu' supported for base model
   output_dir="intermediate/",                    # optional
   combine_file_only=False,
   vocab_model_file="./prathamops-en-E2B/tokenizer.model",    # SentencePiece .model
   output_tflite_file="./prathamops-en-E2B",
   # optional quantization size—here X4 is supported (the only options are 4 or 8)
   feedforward_quant_bits=4,
   attention_quant_bits=4,
   embedding_quant_bits=4,
)
converter.convert_checkpoint(cfg)
