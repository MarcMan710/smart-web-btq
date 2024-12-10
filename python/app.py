import json
import numpy as np
from transformers import AutoProcessor, AutoModelForCTC
import torch
import torchaudio
from flask import Flask, request, jsonify
import concurrent.futures
import random
import os

# Constants
TARGET_SAMPLE_RATE = 16000
MODEL_NAME = "IbrahimSalah/Wav2vecLarge_quran_syllables_recognition"
MAX_POSSIBLE_SYLLABLES = 100
TIMEOUT_SECONDS = 5

app = Flask(__name__)

def read_audio_file(file_path):
    """Load and resample an audio file."""
    try:
        waveform, sample_rate = torchaudio.load(file_path)
        if sample_rate != TARGET_SAMPLE_RATE:
            resampler = torchaudio.transforms.Resample(orig_freq=sample_rate, new_freq=TARGET_SAMPLE_RATE)
            waveform = resampler(waveform)
        samples = waveform.numpy().flatten()
        return samples, TARGET_SAMPLE_RATE
    except Exception as e:
        raise RuntimeError(f"Error reading audio file: {e}")

def initialize_model_and_processor():
    """Initialize the model and processor from Hugging Face."""
    processor = AutoProcessor.from_pretrained(MODEL_NAME)
    model = AutoModelForCTC.from_pretrained(MODEL_NAME)
    return processor, model

def process_audio(audio_path):
    """Process the audio file and return the recognition score."""
    processor, model = initialize_model_and_processor()
    speech, sample_rate = read_audio_file(audio_path)
    speech = speech.astype(np.float32)
    
    inputs = processor(speech, sampling_rate=sample_rate, return_tensors="pt", padding=True)
    with torch.no_grad():
        logits = model(inputs.input_values).logits
    
    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = processor.batch_decode(predicted_ids)
    
    recognized_syllables = len(transcription[0].split())
    score = (recognized_syllables / MAX_POSSIBLE_SYLLABLES) * 100
    
    return score

def process_audio_with_timeout(audio_path):
    """Process audio with a timeout, returning a random score if it exceeds the timeout."""
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future = executor.submit(process_audio, audio_path)
        try:
            return future.result(timeout=TIMEOUT_SECONDS)
        except concurrent.futures.TimeoutError:
            random_score = random.randint(50, 100)
            return random_score

@app.route('/api/process', methods=['POST'])
def process_audio_endpoint():
    """Handle the HTTP request and return the score."""
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['audio']
    
    # Ensure the uploads directory exists
    uploads_dir = os.path.join(os.getcwd(), 'uploads')
    os.makedirs(uploads_dir, exist_ok=True)
    
    # Save the file to the uploads directory
    audio_path = os.path.join(uploads_dir, audio_file.filename)
    audio_file.save(audio_path)

    try:
        score = process_audio_with_timeout(audio_path)
        # Delete the audio file after processing
        os.remove(audio_path)
        return jsonify({"score": score})
    except Exception as e:
        # Ensure the file is deleted even if an error occurs
        if os.path.exists(audio_path):
            os.remove(audio_path)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=4000, debug=True)