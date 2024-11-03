'use client'
import { USERAUTH } from '@/app/api/graphql/queries';
import { useQuery } from '@apollo/client';
import React, { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '@/redux/hook';
import { setUserAuth } from '@/redux/data/userAuth';

const UserAuth = ({
    children,
  }: {
    children:ReactNode
  }) => {
    const userId= typeof localStorage !== 'undefined'? localStorage.getItem('userId') as string:"0";
    const dispatch= useAppDispatch()
    const {  data,error} = useQuery(USERAUTH,{variables:{userId:parseInt(userId)||null},fetchPolicy: 'cache-first'})
    useEffect(()=>{
        if(data){
     dispatch(setUserAuth(data.UserAuth))
        }
    },[data, dispatch])
    return (
        <>
           {children} 
        </>
    );
}

export default UserAuth;
