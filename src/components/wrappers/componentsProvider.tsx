'use client'
import { useAppSelector } from '@/redux/hook';
import React from 'react';
import MusicPlayer from '../topComponent/musicPlayer';

const ComponentsProvider = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const {musicData}=useAppSelector((state)=>state.musicPlayer)
    return (
        <>
        { musicData.length!==0&&(<MusicPlayer/>)}
        {children}
        </>
    );
}

export default ComponentsProvider;
