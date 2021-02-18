# 우리끼니

# 키오스크 사용 방법
 

## 1. 키오스크 실행 설명
### 1.1. 실행 환경
	Windows 10 64bit
	Python 3.9
### 1.2. 사용 패키지
	실행 전 아래의 패키지들을 설치해주세요.
|패키지 이름|버전|
|:------|---:|
|PyQt5|5.15.2|	
|PyQt5-sip|	12.8.1|	
|PyQtWebEngine|	5.15.2|	
|certifi|2020.12.5|	
|chardet|4.0.0|
|idna|2.10|	
|pyserial|3.5|	
|requests|2.25.1|	
|urllib3|1.26.3|

	>> pip install PyQt5 PyQtWebEngine requests pyserial
	
### 1.3. NFC 모듈
#### 1.3.1 NFC 모듈 사용 시

> PN532 NFC 모듈 사용 기준
> * I2C 통신
>	```
>	아두이노와 PN532 모듈의 I2C 통신을 위해 아래와 같이 연결합니다.(유동적으로 변경 가능)
	>>|아두이노 PIN|모듈 PIN|
	>>|:------|---:|
	>>|SDA|SDA|
	>>|SCL|SCL|
	>>|Pin 8|RST(Reset)|
	>>|Pin 9|IR0|
	>>|GND|GND|
	>>|5V|5V|
> * 바이너리 업로드
>	```
>	아래의 링크에서 Arduino IDE를 다운로드 후 설치합니다.
>	설치 후 아두이노를 연결하고 [iso14443a_uid.ino]을 컴파일 후 업로드 합니다.
>><https://www.arduino.cc/>

#### 1.3.2 NFC 모듈 미사용 시
> arduinoSerial.py의 testmode 변수 설정을 통해 카드 태그를 테스트 할 수 있습니다.
> * testmode = testCreditCardId
>	```
>	카드 태그 선택 시 일반 신용카드가 태그 된 상태로 진행됩니다.
> * testmode = testGdreamCardId
>	```
>	카드 태그 선택 시 후원된 음식을 먹기 위한 Gdream 카드가 태그 된 상태로 진행됩니다.

#### 1.3.3 NFC 모듈 연결 실패
> 기본 USB Port number는 "COM3"으로 설정되어 있습니다.
> 만약 연결 시에도 에러가 발생한다면, 아래를 참고해주세요.
> * PORT 변경
>	```
>	arduinoSerial.py의 PORT 변수 설정을 통해 사용하는 포트를 변경할 수 있습니다
>	아두이노가 연결 된 USB 포트 번호를 확인(아두이노 IDE를 통해 쉽게 확인 가능) 후 해당 포트의 이름을
>	arduinoSerial.py의 PORT 변수에 저장합니다.
>	Ex) PORT = "COM3"

### 1.4. 키오스크 실행

> 키오스크를 실행하기 위해 아래와 같은 명령어를 실행합니다.
> ```
> python et.py
> ```
> 자동 최대화를 하고싶으면 et.py에서 class et의 __init__ 함수 내부에 self.showMaximized()을 추가합니다.
> <pre>
> <code>
> ```
> class et(QMainWindow, Ui_mainWindow):  
>   def __init__(self):  
>     super().__init__()  
>     self.ui = Ui_mainWindow()  
>     self.ui.setupUi(self)   
>     self.showMaximized() <<< 추가해주세요.
> ```
> </code>
> </pre>

### 1.5. Gdream 카드 등록
> 지드림 카드 등록을 위해 아래와 같이 해주세요.
> ```
> arduinoSerial.py에 print(self.line)를 추가해주세요.
> ```
>  <pre>
> <code>
> ```
> if self.exitFlag == 0:  
>  # bytes -> str 형 변환  
>  self.line = str(self.line)  
>  # str 파싱  
>  # "b'0x00000000H\\r\\n'" -> "0x00000000"  
>  self.line = self.line.split("\'")[1].split("H")[0]  
>  print(self.line) <<< 추가해주세요
>  # rfid를 통해 받아 온 card id를 전송  
>  self.notifyProgress.emit(self.line)
> ```
> </code>
> </pre>
> 추가 후 키오스크의 카드 결제 단계에서 등록을 원하는 카드를 태그하면
> 콘솔창에 카드 번호가 출력됩니다.
> Ex) 0xAF131025
> 
> 이후 아래와 같은 요청을 보냅니다.
> ```
> https://ooriggini.me:8080/app/payment/cardcreate?cardNumber=0xAF131025&cardType=gdream
> ```
 
