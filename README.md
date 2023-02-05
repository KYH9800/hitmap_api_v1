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
![image](https://user-images.githubusercontent.com/61128538/216825574-a9c9aa1c-2c37-4e8c-866a-58b4a69e6747.png)

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
|---|---|
|Node.js|자바스크립트 런타임|
|Express.js|웹 프레임워크|
|MySQL|RDBMS|
|MongoDB|DBMS|
|Nginx|Proxy Server|

<br/>

## 📘라이브러리 (WHY?)
|라이브러리|설명|
|---|---|
|artillery 2.0.0-28|서버 부하 테스트|
|axios 1.2.2|HTTP 비동기 통신 라이브러리|
|bcrypt 5.1.0|비밀번호 암호화|
|cors 2.8.5|교차 리소스 공유|
|dotenv 16.0.3|환경변수 관리|
|helmet 6.0.1|HTTP 헤더 보안|
|hpp 0.2.3|HTTP 매개변수 보안|
|jest 29.3.1|테스트 코드|
|joi 17.7.0|입력데이터 검증|
|jsonwebtoken 9.0.0|서명 암호화|
|morgan 1.10.0|HTTP 로그 기록|
|winston 3.8.2|log 파일 생성|
|multer 1.4.5-lts.1|파일 업로드 미들웨어|
|mysql2 2.3.3|MySQL 드라이버|
|mongoose 6.9.0|Node ODM|
|sequelize 6.28.0|Node ORM|
|socket.io 4.5.4|실시간 양방향 통신 라이브러리|
|eslint 8.31.0|정적코드 분석 도구|
|prettier 2.8.1|코드 스타일 정리 도구|
|nodemon 2.0.20|코드 변경 시 자동 서버 재시작 Tool|

<br/>

## ⚙️아키텍쳐
![image](https://user-images.githubusercontent.com/61128538/216824438-d0cf7c6c-c485-4d74-a526-e5f87e3cf630.png)

<br/>

## 💻주요 기능
|기능(작성중)|설명(작성중)|
|---|---|
|지도 검색||   
|원하는 지역 검색 기능||   
|날씨정보 제공||   
|해당 지역 검색 후 그 지역의 날씨와 바다 상황 정보 제공||   
|SNS 기능||   
|잡은 물고기나 낚시 관한 정보 게시||   
|작성된 게시글에 대한 댓글 기능||   
|다른 클라이언트가 작성한 게시글이 마음에 들 경우 좋아요 기능||   
|회원가입/로그인 기능||   
|비회원시 : 지도, 날씨, SNS Read기능만 가능||   
|회원가입시 : SNS 작성과 댓글, 좋아요, 마이페이지 기능 사용 가능||   

<br/>

## 🤝DB ERD
<img width="962" alt="스크린샷 2023-02-05 오후 5 32 54" src="https://user-images.githubusercontent.com/115982628/216809340-3663ab38-a9e1-4060-814c-3a320825e4f6.png">

<br/>

## 🖊️코드 컨벤션 Tool
### 1. eslint
```javascript
module.exports = {
  // env(사용환경): 어떤 환경에서 스크립트를 실행할 것인지 설정한다. 과제 스프린트에서는 Node.js를 의존하므로 아래와 같이 실행환경을 추가하였다.
  // 스크립트 실행 환경을 명시
  env: {
    browser: true, // 브라우저 의존
    node: true, // Node.js를 의존
    commonjs: true,
    es2021: true,
    // jest: true
  },
  // plugins: ['prettier'], // typescript를 쓸거라면 '@typescript-eslint', ESLint에는 기본으로 제공되는 규칙(rule) 외에도 추가적인 규칙(rule)을 사용할 수 있도록 만들어준다.
  // ESLint 설정을 확장할 때 사용한다. prettier, airbnb, google 등 다른 사용자의 설정을 불러올 수 있다.
  // 해당 프로젝트에서는 대표적인 airbnb 규칙을 적용하기에는 엄격하다 느껴지며, 구현하는데 시간이 오래 걸릴 것을 우려하여 eslint 권장 규칙들을 적용합니다.
  extends: 'eslint:recommended', // ESLint에서 권장하는 규칙들이 적용된 eslint:recommended으로 설정 (규칙 참고: https://eslint.org/docs/latest/rules/)
  overrides: [], // overrides: 프로젝트 내에서 일부 파일에 대해서만 다른 설정을 적용해줘야 할 때 사용
  // parserOptions: ESLint는 기본적으로 순수한 자바스크립트 코드만 이해할 수 있기 때문에 자바스크립트의 확장 문법이나 최신 문법으로 작성한 코드를 린트(lint)하기 위해서는 그에 상응하는 파서(parser)를 사용하도록 설정해줘야
  // eslint를 사용하기 위해 지원하는 언어를 설정(버전과 모듈 사용 여부)
  parserOptions: {
    ecmaVersion: 'latest', // ECMA version으로 최신 버전을 파싱한다. (참고: https://www.daleseo.com/eslint-config/)
  },
  // rules: 프로젝트에서 강제하고 싶은 규칙들을 설정한다.
  rules: {},
};
```
- js 문법 에러를 잡기 위함
- 협업에서 문법 규칙을 통일하기 위해 적용

### 2. prettier
```javascript
module.exports = {
  tabWidth: 2, // 탭 너비는 2칸으로 지정
  semi: true, // 세미콜론 사용 여부, 쌍반점을 사용할지 여부, 사용
  singleQuote: true, // single 쿼테이션 사용 여부, 큰 따옴표 대신 작은 따옴표 사용여부, 사용
  trailingComma: 'all', // 여러 줄을 사용할 때, 후행 콤마 사용 방식, 모두 사용
  arrowParens: 'always', // 화살표 함수 괄호 사용 방식, “avoid” 을 기본값으로 사용하였고, 현재는 “always”를 기본값으로 사용하여 함수의 매개변수에 항상 괄호를 감싸도록 정의
  printWidth: 120, //  줄 바꿈 할 폭 길이, 120줄 이상이면, 줄바꿈이 된다
};
```
- 협업을 진행하는 동안 팀원과 동일한 형식으로 코드를 작성하게 하기 위해서입니다.
- 또한 코드 스타일로 인한 git 충돌 방지를 위함입니다.

<br/>

## ‼️트러블 슈팅
