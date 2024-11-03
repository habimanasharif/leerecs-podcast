import Image from 'next/image';
import { useState } from 'react';
interface props {
    src:string;
    fallbackSrc:string;
    alt:string;
    className?:string
}

const CustomImage = ({ src, fallbackSrc, alt,className,...props}:props) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={500}
      height={500}
      className={className}
      {...props}
      style={{
        width: '100%',
        height: '100%',
      }}
      onError={handleError}
    />
  );
};

export default CustomImage;
