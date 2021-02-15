import React, { useState, useEffect } from "react";


function Userrank(){
    const [userRank, setUserRank] = useState([]);

    useEffect(()=>{
        // fetch("http://i4a102.p.ssafy.io:8080/app/main/userrankbowl")
        fetch(`${process.env.REACT_APP_API_URL}/main/userrankbowl`)
        .then((res) => res.json())
        .then((users) => {
            setUserRank(users);
        });
    }, [])

    return(
        <div className="userrank carouselItem">
            <br/><br/><br/>
            { userRank.map((user, index) => {
                if (index >= 3) {
                    return
                }
                return (
                    <div>
                        <h5 className="userrankrank">{index + 1}등 {user.userName}</h5>
                        <h5 className="userrankgood">총 {user.contributionCount}그릇 후원해준 {user.userName}님 멋쟁이~!~!</h5>
                        <br/>
                    </div>
                );
            })
            }
        </div>
    );
}

export default Userrank;