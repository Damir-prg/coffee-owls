import { useState, useEffect, useRef } from 'react';

const loadSound = async (audioContext, url) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer);
};

export const useAudio = url => {
  const [audioBuffer, setAudioBuffer] = useState(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const fetchAudio = async () => {
      const buffer = await loadSound(audioContextRef.current, url);
      setAudioBuffer(buffer);
    };

    fetchAudio();
  }, [url]);

  const play = () => {
    if (audioBuffer && audioContextRef.current) {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume().then(() => {
          const source = audioContextRef.current.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContextRef.current.destination);
          source.start(0);
        });
      } else {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        source.start(0);
      }
    }
  };

  return play;
};
