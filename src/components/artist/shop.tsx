import { ALLALBUMBYUSER } from "@/app/api/graphql/queries";
import { useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import ProductElement from "../music/productElement";
import '@/sass/artist/shop.scss'
import Preloader from "../skeletons/preloader";
import { useAppDispatch } from "@/redux/hook";
import { setShopActivityData } from "@/redux/data/uiData";
import configuration from "@/config";
interface props {
  owner: boolean;
  userId: string;
  claim: string;
  shop_requests: string;
  username: string;
}

interface product {
  name: string;
  image: string;
  vendor: string;
  url: string;
 
}

const Shop: React.FC<props> = ({
  owner,
  userId,
  claim,
  shop_requests,
  username
}: props) => {

  const [products, setPoducts] = useState([]);
  const [countnumber, setcountnumber] = useState(3);
  const [loading,setLoading]=useState(true)
  const dispatch=useAppDispatch()
  const { data } = useQuery(ALLALBUMBYUSER, {
    variables: { userId },
  });
  const unPublishedAlbums = useMemo(() => {
    const existingProducts =
      products?.map((product: any) => product.name.toLowerCase()) || [];
    return data?.AllAlbumByUser?.filter(
      (item: any) => !existingProducts.includes(item.title.toLowerCase())
    );
  }, [data?.AllAlbumByUser, products]);
  useEffect(() => {
    const getProduct = async () => {
      const products = await fetch("/api/products");
      const data = await products.json();
      setPoducts(data.data.filter((product:product)=>product.vendor.toLowerCase()==username));
      setLoading(false)
    };
    getProduct();
  }, [username]);
  const preloader = () => {
    const i = Array.from({ length: countnumber }, (_, index) => index);
    return i.map((item, id) => {
      return <Preloader key={id} />;
    });
  };

  const handleClaim=(e:any)=>{
    e.preventDefault()
    dispatch(setShopActivityData({
        albumName:'',
        owner:username,
        url:`https://leerecs.com/a/${username.replaceAll(' ','-').toLowerCase()}`,
        message:'is requesting a shop on leerecs shop',
        action:'CLAIM',
        userId:userId
     }))

 }
 const handleRequest=(e:any)=>{
    e.preventDefault()
    dispatch(setShopActivityData({
        albumName:'',
        owner:username,
        url:`https://leerecs.com/a/${username.replaceAll(' ','-').toLowerCase()}`,
        message:'Listener is rquesting a shop on leerecs.',
        action:'REQUEST',
        userId:userId,
        requester:userId,
     }))
 }
 const handleActivityRequest=(e:any)=>{
    e.preventDefault()
    dispatch(setShopActivityData({
        albumName:'',
        owner:username,
        url:`https://leerecs.com/a/${username.replaceAll(' ','-').toLowerCase()}`,
        message:'Listener is rquesting a shop on leerecs.',
        action:'REQUEST-ACTIVITY',
        userId:userId,
        requester:userId,
     }))
 }



 
  return (<>
  {loading&&(
    <div id="Artist-new-playlist">
    <div className='row card-deck'>
                {preloader()}
            </div></div>)}
  {!loading&&(
    <div id="single-artist-albums mb-2 ">
    <div id="shop">
      {products.length === 0 &&(
        <>
        {owner && (
          <>
            {claim === "Y" && (
              <p>
                <h2>Start selling your music on Leerecs</h2>
                <p>
                  Add your existing albums or create a new one to put up for
                  sale on the Leerecs shop
                </p>
              </p>
            )}
            {claim === "P" && (
              <p>
                <p>
                  Your shop has already been requested, our team will get back
                  to you soon.
                </p>
              </p>
            )}
  
            {claim === "N" && (
              <>
                <p>
                  <h2>You can now sell your music on Leerecs</h2>
                  <p>
                    Request adding your shop onto your profile now to start
                    adding your albums on the Leerecs shop.
                  </p>
                </p>
                <div className="claim-shop-btn" onClick={handleClaim}>Request Shop</div>
              </>
            )}
          </>
        )}
  
        {!owner &&
          claim === "N" &&
          !shop_requests
            .split(",")
            .includes(userId.toString()) && (
            <>
              <p>
                <h2>If you want this artist to sell their music on Leerecs</h2>
                <p>
                  Request adding their shop onto their profile now to start
                  adding their albums on the Leerecs shop.
                </p>
              </p>
              <div className="claim-shop-btn" onClick={handleRequest}>Request Shop</div>
            </>
          )}
          </>
      )}
      

      {products && products.length === 0 && !owner && claim === "Y" && (
        <>
          <h2>Invite this Artist to sell their music on Leerecs</h2>
          <p>
            They can add their existing albums to start selling Cassettes, CDs
            and Digital on the Leerecs shop
          </p>
          <div className="claim-shop-btn" onClick={handleActivityRequest}>Request Activity</div>
        </>
      )}
    </div>

        <div className="row card-deck wrap">
          {products?.map((item: product, index: number) => (
            <ProductElement
              key={index}
              url={item.url}
              vendor={item.vendor}
              thumbnail={item.image}
              title={item.name}
              published={true}
            />
          ))}
         {console.log(unPublishedAlbums)}
          {owner &&
            unPublishedAlbums?.map((item:any, index: number) => (
              <ProductElement
                key={index}
                url={item.url}
                vendor={item.username}
                thumbnail={configuration.FILE_STORAGE_LINK+item.cover}
                title={item.title}
                published={false}
              />
            ))}
        </div>
        <div> </div>
  
  </div>
  )}
    
    </>
  );
};

export default Shop;
