import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountUp from "react-countup";

interface Props {
  icon: any;
  count: any;
  text: any;
  link: any;
  title:any;
}

export const Box = (props: Props) => {
  return (
    <a  href={props.link} target="__blank">
      <div className="box d-flex flex-column justify-content-start align-items-center">
        <div className="img-wrapper d-flex justify-content-center align-items-center">
        <FontAwesomeIcon icon={props.icon.split(" ")} className=" icon-size" style={{fontSize:"50px",color:"black"}} />
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column">
        <small className="views-txt">{props.text}</small>
          <span className="views">
            {props.count > 0 ? (
              <>
                <CountUp separator="," end={props.count} duration={6} />
                <span className="text-muted">+</span>
              </>
            ) : (
              <br />
            )}
          </span>
          <small className="views-txt">{props.title}</small>
          
        </div>
      </div></a>
    
  );
};
