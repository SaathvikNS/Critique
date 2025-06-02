import numpy as np
import librosa

def analyze_musical_elements(audio_path):
    y, sr = librosa.load(audio_path, sr=None)

    tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
    
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
    chroma_mean = chroma.mean(axis=1)
    key_index = chroma_mean.argmax()
    pitch_classes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    estimated_key = pitch_classes[key_index]

    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    pitches = pitches[magnitudes > np.median(magnitudes)] 
    valid_pitches = pitches[pitches > 0]
    pitch_mean = float(np.mean(valid_pitches)) if len(valid_pitches) > 0 else 0.0
    pitch_std = float(np.std(valid_pitches)) if len(valid_pitches) > 0 else 0.0

    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    autocorrelation = np.correlate(onset_env, onset_env, mode='full')
    rhythm_strength = float(np.max(autocorrelation) / np.sum(autocorrelation))

    return {
        "Tempo (BPM)": round(float(tempo), 2),
        "Estimated Key": estimated_key,
        "Pitch Mean (Hz)": round(float(pitch_mean), 2),
        "Pitch Std Dev": round(float(pitch_std), 2),
        "Rhythmic Strength": round(float(rhythm_strength), 4)
    }
