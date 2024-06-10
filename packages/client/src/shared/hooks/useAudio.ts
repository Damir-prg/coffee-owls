import { useState, useEffect, useRef } from 'react';

const loadSound = async (audioContext: AudioContext, url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch audio file: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    return await audioContext.decodeAudioData(arrayBuffer);
  } catch (e) {
    console.error('Error during decoding audio file', e);
  }
};

export const useAudio = (url: string) => {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }

    const fetchAudio = async () => {
      try {
        const buffer = await loadSound(audioContextRef.current as AudioContext, url);

        if (buffer) {
          setAudioBuffer(buffer);
        }
      } catch (e) {
        console.error('Error fetching audio file', e);
      }
    };

    fetchAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [url]);

  const playSound = () => {
    if (!audioBuffer && audioContextRef.current && audioContextRef.current.state === 'closed') {
      console.error('No audio buffer available to play or audio context is closed');
    }

    if (audioBuffer && audioContextRef.current && audioContextRef.current.state !== 'closed') {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.start(0);
    }
  };

  const play = () => {
    if (!audioBuffer && audioContextRef.current) {
      return console.error('Audio context or audio buffer is not available');
    }

    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().then(() => playSound());
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      playSound();
    } else {
      console.error('Audio context is closed');
    }
  };

  return play;
};
