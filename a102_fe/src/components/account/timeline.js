import React, { Fragment, useState, useEffect } from "react";
import {
  VerticalTimeline,
  // VerticalTimelineElement,
} from "react-vertical-timeline-component";
// import { Edit, Video, Image, Activity } from "react-feather";
import TimelineItem from "./timelineItem";
// import Contribution from "../support/contribution";
// import { Col, Container, Row } from "reactstrap";

function Timeline() {
  const [contributions, setContributions] = useState([]);

  // 유즈이펙트를 카와이이이 하게 써볼게요! ^0^
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/account/usercontribution`, {
      // fetch의 기본 요청은 GET이므로 따로 method를 정의하지 않습니다.
      // header: localStorage.getItem('access-token')
      headers: {
        // 키값을 "token"으로 설정할 것인가? 확인해보고 authentication.js 의 fetch도 함께 수정하자
        // 왜 어떤 사람들은 이를 'access_token'으로 쓰지? 로컬 스토리지는 '-'를 쓰는데.
        // 해당 fetch 함수 내용 확인한 다음 memberInfo, memberQnA 병행하여 확인해야하는걸 잊지말자!
        token: localStorage.getItem('access-token')
      }
    })
    .then(res => res.json())
    .then(res => {
      setContributions(res);
      // console.log("지금 받아올 내용은:", res)
      // console.log("실제로 받은 내용은:", contributions)
      // console.log("어떻게 파싱할까요?:", contributions.contributions.item.itemName)
    })
  }, [])

  // // 임시로 받아온 데이터가 아주 멋지군요
  // const contributions = [
  //   {
  //     "contributionId": 9,
  //     "item": {
  //       "store": {
  //         "storeId": 1,
  //         "storeName": "국수나무창신점",
  //         "storeLocation": "서울특별시 종로구 창신동 23-76 104호",
  //         "storeCategory": "한식",
  //         "storeRegDate": "2021-01-20T23:35:30.000+00:00",
  //         "storePhone": "027479340",
  //         "storeKiosk": 1,
  //         "location": {
  //           "locationId": 1,
  //           "locationSi": "서울특별시",
  //           "locationGu": "종로구"
  //         }
  //       },
  //       "itemId": 18,
  //       "itemName": "로제돈까스",
  //       "itemPrice": 9400,
  //       "itemAvailable": 3,
  //       "itemTotal": 0,
  //       "itemImgUrl": "menus/1/로제돈까스.jpg"
  //     },
  //     "user": {
  //       "userSeq": 1,
  //       "userId": "1",
  //       "userName": "qwe",
  //       "userPwd": "$2a$10$hCgXpJetAx4nf3S.kugEm.MRAtbxk5nEDKyaYfLGkRBNMuO4yEa3e",
  //       "userEmail": "test@test.com",
  //       "userPhone": "010-0000-0000",
  //       "userDate": "2021-01-26T13:17:27",
  //       "userTotalContributionAmount": 20,
  //       "store": null
  //     },
  //     "contributionMessage": "로!제!짱!",
  //     "contributionAnswer": null,
  //     "contributionDate": "2021-01-26T06:58:59.000+00:00",
  //     "contributionDateUsed": null,
  //     "contributionUse": 0
  //   },
  // ];
  
  if (contributions.length !== 0) {
    // console.log("이게 0일 경우인데요:", contributions)
    return (
      <Fragment>
        <VerticalTimeline
          layout={"1-colum-right"}
        >
          {contributions.map((contributionItem, index) => 
            <TimelineItem
              contribution = {contributionItem}
            />
          )}
        </VerticalTimeline>
      </Fragment>
    );
  } else {
    return (
      <div>
        당신의 후원을 기다리고 있어요 (하트)
      </div>
    );
  }
};

export default Timeline;
