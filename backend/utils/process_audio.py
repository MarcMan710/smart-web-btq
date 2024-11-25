# Mengimpor modul yang diperlukan
import sys
import json
import numpy as np
from transformers import AutoProcessor, AutoModelForCTC
import torch
from pydub import AudioSegment

# Fungsi untuk membaca file audio
def read_audio_file(file_path):
    # Menggunakan pydub untuk membaca file audio
    audio = AudioSegment.from_file(file_path)
    # Mengubah frame rate audio ke 16kHz
    audio = audio.set_frame_rate(16000)
    # Mengonversi audio ke array NumPy
    samples = np.array(audio.get_array_of_samples())
    # Mengembalikan array NumPy dan frame rate
    sample_rate = audio.frame_rate
    return samples, sample_rate

# Fungsi untuk memproses audio
def process_audio(audio_path):
    # Inisialisasi model dan processor dari Hugging Face
    processor = AutoProcessor.from_pretrained("IbrahimSalah/Wav2vecLarge_quran_syllables_recognition")
    model = AutoModelForCTC.from_pretrained("IbrahimSalah/Wav2vecLarge_quran_syllables_recognition")

    # Membaca file audio
    speech, sample_rate = read_audio_file(audio_path)

    # Konversi array NumPy ke float32
    speech = speech.astype(np.float32)

    # Memproses audio
    inputs = processor(speech, sampling_rate=sample_rate, return_tensors="pt", padding=True) 
    with torch.no_grad():
        logits = model(inputs.input_values).logits # Logits adalah prediksi dari model 

    # Menghitung hasil prediksi
    predicted_ids = torch.argmax(logits, dim=-1) # Menggunakan argmax untuk mendapatkan indeks terbesar
    transcription = processor.batch_decode(predicted_ids)

    # Menghitung skor prediksi
    recognized_syllables = len(transcription[0].split())  # Menghitung jumlah kata yang terdeteksi
    max_possible_syllables = 100  # Maksimum jumlah kata yang mungkin terdeteksi
    score = (recognized_syllables / max_possible_syllables) * 100  # Menghitung skor

    # Mengembalikan skor dalam format JSON
    return json.dumps({"score": score})

if __name__ == "__main__": # Memeriksa apakah file ini dijalankan sebagai script utama
    audio_path = sys.argv[1] # Mendapatkan path file audio
    result = process_audio(audio_path) 
    print(result)