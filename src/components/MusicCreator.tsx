import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Volume2, Trash2, Download, Plus, X, Music, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

interface Track {
  id: number;
  name: string;
  sound: string;
  color: string;
  pattern: boolean[];
  volume: number;
}

// Advanced sound synthesis functions
class SoundEngine {
  private ctx: AudioContext;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
  }

  // Generate white noise
  private createNoiseBuffer(duration: number): AudioBuffer {
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // Pralka - deep washing machine rumble
  playWashingMachine(volume: number) {
    const now = this.ctx.currentTime;
    
    // Low frequency rumble
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    osc1.type = 'sine';
    osc1.frequency.value = 55; // Low rumble
    osc2.type = 'sine';
    osc2.frequency.value = 60; // Slight detune for richness
    
    filter.type = 'lowpass';
    filter.frequency.value = 200;
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    // Envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.3);
    osc2.stop(now + 0.3);
  }

  // Mikrofalówka - electronic beep
  playMicrowave(volume: number) {
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.value = 880; // High beep
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    // Short beep envelope
    gain.gain.setValueAtTime(volume * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    
    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Lodówka - refrigerator hum
  playRefrigerator(volume: number) {
    const now = this.ctx.currentTime;
    
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    osc1.type = 'sawtooth';
    osc1.frequency.value = 110;
    osc2.type = 'sine';
    osc2.frequency.value = 50; // Sub bass
    
    filter.type = 'lowpass';
    filter.frequency.value = 300;
    filter.Q.value = 5;
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume * 0.8, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.4);
    osc2.stop(now + 0.4);
  }

  // Dzwonek - doorbell chime
  playDoorbell(volume: number) {
    const now = this.ctx.currentTime;
    
    // Two-tone doorbell
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.value = 659; // E5
    osc2.type = 'sine';
    osc2.frequency.value = 523; // C5
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);
    
    // First tone
    gain.gain.setValueAtTime(volume * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    osc1.start(now);
    osc1.stop(now + 0.15);
    
    // Second tone (delayed)
    osc2.start(now + 0.05);
    osc2.stop(now + 0.2);
  }

  // Ekspres do kawy - coffee machine hiss/steam
  playCoffeeMachine(volume: number) {
    const now = this.ctx.currentTime;
    
    // Noise for steam/hiss
    const bufferSource = this.ctx.createBufferSource();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    
    bufferSource.buffer = this.createNoiseBuffer(0.15);
    
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    filter.Q.value = 1;
    
    bufferSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    // Envelope for hissing sound
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume * 0.4, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    bufferSource.start(now);
    bufferSource.stop(now + 0.15);
  }

  // Zmywarka - dishwasher splash
  playDishwasher(volume: number) {
    const now = this.ctx.currentTime;
    
    // Water splash sound using filtered noise
    const bufferSource = this.ctx.createBufferSource();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    
    bufferSource.buffer = this.createNoiseBuffer(0.12);
    
    filter.type = 'lowpass';
    filter.frequency.value = 1500;
    filter.Q.value = 2;
    
    bufferSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    // Sharp attack, quick decay
    gain.gain.setValueAtTime(volume * 0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    
    bufferSource.start(now);
    bufferSource.stop(now + 0.12);
  }

  // Odkurzacz - vacuum cleaner drone
  playVacuumCleaner(volume: number) {
    const now = this.ctx.currentTime;
    
    // Buzzing/droning sound
    const osc = this.ctx.createOscillator();
    const noise = this.ctx.createBufferSource();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.value = 130;
    
    noise.buffer = this.createNoiseBuffer(0.2);
    
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 3;
    
    osc.connect(gain);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume * 0.5, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    osc.start(now);
    noise.start(now);
    osc.stop(now + 0.2);
    noise.stop(now + 0.2);
  }

  // Czajnik - kettle whistle
  playKettle(volume: number) {
    const now = this.ctx.currentTime;
    
    // Whistling sound
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(2500, now);
    osc1.frequency.linearRampToValueAtTime(3000, now + 0.15); // Rising whistle
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2550, now);
    osc2.frequency.linearRampToValueAtTime(3050, now + 0.15);
    
    filter.type = 'bandpass';
    filter.frequency.value = 2800;
    filter.Q.value = 10;
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume * 0.3, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.15);
    osc2.stop(now + 0.15);
  }
}

