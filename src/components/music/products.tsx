import React, { useEffect, useState } from 'react';
import Preloader from '../skeletons/preloader';
import ShowMoreComponent from './showMoreComponent';
import Previous from '../../../public/icons/previous';
import ProductElement from './productElement';
import Next from '../../../public/icons/next';
interface product{
    name:string;
    image:string;
    vendor:string;
    url:string;
}

const Products = () => {
    const [countnumber, setcountnumber] = useState(5)
    const [next5,setNext5]=useState(0)
    const [products,setPoducts]=useState([])
    useEffect(()=>{
  
        const getProduct=async ()=>{
          const products =await fetch('/api/products')
          const data = await products.json();
          setPoducts(data.data)
          }
          getProduct()
            
          },[])
    const preloader = () => {
        const i =  Array.from({ length: countnumber }, (_, index) => index);
        return i.map(( item,id) => {
          return <Preloader  key={id}/>;
        });
      };
    return (
        <div id="new-music">
            <div className="d-flex justify-content-between">
            <h3>Physical Media</h3>
              <div>
                <ShowMoreComponent
                  title="Show all products"
                  link="/music/allmusic"
                />
              </div>
              </div>

              {!products && (
            <div className='row card-deck'>
              {preloader()}
            </div>
          )}

         <div className="slider">
         {products && next5 < 0 && (
                <div
                  className="previous-5 slider-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    if (next5 < 0) {
                      setNext5(next5 + 1015);
                      
                    }
                  }}
                >
                  <Previous />
                </div>
              )}
              <div
                className='row card-deck'
                style={{ transform: `translate3d(${next5}px,0px,0px)` }}
              >
                {products &&products.map(
                    (item:product,index:number)=>(
                        <ProductElement 
                        key={index} 
                        url={item.url}
                        vendor={item.vendor}
                        thumbnail={item.image}
                        title={item.name}

                        />
                    ))}


              </div>


             {products && next5 >
                  -(products.length / countnumber - 1) *
                    200 *
                    countnumber && (
                  <div
                    className="next-5 slider-icon"
                    onClick={(e) => {
                      e.preventDefault();
                      if (next5 > -(products.length / countnumber -1) *1000 * countnumber) {
                        setNext5(next5 - 1015);
                       
                      }
                    }}
                  >
                    <Next />
                  </div>
                )}
         </div>

          
        </div>
    );
}

export default Products;
