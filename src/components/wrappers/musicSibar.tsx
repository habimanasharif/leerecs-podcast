'use client'
import { useAppSelector } from '@/redux/hook';
import React, { ReactNode } from 'react';

const MusicSibar = ({
    children,
  }: {
    children:ReactNode
  }) => {
    const {isMini}=useAppSelector(state=>state.uiData)
    return (
        <div className={`${isMini?"col-md-1":"col-md-3"}  px-0`}>
            {children}
        </div>
    );
}

export default MusicSibar;
