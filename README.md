# 🐬HITMAP

## 📎목차
1. [프로젝트 소개](#프로젝트-소개)
2. [도메인 주소](#도메인-주소)
3. [팀 구성](#팀-구성)
4. [기술스택](#기술스택-why)
5. [라이브러리](#라이브러리-why)
6. [아키텍쳐](#%EF%B8%8F아키텍쳐)
7. [주요 기능](#주요-기능)
8. [DB ERD](#db-erd)
9. [코드 컨벤션 Tool](#%EF%B8%8F코드-컨벤션-tool)
10. [트러블 슈팅](#%EF%B8%8F트러블-슈팅)
<br/>

## 📑프로젝트 소개
“魚매불망 너만 기다리며, 魚중모색 너만 찾았다.”   
낚시 갈건데 거기 날씨하고 바다는 어때?   
월척이다! 어디서 자랑하지?   
낚시는 처음인데 정보는 어디서 소통하지?   
HITMAP은 낚시에서 가장 중요한 날씨와 낚시의 정보를 교류할 수 있는 1000만 낚시인들의 꿈의 커뮤니티 웹입니다.   
<br/>

## 📡도메인 주소
### [HITMAP](https://hitmap-fe.vercel.app/)
<br/>

## 👩‍👦‍👦팀 구성
|Backend|Frontend|Designer|
|---|---|---|
|고윤혁 <br> [Github](https://github.com/KYH9800)|장세화 <br> [Github](https://github.com/saehwa95)|이연정|
|이규형 <br> [Github](https://github.com/kyuhyunglee8)|정창원 <br> [Github](https://github.com/jungjang)|
||조형준 <br> [Github](https://github.com/cho98)|

<br/>

## 🔧기술스택 (WHY?)
|기술스택|설명|
|Node.js|자바스크립트 런타임|
|Express.js|웹 프레임워크|
|MySQL|RDBMS|
|MongoDB|DBMS|
|Nginx|Proxy Server|

<br/>

## 📘라이브러리 (WHY?)
|라이브러리|설명|
|artillery|작성중...|
|axios|작성중...|
|bcrypt|작성중...|
|cors|작성중...|
|dotenv|작성중...|
|helmet|작성중...|
|hpp|작성중...|
|jest|작성중...|
|joi|작성중...|
|jsonwebtoken|작성중...|
|morgan|작성중...|
|winston|작성중...|
|multer|작성중...|
|mysql2|작성중...|
|mongoose|작성중...|
|sequelize|작성중...|
|socket|작성중...|
|eslint|작성중...|
|prettier|작성중...|
|nodemon|작성중...|

<br/>

## ⚙️아키텍쳐
![image](https://user-images.githubusercontent.com/61128538/216824438-d0cf7c6c-c485-4d74-a526-e5f87e3cf630.png)

<br/>

## 💻주요 기능
지도 검색   
원하는 지역 검색 기능   
날씨정보 제공   
해당 지역 검색 후 그 지역의 날씨와 바다 상황 정보 제공   
SNS 기능   
잡은 물고기나 낚시 관한 정보 게시   
작성된 게시글에 대한 댓글 기능   
다른 클라이언트가 작성한 게시글이 마음에 들 경우 좋아요 기능   
회원가입/로그인 기능   
비회원시 : 지도, 날씨, SNS Read기능만 가능   
회원가입시 : SNS 작성과 댓글, 좋아요, 마이페이지 기능 사용 가능   

<br/>

## 🤝DB ERD
<img width="962" alt="스크린샷 2023-02-05 오후 5 32 54" src="https://user-images.githubusercontent.com/115982628/216809340-3663ab38-a9e1-4060-814c-3a320825e4f6.png">

<br/>

## 🖊️코드 컨벤션 Tool
1. eslint
- js 문법 에러를 잡기 위함
- 협업에서 문법 규칙을 통일하기 위해 적용

2. prettier
- 협업을 진행하는 동안 팀원과 동일한 형식으로 코드를 작성하게 하기 위해서입니다.
- 또한 코드 스타일로 인한 git 충돌 방지를 위함입니다.

<br/>

## ‼️트러블 슈팅
