from mediapipe.tasks.python.genai import converter

#Not supported yet for gemma3n models
cfg = converter.ConversionConfig(
   input_ckpt="./prathamops-en-E2B",           
   ckpt_format="safetensors",
   model_type="GEMMA_2B",                         
   backend="cpu",                                 
   output_dir="intermediate/",                   
   combine_file_only=False,
   vocab_model_file="./prathamops-en-E2B/tokenizer.model",    
   output_tflite_file="./prathamops-en-E2B",
   feedforward_quant_bits=4,
   attention_quant_bits=4,
   embedding_quant_bits=4,
)
converter.convert_checkpoint(cfg)
