import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { Activity } from "react-feather";
import {
  Button,
} from "reactstrap";
// import { Edit, Video, Image, Activity } from "react-feather";
// import { ShoppingBag, MessageCircle, MinusCircle, Tag } from "react-feather";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardHeader,
//   CardBody,
//   Media,
// } from "reactstrap";

function TimelineItem (contribution) {
  const [showDetail, setshowDetail] = useState(false);

  // 콘스트로 선언할 때는 바로 변수를 못 받나요? 아 {} 없이 바로 보내줘도 되는거였습니다!
  // javascript 문자열 슬라이싱은 .slice를 씁니다.
  // 01월을 1월로 출력하기 가능?
  const contribDate = contribution.contribution.contributionDate.slice(5, 7);
  const contribDay = contribution.contribution.contributionDate.slice(8, 10);

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      animate={true}
      // date={contribution.contribution.contributionDate}
      // icon={<i 
      //   class="fas fa-heartbeat contribution-icon"></i>}
      icon={<Activity />}
    >
      <div className="timelinItem-grid">
        {/* <div className="timelineItem-title">
          { contribution.contribution.itemName }을 후원했어요!
        </div> */}
        <div className="timelineItem-title">
          {/* { contribution.contribution.item.store.storeName }에 방문했어요! */}
          { contribution.contribution.storeName }에 방문해서  { contribution.contribution.itemName }을 후원했어요!
        </div>
        <div className="timelineItem-time">
          { contribDate }월 { contribDay }일
        </div>
        <div className="timelineItem-btn">
          <Button 
              className="timelinItem-toggle" onClick = {() =>
                {setshowDetail(!showDetail);}
              }>
              {!showDetail? '메시지보기':'메시지닫기'} 
            </Button>
        </div>
        <div className="timelineItem-message">
          {showDetail && <div>{ contribution.contribution.contributionMessage }</div>}
          {showDetail && <div>{ contribution.contribution.contributionAnswer }</div>}
        </div>
        {/* <h4 className="vertical-timeline-element-subtitle">
          { contribution.contribution.store_id }
          <span>
            <div className="timelineItem-time">{contribution.contribution.contribution_date}</div>
          </span>
        </h4>
        <p>
          { contribution.contribution.item_id }을/를 후원했어요.
        </p>
        <span class="pull-right">
          <button 
            className="plus" onClick = {() =>
              {setshowDetail(!showDetail);}
            } class="btn btn-warning btn-sm">
            {!showDetail? '메시지보기':'메시지닫기'} 
          </button>
          {showDetail && <div>{ contribution.contribution.contribution_message }</div>}
        </span> */}
      </div>
    </VerticalTimelineElement>  );
}
// export default detailClick;
export default TimelineItem;