// import React, { useState, useEffect } from "react";
// import { Container, Row, Col } from "reactstrap";
// import SupportMap from "../../components/support/supportMap";
// import SupportMapItem from "../../components/support/supportMapItem";

// function Support() {
//   // 한식, 양식, 제과점/카페, 기타, 중식, 마트/편의점, 패스트푸드, 일식, 치킨/피자
//   const categoryList = [
//     "한식",
//     "양식",
//     "중식",
//     "일식",
//     "패스트푸드",
//     "마트/편의점",
//     "제과점/카페",
//     "치킨/피자",
//     "기타",
//   ];

//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [storeInfoList, setStoreInfoList] = useState([]);
//   let [selectedCategory, setSelectedCategory] = useState("");
//   // 멀티캠퍼스가 기본 위치
//   let [currentLocation, setCurrentLocation] = useState("서울 강남구 테헤란로 212")

//   let [start_lat, setLatitude] = useState(37.501451477019536);
//   let [start_long, setLongitude] = useState(127.03967042677424);

//   // 현재 위치 정보 받아오기
//   navigator.geolocation.getCurrentPosition(function (position, error) {
//     // 에러 없음
//     if (error === undefined) {
//       console.log(position);
//       setLatitude(position.coords.latitude)
//       setLongitude(position.coords.longitude)
//     }
//   });

//   let storeListComponents = [];

//   // 클릭하면 이동하는 컴포넌트 => 지도에 큰 영향 없음
//   function changeComponents() {
//     storeListComponents = storeInfoList
//       .map((storeInfo, index) => {
//         if (storeInfo.storeCategory === selectedCategory) {
//           return <SupportMapItem storeInfo={storeInfo} key={index} />;
//         }
//       })
//       .filter((element) => {
//         return element !== undefined;
//       });
//     if (storeListComponents.length === 0) {
//       storeListComponents = (
//         <Col className="nothingToShow">주변 가게가 없습니다...</Col>
//       );
//     }
//   }

//   console.log(`http://i4a102.p.ssafy.io:8080/app/main/mapview/storelist/${encodeURIComponent(currentLocation)}`)

//   useEffect(() => {
//     // REVERSE GEO 해야됨

//     fetch(
//         `http://i4a102.p.ssafy.io:8080/app/main/mapview/storelist/${encodeURIComponent(currentLocation)}`
//     )
//       .then((res) => res.json())
//       .then(
//         (result) => {
//             console.log("RESULT")
//             console.log(result)
//           setIsLoaded(true);
//           setStoreInfoList(result);
//           setSelectedCategory("한식");
//           document
//             .getElementsByClassName("selectedCategoryListItem")[0]
//             .classList.remove("selectedCategoryListItem");
//           document
//             .getElementsByClassName("categoryListItem")[0]
//             .classList.add("selectedCategoryListItem");
//         },
//         (error) => {
//           console.log(error);
//           setIsLoaded(true);
//           setError(error);
//         }
//       );
//   }, []);

//   if (isLoaded) {
//     changeComponents();
//   }

//   // 에러 컨트롤
//   // if (error) {
//   //   return <div>Error: {error.message}</div>;
//   // } else if (!isLoaded) {
//   //   return <div>Loading...</div>;
//   // }

//   return (
//     <Container fluid={true}>
//       <Row className="p-4">
//         <Col>
//           <h2>지도로 보기</h2>
//         </Col>
//       </Row>
//       <Row className="p-4">
//         <Col sm="12" md="6">
//           <SupportMap locationInfoList={storeInfoList} />
//         </Col>
//         {/* 카테고리 리스트 */}
//         <Col sm="6" md="2" className="categoryListBox">
//           {categoryList.map((category, index) => {
//             if (index === 0) {
//               return (
//                 <Col
//                   className="categoryListItem selectedCategoryListItem"
//                   key={index}
//                   onClick={(e) => {
//                     setSelectedCategory(category);
//                     // selectedCategory = category;
//                     if (!e.target.classList.contains("selectedCategoryListItem")
//                     ) {
//                       document
//                         .getElementsByClassName("selectedCategoryListItem")[0]
//                         .classList.remove("selectedCategoryListItem");
//                       e.target.classList.add("selectedCategoryListItem");
//                       changeComponents();
//                     }
//                   }}
//                 >
//                   {category}
//                 </Col>
//               );
//             }
//             return (
//               <Col
//                 className="categoryListItem"
//                 key={index}
//                 onClick={(e) => {
//                   setSelectedCategory(category);
//                   // selectedCategory = category;
//                   if (!e.target.classList.contains("selectedCategoryListItem")
//                   ) {
//                     document
//                       .getElementsByClassName("selectedCategoryListItem")[0]
//                       .classList.remove("selectedCategoryListItem");
//                     e.target.classList.add("selectedCategoryListItem");
//                     changeComponents();
//                   }
//                 }}
//               >
//                 {category}
//               </Col>
//             );
//           })}
//         </Col>
//         {/* 매장 리스트 */}
//         <Col sm="6" md="4" className="storeListBox">
//           {storeListComponents}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Support;
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Input, Button } from "reactstrap";
// import SupportMap from "../../components/support/supportMap";
import SupportMapItem from "../../components/support/supportMapItem";

