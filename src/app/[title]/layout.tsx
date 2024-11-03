import configuration from '@/config';
import { Metadata, ResolvingMetadata } from 'next';
import React from 'react';
interface feed{
    imageUrl: string,
    musicUrl: string,
    artist: string,
    musicName: string,
    description: string,
}

const filterTitle = (feedData:feed[],title?:string,) => {
      
    if(title){
    const id =decodeURIComponent(title)
        const element = feedData.filter(feed => feed.musicName===id)
        if (element){
          return element[0]
        }
        else return feedData[0]
      }
      else {
        return feedData[0]
      }

        };
const Layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    return (
        <div>
        {children}
        </div>
    );
}

export default Layout;
