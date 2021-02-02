import React, { useState, useEffect } from "react";

function Userrank(){
    const [userRank, setUserRank] = useState([]);

    useEffect(()=>{
        fetch("http://i4a102.p.ssafy.io:8080/app/main/userrankbowl")
        .then((res) => res.json())
        .then((users) => {
            setUserRank(users);
        });
    }, [])

    return(
        <div className="userrank carouselItem">
            <img src="https://pbs.twimg.com/profile_images/758509184052637696/i_DLbZ-r.jpg"></img>
            { userRank.map((user, index) => {
                if (index >= 3) {
                    return
                }
                return (
                    <div>
                        <h3><i className= "typcn typcn-thumbs-up"></i>{index + 1}등 {user.userName}</h3>
                        <h6>총 {user.contributionCount}284그릇 후원해준 {user.userName}님 멋쟁이~!~!</h6>
                        <br/>
                    </div>
                );
            })
            }
        </div>
    );
}

export default Userrank;