import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
// import happynew from "../../assets/images/happynew.png"


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
        <h3 className="usertotaltotal">지금까지 총 후원된 음식은 { userTotal } 그릇입니다.</h3>
        <br/>
        <h4 className="usertotaltotal">따뜻한 마음의 멋쟁이 여러분 감사합니다!</h4>
      </div>
    );
}

export default Usertotal;