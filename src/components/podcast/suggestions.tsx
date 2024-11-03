import React from 'react';
import SuggetionCard from './suggetionCard';
import '@/sass/podcast/suggestion.scss'

interface feed{
    imageUrl: string,
    musicUrl: string,
    artist: string,
    musicName: string,
    description: string,
}
interface Props{
   feedData:feed[]
}
const Suggestions:React.FC<Props> = ({feedData}:Props) => {
    return (
        <div>
      <div id="podcaststyle" style={{minHeight:"100vh", paddingLeft:"15px"}}>
        <div className="suggestions-head mt-5">
          <h6 className="suggestions-title">Recent Podcast</h6>
          {/* <SuggestionToggle /> */}
        </div>
        <div className="suggestion-container">
          {Array.isArray(feedData)&&feedData.map((item,index)=>(
          <SuggetionCard
          key={index}
          imageUrl={item.imageUrl}
          musicUrl={item.musicUrl}
          artist={item.artist}
          musicName={item.musicName}
          />
          ))}
            
        </div>
      </div>
    </div>
    );
}

export default Suggestions;
