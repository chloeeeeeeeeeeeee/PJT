우리니끼
======================

# FrontEnd

## 0. Why React?

> 이부분은 조금 더 정리를 해봐야할듯

0. 그냥 리액트해보고 싶어서 하자고 한건데

1. React는 JSX = JavaScript XML, Vue는 Template
   1. `const example=<h1>This is Example</h1>`
   2. 같은 페이지이지만 사용자에 따라 조금은 다른 화면을 출력해야한다.
   3. Vue의 경우 여러개의 컴포넌트를(.vue 파일) 만들어서 바꿔가며 보여줘야하지만 React는 하나의 파일에서 JSX를 활용해서 컨트롤 가능하다
2. React의 기본 틀 자체가 CSS의 구조화를 지향한다.
   1. Vue는 한 파일에 html, css, js가 다 들어갈 수 있지만, react는 외부 파일을 import 한다
   2. 이는 코드 관리에 도움이 된다고 한다.
3. JS의 활용면에서 React가 우월하며 서버와 분리된 작업 가능
   1. 필요 기능 구축에 도움이 된다.
4. 타입스크립트는 React에서 훨씬 잘된단다. 우리는 안쓰긴 했지만 다음 플젝에선...
5. 외부 객체(카카오, 네이버, 아임포트)와 여러가지 상태변화를 조작 및 관리하기엔 React가 더 안정적


## 1. FrontEnd 기본 설정