// Available sound options for each track
const soundOptions = [
  { value: 'kick', label: 'Pralka (kick)' },
  { value: 'beep', label: 'Mikrofalówka (beep)' },
  { value: 'bass', label: 'Lodówka (bass)' },
  { value: 'hihat', label: 'Dzwonek (hi-hat)' },
  { value: 'snare', label: 'Ekspres (snare)' },
  { value: 'clap', label: 'Zmywarka (clap)' },
  { value: 'tom', label: 'Odkurzacz (tom)' },
  { value: 'crash', label: 'Czajnik (crash)' },
];

export function MusicCreator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [masterVolume, setMasterVolume] = useState(0.7);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundEngineRef = useRef<SoundEngine | null>(null);

  const [tracks, setTracks] = useState<Track[]>([
    {
      id: 1,
      name: 'Pralka (kick)',
      sound: 'kick',
      color: 'bg-red-600',
      pattern: Array(16).fill(false),
      volume: 0.7,
    },
    {
      id: 2,
      name: 'Mikrofalówka (beep)',
      sound: 'beep',
      color: 'bg-gray-600',
      pattern: Array(16).fill(false),
      volume: 0.5,
    },
    {
      id: 3,
      name: 'Lodówka (bass)',
      sound: 'bass',
      color: 'bg-red-800',
      pattern: Array(16).fill(false),
      volume: 0.6,
    },
    {
      id: 4,
      name: 'Dzwonek (hi-hat)',
      sound: 'hihat',
      color: 'bg-gray-400',
      pattern: Array(16).fill(false),
      volume: 0.4,
    },
  ]);
  const [nextTrackId, setNextTrackId] = useState(5);
  
  // Ref to keep tracks up-to-date in interval callback
  const tracksRef = useRef(tracks);
  const masterVolumeRef = useRef(masterVolume);
  const bpmRef = useRef(bpm);

  // Update refs when state changes
  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);

  useEffect(() => {
    masterVolumeRef.current = masterVolume;
  }, [masterVolume]);

  useEffect(() => {
    bpmRef.current = bpm;
    
    // Restart interval if playing to apply new BPM
    if (isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
      const beatDuration = (60 / bpm) * 1000 / 4; // 16th notes
      
      intervalRef.current = setInterval(() => {
        setCurrentBeat((prev) => {
          const nextBeat = (prev + 1) % 16;
          
          // Play sounds for active patterns using ref
          tracksRef.current.forEach((track) => {
            if (track.pattern[nextBeat]) {
              playSound(track.sound, track.volume);
            }
          });
          
          return nextBeat;
        });
      }, beatDuration);
    }
  }, [bpm]);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    soundEngineRef.current = new SoundEngine(audioContextRef.current);
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const getSoundConfig = (sound: string) => {
    return soundOptions.find(s => s.value === sound) || soundOptions[0];
  };

  const playSound = (sound: string, volume: number) => {
    if (!soundEngineRef.current || !audioContextRef.current) return;

    // Resume audio context if suspended (browser autoplay policy)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const engine = soundEngineRef.current;
    const finalVolume = volume * masterVolumeRef.current;

    switch (sound) {
      case 'kick':
        engine.playWashingMachine(finalVolume);
        break;
      case 'beep':
        engine.playMicrowave(finalVolume);
        break;
      case 'bass':
        engine.playRefrigerator(finalVolume);
        break;
      case 'hihat':
        engine.playDoorbell(finalVolume);
        break;
      case 'snare':
        engine.playCoffeeMachine(finalVolume);
        break;
      case 'clap':
        engine.playDishwasher(finalVolume);
        break;
      case 'tom':
        engine.playVacuumCleaner(finalVolume);
        break;
      case 'crash':
        engine.playKettle(finalVolume);
        break;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Resume audio context on user interaction
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
      
      setIsPlaying(true);
      const beatDuration = (60 / bpm) * 1000 / 4; // 16th notes
      
      intervalRef.current = setInterval(() => {
        setCurrentBeat((prev) => {
          const nextBeat = (prev + 1) % 16;
          
          // Play sounds for active patterns using ref
          tracksRef.current.forEach((track) => {
            if (track.pattern[nextBeat]) {
              playSound(track.sound, track.volume);
            }
          });
          
          return nextBeat;
        });
      }, beatDuration);
    }
  };

  const stopSequence = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    setCurrentBeat(0);
  };

  const toggleStep = (trackId: number, stepIndex: number) => {
    setTracks((prevTracks) =>
      prevTracks.map((track) =>
        track.id === trackId
          ? {
              ...track,
              pattern: track.pattern.map((val, idx) =>
                idx === stepIndex ? !val : val
              ),
            }
          : track
      )
    );
  };

  const updateVolume = (trackId: number, volume: number) => {
    setTracks((prevTracks) =>
      prevTracks.map((track) =>
        track.id === trackId ? { ...track, volume: volume } : track
      )
    );
  };

  const clearTrack = (trackId: number) => {
    setTracks((prevTracks) =>
      prevTracks.map((track) =>
        track.id === trackId
          ? { ...track, pattern: Array(16).fill(false) }
          : track
      )
    );
  };

  const changeTrackSound = (trackId: number, newSound: string) => {
    const soundConfig = getSoundConfig(newSound);
    setTracks((prevTracks) =>
      prevTracks.map((track) =>
        track.id === trackId
          ? { ...track, sound: newSound, name: soundConfig.label }
          : track
      )
    );
  };

  const exportPattern = () => {
    const data = {
      bpm,
      masterVolume,
      tracks: tracks.map(track => ({
        name: track.name,
        sound: track.sound,
        pattern: track.pattern,
        volume: track.volume,
      })),
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fl-home-pattern-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Ścieżka została wyeksportowana!');
  };

  const colors = [
    'bg-red-600',
    'bg-gray-600',
    'bg-red-800',
    'bg-gray-400',
    'bg-red-500',
    'bg-gray-500',
    'bg-red-700',
    'bg-gray-700',
  ];

  const addTrack = () => {
    const newTrack: Track = {
      id: nextTrackId,
      name: soundOptions[0].label,
      sound: soundOptions[0].value,
      color: colors[tracks.length % colors.length],
      pattern: Array(16).fill(false),
      volume: 0.5,
    };
    setTracks([...tracks, newTrack]);
    setNextTrackId(nextTrackId + 1);
    toast.success('Dodano nową ścieżkę!');
  };

  const removeTrack = (trackId: number) => {
    if (tracks.length <= 1) {
      toast.error('Musi pozostać przynajmniej jedna ścieżka!');
      return;
    }
    setTracks(tracks.filter(track => track.id !== trackId));
    toast.success('Usunięto ścieżkę!');
  };

  const resetSequencer = () => {
    // Stop playback if playing
    if (isPlaying) {
      stopSequence();
    }
    
    // Clear all patterns
    setTracks((prevTracks) =>
      prevTracks.map((track) => ({
        ...track,
        pattern: Array(16).fill(false),
      }))
    );
    
    toast.success('Sequencer został zresetowany!');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 dark:text-white mb-4">Kreator muzyki domowej</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Kliknij pola, aby stworzyć rytm. Każdy wiersz reprezentuje dźwięk
            różnych urządzeń domowych.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <Button
                onClick={togglePlay}
                className={`${
                  isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                <span className="ml-2">{isPlaying ? 'Pauza' : 'Start'}</span>
              </Button>
              <Button
                onClick={stopSequence}
                variant="outline"
                className="border-gray-300 dark:border-gray-600 dark:text-gray-300"
              >
                <Square size={20} />
                <span className="ml-2">Stop</span>
              </Button>
              <Button
                onClick={exportPattern}
                variant="outline"
                className="border-gray-300 dark:border-gray-600 dark:text-gray-300"
              >
                <Download size={20} />
                <span className="ml-2">Eksport</span>
              </Button>
            </div>
            <div className="flex items-center gap-3 flex-1 min-w-[200px]">
              <span className="text-gray-600 dark:text-gray-400">BPM:</span>
              <Slider
                value={[bpm]}
                onValueChange={(value) => setBpm(value[0])}
                min={60}
                max={180}
                step={1}
                className="flex-1 max-w-xs [&_[data-slot=slider-range]]:dark:bg-red-600 [&_[data-slot=slider-thumb]]:dark:border-red-600"
              />
              <span className="text-gray-900 dark:text-white min-w-[3ch]">{bpm}</span>
            </div>
            <div className="flex items-center gap-3 min-w-[200px]">
              <Volume2 size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">Master:</span>
              <Slider
                value={[masterVolume]}
                onValueChange={(value) => setMasterVolume(value[0])}
                min={0}
                max={1}
                step={0.1}
                className="flex-1 max-w-xs [&_[data-slot=slider-range]]:dark:bg-red-600 [&_[data-slot=slider-thumb]]:dark:border-red-600"
              />
              <span className="text-gray-900 dark:text-white min-w-[3ch]">{Math.round(masterVolume * 100)}%</span>
            </div>
          </div>

          {/* Sequencer */}
          <div className="space-y-4 overflow-x-auto">
            {tracks.map((track) => (
              <div key={track.id} className="flex items-center gap-4 min-w-max">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => playSound(track.sound, track.volume)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-red-600 p-2"
                    title="Podgląd dźwięku"
                  >
                    <Music size={16} />
                  </Button>
                  <div className="w-44">
                    <Select
                      value={track.sound}
                      onValueChange={(value) => changeTrackSound(track.id, value)}
                    >
                      <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {soundOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-1 flex-1">
                  {track.pattern.map((active, index) => (
                    <button
                      key={index}
                      onClick={() => toggleStep(track.id, index)}
                      className={`
                        w-8 h-8 rounded transition-all
                        ${active ? track.color : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}
                        ${currentBeat === index ? 'ring-2 ring-red-600' : ''}
                      `}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 w-32">
                  <Volume2 size={16} className="text-gray-400" />
                  <Slider
                    value={[track.volume]}
                    onValueChange={(value) => updateVolume(track.id, value[0])}
                    min={0}
                    max={1}
                    step={0.1}
                    className="flex-1 [&_[data-slot=slider-range]]:dark:bg-red-600 [&_[data-slot=slider-thumb]]:dark:border-red-600"
                  />
                </div>
                <div className="flex gap-1">
                  <Button
                    onClick={() => clearTrack(track.id)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-yellow-600"
                    title="Wyczyść wzór"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <Button
                    onClick={() => removeTrack(track.id)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-red-600"
                    title="Usuń ścieżkę"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Track Button */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-3">
              <Button
                onClick={addTrack}
                variant="outline"
                className="flex-1 border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-600"
              >
                <Plus size={20} />
                <span className="ml-2">Dodaj nową ścieżkę dźwiękową</span>
              </Button>
              <Button
                onClick={resetSequencer}
                variant="outline"
                className="border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-600"
                title="Wyczyść wszystkie wzory"
              >
                <RotateCcw size={20} />
                <span className="ml-2">Reset</span>
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600">
            <p className="text-gray-600 dark:text-gray-400">
              💡 <strong>Wskazówka:</strong> Kliknij ikonę 🎵 aby odsłuchać dźwięk. Kliknij kwadraciki, aby aktywować dźwięki w danym momencie. Wybierz różne dźwięki z listy rozwijanej. Użyj przycisku Reset aby wyczyścić wszystkie wzory!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}