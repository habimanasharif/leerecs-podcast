'use client'
import React from 'react';
import Link from 'next/link'
import LottieWrapper from '@/components/wrappers/lottieWrapper'
import '@/sass/error.scss'
export default function NotFound() {
  return (
    <div id="empty-case" className='container'>
        <div className='content'>
         <h1>404</h1>
         <h1>You Hit a Broken String</h1>
         <h4> <Link href="/">Go home</Link>  and keep practicing</h4>
        <LottieWrapper url="https://assets9.lottiefiles.com/packages/lf20_GmXdtd.json" width="calc(100% -  20px)" height="30vh" />
        </div>
        </div>
         
  )
}