[![npm](README.assets/npm-6.14.11-brightgreen)](https://www.npmjs.com/get-npm)[![node](README.assets/node-14.15.1-brightgreen)](https://nodejs.org/en/download/)

### 1.1 .env 설정

#### a102_fe/.env

```
REACT_APP_API_URL={서버 URL}
REACT_APP_NAVER_MAP_CLIENT_ID={네이버 지도 CLIENT ID}
REACT_APP_KAKAO_MAP_APP_KEY={네이버 지도 APP KEY}
REACT_APP_KAKAO_LOGIN_APP_KEY={카카오 로그인 APP KEY}
REACT_APP_IMPORT_INIT_KEY={아임포트 INIT KEY}
REACT_APP_STORE_TOKEN={테스트용 매장 JWT 값}
```

### 1.2 npm 설치

`npm install`

- 해당 명령어로 `react`, `reactstrap`을 포함한 필요 라이브러리 다운로드

### 1.3 FrontEnd 실행

#### 개발용 실행

`npm run start`, `npm start`

- React 개발용 실행. `localhost:3000`으로 사이트 확인 가능

#### 배포용 실행

`npm run build`, `npm build`

- React 배포용 실행
  - build 폴더가 만들어지며 해당 폴더를 서버에 넣어 배포



## 2. FrontEnd 폴더 구조

> 이 부분은 지워도 될듯... TMI인듯...

- node_modules : node 모듈 폴더로 `npm install`시 생성된다.
- public : React 기본 폴더로 `public/index.html`을 통해 SPA 렌더링

### src 폴더 구조

```
📦src
 ┣ 📂assets
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📂naverAuth
 ┃ ┃ ┃ ┗ 네이버 로그인 관련 이미지 파일
 ┃ ┃ ┗ 페이지 내 필요 이미지 파일
 ┃ ┗ 📂scss
 ┃ ┃ ┣ 📂myscss
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┣ 📂account
 ┃ ┃ ┃ ┃ ┃ ┗ 회원 관련 컴포넌트 scss 파일
 ┃ ┃ ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┃ ┃ ┗ header, footer scss 파일
 ┃ ┃ ┃ ┃ ┗ 📂main
 ┃ ┃ ┃ ┃ ┃ ┗ 사용자 별 main 페이지 컴포넌트 scss 파일
 ┃ ┃ ┃ ┗ 📂pages
 ┃ ┃ ┃ ┃ ┣ 📂account
 ┃ ┃ ┃ ┃ ┃ ┗ 회원 관련 페이지 scss 파일
 ┃ ┃ ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┃ ┃ ┗ main 페이지 scss 파일
 ┃ ┃ ┃ ┃ ┣ 📂payment
 ┃ ┃ ┃ ┃ ┃ ┗ 결제 페이지 scss 파일
 ┃ ┃ ┃ ┃ ┣ 📂qna
 ┃ ┃ ┃ ┃ ┃ ┗ QnA 페이지 scss 파일
 ┃ ┃ ┃ ┃ ┣ 📂store
 ┃ ┃ ┃ ┃ ┃ ┗ 가게 상세 페이지 scss 파일
 ┃ ┃ ┃ ┃ ┗ 📂support
 ┃ ┃ ┃ ┃ ┃ ┗ 후원 페이지 scss 파일
 ┃ ┃ ┗ 📂theme
 ┃ ┃ ┃ ┗ 전체 적용 스타일 scss 파일
 ┣ 📂components
 ┃ ┣ 📂account
 ┃ ┃ ┗ 회원 관련 컴포넌트 js 파일
 ┃ ┣ 📂layout
 ┃ ┃ ┗ header, footer js 파일
 ┃ ┣ 📂main
 ┃ ┃ ┗ 사용자 별(아동, 후원자, 매장관리자) 컴포넌트 js 파일
 ┃ ┣ 📂payment
 ┃ ┃ ┗ 결제 관련 컴포넌트 js 파일
 ┃ ┣ 📂store
 ┃ ┃ ┗ 가게 상세 관련 컴포넌트 js 파일
 ┃ ┗ 📂support
 ┃ ┃ ┗ 후원 컴포넌트 js 파일
 ┣ 📂pages
 ┃ ┣ 📂account
 ┃ ┃ ┗ 회원 관련 페이지 js 파일
 ┃ ┣ 📂main
 ┃ ┃ ┗ 사용자 별(아동, 후원자, 매장관리자) 페이지 js 파일
 ┃ ┣ 📂payment
 ┃ ┃ ┗ 결제 페이지 js 파일
 ┃ ┣ 📂qna
 ┃ ┃ ┗ QnA 페이지 js 파일
 ┃ ┣ 📂store
 ┃ ┃ ┗ 가게 상세 페이지 js 파일
 ┃ ┗ 📂support
 ┃   ┗ 후원 페이지 js 파일
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.js
 ┣ 📜index.scss
 ┗ ...
```

## 3. 설정된 URL 주소

> App.js에서 확인 가능합니다.

### 3.1 아동 URL

| URL   | 관련 파일                      | 비고                                |
| ----- | ------------------------------ | ----------------------------------- |
| /main | /pages/main/childmain.js       | 아동용 메인 화면                    |
| /map  | /pages/support/childsupport.js | 후원된 매장 위치, 리스트, 현황 확인 |

### 3.2 후원자 URL

| URL                          | 관련 파일                                | 비고                               |
| ---------------------------- | ---------------------------------------- | ---------------------------------- |
| /                            | /pages/main/main.js                      | 후원자 메인 화면                   |
| /auth                        | /pages/account/authentication.js         | 로그인                             |
| /naver                       | /components/account/naverAuthCallback.js | 네이버 로그인                      |
| /signout                     | /pages/account/signout.js                | 로그아웃                           |
| /support                     | /pages/support/support.js                | 후원 가능 매장 지도 및 정보 리스트 |
| /storedetailsupport/:storeId | /pages/support/storeDetail.js            | 선택된 1개 매장 정보               |
| /qnacreate                   | /pages/qna/qnacreate.js                  | QnA 작성                           |
| /qna                         | /pages/qna/qnalist.js                    | 전체 QnA 리스트                    |
| /qnadetail                   | /pages/qna/qnadetail.js                  | 선택된 1개의 QnA 읽기              |
| /qnaupdate                   | /pages/qna/qnaupdate.js                  | 선택된 1개의 QnA 수정              |
| /payment                     | /pages/payment/payment.js                | 결제 페이지                        |
| /paymentCheck                | /pages/payment/kakaoPaymentCheck.js      | 카카오페이 결제 연결               |
| /paymentSuccess              | /pages/payment/paymentSuccess.js         | 결제 성공 페이지                   |
| /profile                     | /pages/account/profile.js                | 로그인 한 회원 프로필, 타임라인    |

### 3.3 매장 관리자 URL

> 관리자 로그인을 통해서만 접근 가능

| URL         | 관련 파일                  | 비고                                  |
| ----------- | -------------------------- | ------------------------------------- |
| /storeAdmin | /pages/store/storeadmin    | 매장 정보, 위치, 메뉴, 후원 현황 확인 |
| /menucreate | /pages/store/menucreate.js | 해당 매장 메뉴 추가                   |
| /menuupdate | /pages/store/menuupdate.js | 해당 매장 메뉴 수정                   |









# 키오스크 사용 방법

## 1. 키오스크 실행 설명

### 1.1. 실행 환경

	Windows 10 64bit
	Python 3.9

### 1.2. 사용 패키지

	실행 전 아래의 패키지들을 설치해주세요.

| 패키지 이름   |      버전 |
| :------------ | --------: |
| PyQt5         |    5.15.2 |
| PyQt5-sip     |    12.8.1 |
| PyQtWebEngine |    5.15.2 |
| certifi       | 2020.12.5 |
| chardet       |     4.0.0 |
| idna          |      2.10 |
| pyserial      |       3.5 |
| requests      |    2.25.1 |
| urllib3       |    1.26.3 |

	>> pip install PyQt5 PyQtWebEngine requests pyserial

### 1.3. NFC 모듈

#### 1.3.1 NFC 모듈 사용 시

> PN532 NFC 모듈 사용 기준
>
> * I2C 통신
>
>   ```
>   아두이노와 PN532 모듈의 I2C 통신을 위해 아래와 같이 연결합니다.(유동적으로 변경 가능)
>   ```
>
> >| 아두이노 PIN |   모듈 PIN |
> >| :----------- | ---------: |
> >| SDA          |        SDA |
> >| SCL          |        SCL |
> >| Pin 8        | RST(Reset) |
> >| Pin 9        |        IR0 |
> >| GND          |        GND |
> >| 5V           |         5V |
>
> * 바이너리 업로드
>
>   ```
>   아래의 링크에서 Arduino IDE를 다운로드 후 설치합니다.
>   설치 후 아두이노를 연결하고 [iso14443a_uid.ino]을 컴파일 후 업로드 합니다.
>   ```
>
> ><https://www.arduino.cc/>

#### 1.3.2 NFC 모듈 미사용 시

> arduinoSerial.py의 testmode 변수 설정을 통해 카드 태그를 테스트 할 수 있습니다.
>
> * testmode = testCreditCardId
>
>   ```
>   카드 태그 선택 시 일반 신용카드가 태그 된 상태로 진행됩니다.
>   ```
>
> * testmode = testGdreamCardId
>
>   ```
>   카드 태그 선택 시 후원된 음식을 먹기 위한 Gdream 카드가 태그 된 상태로 진행됩니다.
>   ```

#### 1.3.3 NFC 모듈 연결 실패

> 기본 USB Port number는 "COM3"으로 설정되어 있습니다.
> 만약 연결 시에도 에러가 발생한다면, 아래를 참고해주세요.
>
> * PORT 변경
>
>   ```
>   arduinoSerial.py의 PORT 변수 설정을 통해 사용하는 포트를 변경할 수 있습니다
>   아두이노가 연결 된 USB 포트 번호를 확인(아두이노 IDE를 통해 쉽게 확인 가능) 후 해당 포트의 이름을
>   arduinoSerial.py의 PORT 변수에 저장합니다.
>   Ex) PORT = "COM3"
>   ```

### 1.4. 키오스크 실행

> 키오스크를 실행하기 위해 아래와 같은 명령어를 실행합니다.
>
> ```
> python et.py
> ```
>
> 자동 최대화를 하고싶으면 et.py에서 class et의 __init__ 함수 내부에 self.showMaximized()을 추가합니다.
>
> <pre>
> <code>
> ```
> class et(QMainWindow, Ui_mainWindow):  
> def __init__(self):  
> super().__init__()  
> self.ui = Ui_mainWindow()  
> self.ui.setupUi(self)   
> self.showMaximized() <<< 추가해주세요.
> ```
> </code>
> </pre>

### 1.5. Gdream 카드 등록

> 지드림 카드 등록을 위해 아래와 같이 해주세요.
>
> ```
> arduinoSerial.py에 print(self.line)를 추가해주세요.
> ```
>
> <pre>
> <code>
> ```
> if self.exitFlag == 0:  
> # bytes -> str 형 변환  
> self.line = str(self.line)  
> # str 파싱  
> # "b'0x00000000H\\r\\n'" -> "0x00000000"  
> self.line = self.line.split("\'")[1].split("H")[0]  
> print(self.line) <<< 추가해주세요
> # rfid를 통해 받아 온 card id를 전송  
> self.notifyProgress.emit(self.line)
> ```
> </code>
> </pre>
>
>
> 추가 후 키오스크의 카드 결제 단계에서 등록을 원하는 카드를 태그하면
> 콘솔창에 카드 번호가 출력됩니다.
> Ex) 0xAF131025
>
> 이후 아래와 같은 요청을 보냅니다.
>
> ```
> https://ooriggini.me:8080/app/payment/cardcreate?cardNumber=0xAF131025&cardType=gdream
> ```

