import React, { useEffect, useRef, useState } from 'react';
import Play from '../../../public/icons/Play';
import Backward from '../../../public/icons/Backward';
import Pause from '../../../public/icons/Pause';
import Forward from '../../../public/icons/Forward';
import WaveSurfer from "wavesurfer.js";
// import { v4 as uuidv4 } from "uuid";
import '@/sass/production/wave.scss'

const WaveFormPlayer:React.FC<any> = (props) => {
    const waveformRef = useRef<any>();
  const trackRef = useRef<any>();

  const [waveSurfer, setWaveSurfer] = useState<any>(null);
  const [playingAudio, setPlayingAudio] = useState(false);

  const playAudio = () => {
    if (!props.hideWave) waveSurfer?.play();
    else trackRef.current.play();
    setPlayingAudio(true);
  };

  const pauseAudio = () => {
    if (!props.hideWave) waveSurfer.pause();
    else trackRef.current.pause();
    setPlayingAudio(false);
  };

  const seekAudioTenSeconds = (ahead:any) => {
    if (ahead) trackRef.current.currentTime += 10;
    else trackRef.current.currentTime -= 10;
  };

  useEffect(() => {
    if (waveSurfer == null) {
      // First render
      const wavesurfer = props.waveStyles
        ? WaveSurfer.create({
            // ...props.waveStyles,
            container: waveformRef.current,
            backend: "MediaElement",
            waveColor: props.backColor,
            progressColor: props.color,
          })
        : WaveSurfer.create({
            container: waveformRef.current,
            backend: "MediaElement",
            waveColor: props.backColor,
            progressColor: props.color,
          });
      setWaveSurfer(wavesurfer);
      wavesurfer.load(trackRef.current);
    } else {
      // Song changed
      waveSurfer.load(trackRef.current);
      setPlayingAudio(false);
    }
  }, [props.audioUrl, props.backColor, props.color, props.waveStyles, waveSurfer]);

    return (
        <div>
        <div>
          <div>
            {!props.hideWave && <div ref={waveformRef}/>}
            <audio src={props.audioUrl} ref={trackRef} />
          </div>
          <div className="container" id="wave-style">
            <div className="all-btn">
              <div className="btn-1" onClick={() => seekAudioTenSeconds(false)}>
                <Backward />
              </div>

              {playingAudio ? (
                <div
                  className="btn-1"
                  onClick={() => (playingAudio ? pauseAudio() : playAudio())}
                >
                  <Pause />
                </div>
              ) : (
                <div
                  className="btn-1"
                  onClick={() => (playingAudio ? pauseAudio() : playAudio())}
                >
                  <Play />
                </div>
              )}
              <div className="btn-1" onClick={() => seekAudioTenSeconds(true)}>
                <Forward />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default WaveFormPlayer;
