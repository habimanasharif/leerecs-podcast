import Link from "next/link";

export function ProductionMenuItems() {
  return (
    <div className="links d-flex">
      <a href="#landing-production">Welcome</a>
      <a href="#compare">Compare Results</a>
      <a href="#process">Work With Us</a>
      <Link href="/request">Request Review</Link>
      <a href="https://leerecs.com/" target="_blank" rel="noreferrer">
        Shop
      </a>
    </div>
  );
}

export function MainMenuItems(props:any) {
  return (
    <div className="links d-flex">
      {props.info.map((item:any,index:number)=>{
       if(item.link==="/music"){
        return <Link key={index} href={item.link}>Music</Link>
       }
       if(item.name==="Shop"){
        return <a key={index} href={item.link} target="_blank" rel="noreferrer">
        Shop
      </a>
       }
       return <a key={index} href={item.link}>{item.name}</a>
      })}
      
    </div>
  );
}

export function SharedItems() {
  return (<div className="links d-flex" style={{marginRight:"230px", color:"black"}}>
  
  </div>)
}