function Support() {
  // 네이버 지도 스크립트 추가
  const script = document.createElement("script");
  script.src =
    "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=e5vp42977m";
  script.async = true;

  // 네이버 API 통신을 위해 필요한 HEADER 세팅
  const axios = require("axios");
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-NCP-APIGW-API-KEY-ID": "e5vp42977m",
      "X-NCP-APIGW-API-KEY": "PpdYPMVeyXPnhSW33x2XKzw9tYGpsGhjKvdhIlMy",
      "Access-Control-Allow-Origin": "*",
    },
  };

  // 카테고리 리스트 일단 넣어두기
  const categoryList = [
    "한식",
    "양식",
    "중식",
    "일식",
    "패스트푸드",
    "마트/편의점",
    "제과점/카페",
    "치킨/피자",
    "기타",
  ];

  // 데이터 로딩 여부
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // 서버에서 받는 매장 정보
  const [storeInfoList, setStoreInfoList] = useState([]);
  let [selectedCategory, setSelectedCategory] = useState("");
  // 주소 정보
  // 멀티캠퍼스가 기본 위치
  let [currentLocation, setCurrentLocation] = useState(
    "서울 강남구 역삼동"
  );
  // 좌표형 주소
  let [start_lat, setLatitude] = useState(37.571075);
  let [start_long, setLongitude] = useState(127.013588);

  let supportCheck = false;
  if (window.location.href.indexOf("support") > -1) {
    supportCheck = true;
  } else if (window.location.href.indexOf("map") > -1) {
    supportCheck = false;
  }


