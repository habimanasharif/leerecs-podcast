/* eslint-disable @next/next/no-img-element */
import React,{useState} from 'react';
import WaveFormPlayer from './waveFormPlayer';
import playIcon from '../../../public/icons/play_icon.svg';
import pause from '../../../public/icons/pause.svg';
import '@/sass/production/Comparison.scss'
import configuration from '@/config';

const Comparision:React.FC<any> = ({data}:any) => {
    const [playFirst, setplayFirst] = useState(false);
    const [playSecond, setplaySecond] = useState(false);
    
    return (
        <>
        <div className="compare-input">
          <h1>Input</h1>
          <div className="input-content">
            <div
              className="input-image rounded-circle"
              style={{ backgroundImage: `url("${configuration.host}${data[0].imageUrl}")` }}
            >
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" />
              </svg>
              <img
                src={
                  playFirst
                   ? '/icons/pause.svg'
                    : '/icons/play_icon.svg'
                }
                alt="play song"
                onClick={() => {
                  setplayFirst(!playFirst);
                }}
              />
              
            </div>

            <div className="input-text">
              <h2>{data[0].title}</h2>
              <h5>{data[0].artist}</h5>
              <p>{data[0].subTitle}</p>
            </div>

            <div className="input-wave">
              <WaveFormPlayer
                audioUrl={data[0].musicUrl}
                hideImage={false}
                hideWave={false}
                backColor={"#B49BB1"}
                color={"#F8107D"}
                play={playFirst}
              />
            </div>
          </div>
        </div>

        <div className="compare-output">
          <h1>Output</h1>
          <div className="output-content">
            <div
              className="output-image rounded-circle"
              style={{ backgroundImage: `url("https://leerecs.com${data[1].imageUrl}")` }}
            >
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" />
              </svg>
              <img
                src={
                  playSecond
                    ? '/icons/pause.svg'
                    : '/icons/play_icon.svg'
                }
                alt="play song"
                onClick={() => {
                  setplaySecond(!playSecond);
                }}
              />
              {/* <img src={image} className="rounded-circle" alt="song input" /> */}
            </div>

            <div className="output-text">
              <h2>{data[1].title}</h2>
              <h5>{data[1].artist}</h5>
              <p>{data[1].subTitle}</p>
            </div>

            <div className="output-wave">
              <WaveFormPlayer
                audioUrl={data[1].musicUrl}
                hideImage={false}
                hideWave={false}
                backColor={"#B49BB1"}
                color={"#106DF8"}
                play={playSecond}
              />
            </div>
          </div>
        </div>
      </>
    );
}

export default Comparision;


