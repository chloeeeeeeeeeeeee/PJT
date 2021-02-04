import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";


function Usertotal() {
    const [userTotal, setUserTotal] = useState(0);
  
    useEffect(()=>{
        fetch("http://i4a102.p.ssafy.io:8080/app/main/usertotal")
        .then((res) => res.json())
        .then((total) => {
          setUserTotal(total);
        });
    }, [])
  
    return(
      <div className="usertotal carouselItem">
        <br/>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJk7W7YhTGPi8HzgujlWAnUFGWSJzegRJtHw&usqp=CAU"/>
        <h1>
        <i className="icofont icofont-chef"></i>
        <i className="icofont icofont-chicken"></i>
        <i className="icofont icofont-noodles"></i>
        <i className="icofont icofont-pizza-slice"></i>
        <i className="icofont icofont-egg-poached"></i>
        </h1>
        <h2>지금까지 총 후원금은 { userTotal } 입니다!</h2>
        <h4>서비스를 이용해준 멋쟁이들 감사합니다~!</h4>
      </div>
    );
}

export default Usertotal;