//   useEffect(() => {
//     // 현재 위치 정보 받아오기
//     navigator.geolocation.getCurrentPosition(function (position, error) {
//       // 에러 없음
//       if (error === undefined) {
//         console.log("위치위치!!");
//         setLatitude(position.coords.latitude);
//         setLongitude(position.coords.longitude);
//         axios
//           .get(
//             `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${start_long},${start_lat}&orders=roadaddr&output=json`,
//             config
//           )
//           .then((response) => {
//             if (
//               response.data.results[0] !== undefined &&
//               response.data.results[0].length > 0
//             ) {
//               let tempData = response.data.results[0].region;
//               setCurrentLocation(
//                 `${tempData.area1.name} ${tempData.area2.name} ${tempData.area3.name} ${tempData.area4.name}`
//               );
//               console.log(currentLocation);
//             }
//           })
//           .catch((error) => console.log(error));
//       }
//     });
//   }, []);

  // 근처 매장 리스트, 카테고리 별로 보여주기
  let storeListComponents = [];
  function changeComponents() {
    console.log('==============')
    console.log(storeInfoList)
    console.log('==============')

    storeListComponents = storeInfoList
      .map((storeInfo, index) => {
        if (storeInfo.storeCategory === selectedCategory) {
          storeInfo.supportCheck = supportCheck;
          return <SupportMapItem storeInfo={storeInfo} key={index} />;
        }
      })
      .filter((element) => {
        return element !== undefined;
      });
    if (storeListComponents.length === 0) {
      storeListComponents = (
        <Col className="nothingToShow">주변 가게가 없습니다...</Col>
      );
    }
  }

  // 위치 검색!
  function findNewLocation() {
    console.log(document.getElementById("addressInput").value);
    setCurrentLocation(document.getElementById("addressInput").value);
  }

  // DOM 마운트 이후 작동?
  useEffect(() => {
    axios
      .get(
        `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${currentLocation}`,
        config
      )
      .then((response) => {
        if (response.data.addresses[0] !== undefined) {
          console.log("좌표 변경");
          setLatitude(response.data.addresses[0].y);
          setLongitude(response.data.addresses[0].x);
        }
      });
    // document.body.appendChild(script);
    // 현재 위치(주소형태) 기준 주변 매장 세팅
    fetch(
      `http://i4a102.p.ssafy.io:8080/app/main/mapview/storelist/${encodeURIComponent(
        currentLocation
      )}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("RESULT");
          console.log(result);
          setIsLoaded(true);
        //   setStoreInfoList(result);
          setStoreInfoList(result[0]);
          setSelectedCategory("한식");
          document
            .getElementsByClassName("selectedCategoryListItem")[0]
            .classList.remove("selectedCategoryListItem");
          document
            .getElementsByClassName("categoryListItem")[0]
            .classList.add("selectedCategoryListItem");
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [currentLocation]);

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.type = "text/javascript";

    mapScript.append(
      `var mapOptions = {center: new naver.maps.LatLng(${start_lat}, ${start_long}),zoom: 15,};var map = new naver.maps.Map('naverMap', mapOptions);var markers = new naver.maps.Marker({position: new naver.maps.LatLng(${start_lat},
                ${start_long}
              ),
              map: map,
            });`
    );

    storeInfoList.forEach((location, index) => {
      console.log("가게");
      axios
        .get(
          `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${location.storeLocation}`,
          config
        )
        .then((response) => {
          if (response.data.addresses[0] !== undefined) {
            mapScript.append(`var marker${index} = new naver.maps.Marker({position: new naver.maps.LatLng(${response.data.addresses[0].y},
                          ${response.data.addresses[0].x}
                        ),
                        map: map,
                      });`);
          }
        });
      if (index + 1 === storeInfoList.length) {
        console.log("붙었다!!!!!!!!!!");
        document.body.appendChild(mapScript);
        console.log(mapScript);
      }
    });
  }, [start_lat, start_long, storeInfoList]);

  // 로딩이 끝났으면 매장 세팅
  if (isLoaded) {
    changeComponents();
  }

  return (
    <Container fluid={true} className="supportPageContainer">
      <Row className="p-4 supportPageTitle">
        <Col>
        <h2>{supportCheck ? '후원위치 선택' : '지도로 보기'}</h2>
        </Col>
      </Row>
      <Row className="p-4 supportPageContent">
        <Col sm="12" md="6" className="supportPageContentLeft">
          {/* 지도영역 + 검색 */}
          <Row>
            <Input
              type="text"
              name="addressInput"
              id="addressInput"
              placeholder="동 단위까지 입력해주세요"
              className="col-9"
            ></Input>
            <Button
              color="secondary"
              className="col-3"
              id="addressButton"
              onClick={findNewLocation}
            >
              검색
            </Button>
            {/* 지도 영역 */}
            <Col id="naverMap" className="mt-3"></Col>
            {/* 지도 영역 끝 */}
            {/* 지도영역 + 검색 끝 */}
          </Row>
        </Col>
        {/* 카테고리 리스트 */}
        <Col sm="6" md="2" className="categoryListBox">
          {categoryList.map((category, index) => {
            if (index === 0) {
              return (
                <Col
                  className="categoryListItem selectedCategoryListItem"
                  key={index}
                  onClick={(e) => {
                    setSelectedCategory(category);
                    // selectedCategory = category;
                    if (
                      !e.target.classList.contains("selectedCategoryListItem")
                    ) {
                      document
                        .getElementsByClassName("selectedCategoryListItem")[0]
                        .classList.remove("selectedCategoryListItem");
                      e.target.classList.add("selectedCategoryListItem");
                      changeComponents();
                    }
                  }}
                >
                  {category}
                </Col>
              );
            }
            return (
              <Col
                className="categoryListItem"
                key={index}
                onClick={(e) => {
                  setSelectedCategory(category);
                  // selectedCategory = category;
                  if (
                    !e.target.classList.contains("selectedCategoryListItem")
                  ) {
                    document
                      .getElementsByClassName("selectedCategoryListItem")[0]
                      .classList.remove("selectedCategoryListItem");
                    e.target.classList.add("selectedCategoryListItem");
                    changeComponents();
                  }
                }}
              >
                {category}
              </Col>
            );
          })}
        </Col>
        {/* 매장 리스트 */}
        <Col sm="6" md="4" className="storeListBox">
          {storeListComponents}
        </Col>
      </Row>
    </Container>
  );
}

export default Support;
