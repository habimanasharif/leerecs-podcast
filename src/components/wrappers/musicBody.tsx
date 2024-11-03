'use client'
import { useAppSelector } from '@/redux/hook';
import React, { ReactNode } from 'react';

const MusicBody = ({
    children,
  }: {
    children:ReactNode
  }) => {
    const {isMini}=useAppSelector(state=>state.uiData)
    return (
        <div id="scroller" className={` ${isMini?"col-md-11":"col-md-9"} contents `}>
            {children}
        </div>
    );
}

export default MusicBody;
