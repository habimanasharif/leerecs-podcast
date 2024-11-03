/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { BASE, Routes, useFetcher  } from '@/lib/useFetcher';
// import BoxLoading  from "react-loading";
import '@/sass/production/cta.scss'

const Cta = () => {
    const { data, loading }=useFetcher(Routes.cta)
    if(loading){
        return (<div className="testimonial-preloader" style={{
            width: "100%",
            height: "50vh",
            display: "grid",
            placeItems: "center"
        }}>
            {/* <BoxLoading color="#F8107D" /> */}
        </div>)
    }
    if(data){
        const attributes=data.data.attributes
        return (
            <div id="cta-production" style={{
                backgroundImage: `url("${BASE}${attributes.background_img.data.attributes.url}"),
        linear-gradient(180deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.16) 100%)`
            }}>
                <div className="cta-title">{attributes.title}</div>
                <div className="cta-text">
                    {attributes.description}
                </div>
                <div className="btn btn-cta" onClick={() => {
                    window.location.href = attributes.request_link
                }}>
                    <div className="d-flex">
                        <img src={`${BASE}${attributes.icon.data.attributes.url}`} alt="cta-arrow" />
                        <div className="text-cta">{attributes.icon_text}</div>
                    </div>
                </div>
            </div>
        )
    }
    return <></>
}

export default Cta;
