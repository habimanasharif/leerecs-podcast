// @ts-nocheck
import React, { useEffect, createRef } from 'react';
import lottie from 'lottie-web';

interface props {
    url:String;
    width:String;
    height:String;
}

const LottieWrapper: React.FC<props> = (props) => {
    const animationContainer = createRef < HTMLDivElement > ();

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: props.url,
        });
        return () => anim.destroy(); // optional clean up for unmounting
    }, [animationContainer,props.url]);

    return (
        <div
            style={{ width: props.width, height: props.height }}
            ref={animationContainer}
        />
    );
};


export default LottieWrapper;