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
10. [트러블 슈팅](#%EF%B8%8F기술적-의사결정-및-트러블-슈팅)
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

## ‼️기술적 의사결정 및 트러블 슈팅

### 문제
- javascript vs typescript

### 고민했던 내용
1. 사실 많이들 typescript를 사용한다 하여 적용할 것인가를 고민
2. 느슨한 동적 타입의 js 보다 정적언어인 typescript의 장점으로 테스트 코드에서도
발견되지 않는 타입 관련 문제를 잡아준다는 면에서 사용하기에 이유로 충분함
3. 갹체지향 프로그래밍을 하는데 있어 추상화를 해야하는데 typescript를 다루는 것이
좋다고 생각함
4. 프로젝트 규모가 커지면 발생하는 type 에러에 대해 체감하거나 겪은 사례가
직접적으로 있지 않아 고민

### 해결방안
- typescript를 익히는 시간도 고려하여 해당 기간안에는 깊게 다루기는 어렵다 판단
- js를 더 다루어보고 이후 type 관련 문제에 대해 확인 후 typescript로 리펙토링
하기로 결정

---

<aside>
### 🔥  문제

- 배포 시 프론트에서 요청이 거절되는 CORS문제 발생
</aside>

<aside>
### 💭 원인

- 브라우저에서 동일 출처 정책으로 인해 다른 도메인을 신뢰할 수 없어 CORS문제가
발생한 것으로 확인
</aside>

<aside>
### 🗒️ 해결방안

- 서버 측에서 cors 라이브러리를 통해 교차 리소스를 허용할 수 있도록
프론트 도메인을 설정해줌으로써 문제 해결
</aside>

---

<aside>
### 🔥  문제

- 배포 시 서버에서 프론트로 cookie전송이 안되는 현상
</aside>

<aside>
### 💭 원인

- same site가 lax로 적용(default 값)돼있으니 none으로 변경하라는 오류 확인
</aside>

### 🗒️ 해결방안

```jsx
/****************************************************************
1. Cookie 정책에서 sameSite는 false 값을 준다.
2. 보안 설정은 false로 주게 되면 http에 SSL이 적용된 https를 사용하지 않아도 된다.
이렇게 되면 위험할 수 있기 때문에 배포 시 true로 바꾼다.
3. js로 해당 cookie에 접근을 막기 위해 httpOnl를 true로 바꿔준다.
****************************************************************/
res.cookie('access_token', access_token, { sameSite: 'None', secure: false, httpOnly: true });
res.cookie('refresh_token', refresh_token, { sameSite: 'None', secure: false, httpOnly: true });
```
  
---

<aside>
### 🔥  문제

- 배포 후 게시글 GET 요청 시 작성시간과 업데이트 시간이 9시간 느리게 불러와짐
- DB에는 한국 시간이 정상적으로 저장된 것으로 확인
</aside>

<aside>
### 💭 원인

- 배포된 우분투 환경에서의 시간이 미국 시간으로 설정되어 있었다.
</aside>

<aside>
### 🗒️ 해결방안

- EC2에 우분투 환경의 시간을 한국 시간과 동일하게 맞춰주면서 해결됨
</aside>

---

<aside>
### 🔥  문제

- multer-s3를 통해 AWS에 이미지를 저장하는데 있어 아래의 에러가 발생

`TypeError: this.client.send is not a function`

</aside>

<aside>
### 💭 원인

- version issue로 인해 발생되는 문제로 확인함
</aside>

<aside>
### 🗒️ 해결방안

- `multer-s3@2.10.0`로 버전을 다운 그레이드 하면서 해결
</aside>

---

<aside>
### 🔥  문제

- 사용자에게 제공해야 하는 날씨 정보와 조석 예보를 open api를 통해 받아와야함
하지만 open api를 다루는데 있어 하루 요청 횟수가 제한이 있는 것으로 파악
</aside>

<aside>
### 💭 고민했던 내용

1. 당일 날짜로 받아오는 요청들을 DB에 저장하면 요청 제한 횟수에 걸리지 않을 것이라
판단
2. 단방향 요청을 통해 받아오는 정보이지만 수시로 변하는 날씨 정보를 다루는데 DB에
저장하여 정해진 것 처럼 사용하는 것은 합리적이지 못하다 판단됨
3. 2번의 경우로 DB를 사용하게되면 이것 또한 낭비라 생각됨
</aside>

<aside>
### 🗒️ 해결방안

- 실전 프로젝트에 있어서 상업적인 목적은 없어 제한 있는 부분을 감수하고
그냥 open api를 사용하기로 함
</aside>

---

<aside>
### 🔥  문제

- 사용자에게 제공되어야 할 조석예보는 날씨와 다르게 위도, 경도로 찾는 것이 아닌
관측소 이름으로 정보를 받아와야 함
- 위의 경우 사용자의 위치에 따라 가장 가까운 관측소의 정보를 줘야했음
</aside>

<aside>
### 💭 고민했던 내용

1. 단순히 해양정보 관련 open api에서 조석예보를 제공해주는 곳이 더 있는지 구글링
하는 방법
2. 관측소의 장소(위도, 경도), 관측소 이름 정보를 가지고 와 JSON 형식으로 변수에 저장
이후 사용자의 위도, 경도를 x, y라 생각하고 x, y 좌표를 기준으로 거리를 계산하는
알고리즘을 찾아 적용하고,  가장 가까운 관측소의 이름을 가져와 open api에 요청을
보내서 정보를 받아오는 방법

</aside>

<aside>
### 🗒️ 해결방안

- 조석 예보를 제공하는 open api를 1개 밖에 찾지 못함.
- 위도, 경도를 통해 사용자의 위치로부터 가장 가가운 관측소의 위치를 찾아와
해당 정보를 제공
</aside>

---

<aside>
### 🔥  문제

- 날씨 및 조석예보를 현재 날짜 기준 2일 후까지 3시간 간격으로 제공하기로 하였으나
open api는 5일치를 응답으로 줌
- 날짜르 통해 직접 데이터를 거르는 작업이 필요한 상황이 발생
</aside>

<aside>
### 💭 고민했던 내용

1. 날짜를 통해 제공된 데이터를 순회하면서 현재날짜의 데이터가 있는 첫번째 index를
찾아 원하는 2일 후의 데이터 부분까지 배열을 자른다.
2. 날짜를 표기하는 방식을 맞추기 위해 `new Date()`와 `get Date()` 를 사용해
형식을 맞춘다.
3. 날짜를 원하는 형식으로 표기하기 위해 moment와 dayjs 중 하나를 선택해 사용한다.

</aside>

<aside>
### 🗒️ 해결방안

- moment가 비교적 무겁다는 이슈를 알고 있고 겪어본 경험이 있기에 dayjs를
사용하려 했으나, 라이브러리를 사용하지 않아도 직접 구현할 수 있을 것이라 판단되어
직접 함수를 작성하여 원하는 형식을 꺼내 사용하여 해결
</aside>

---

<aside>
### 🔥  문제

- DB를 다루는데 있어 Node의 ORM을 사용할 것인가
- Raw query를 직접 사용할 것인가?
</aside>

<aside>
### 💭 고민했던 내용

1. Row Query를 익혀서 직접 Query를 작성하는데는 시간적 여유가 없다 판단
2. 실전 프로젝트 기간 동안 생산성을 위해 ORM을 다루는 방향으로 선택
3. ORM을 선택하는데 있어 어떤 ORM을 선택할 것인가?
4. 기존에 익혔던 sequelize 보다 typeORM과 prisma와 knex가 상대적으로
속도가 더 빠르다는 정보를 확인
</aside>

<aside>
### 🗒️ 해결방안

- typeORM과 knex의 문법이 Row Query와 가까운 것을 확인하여 사용하고자하나
생산성을 위해 sequelize를 사용하기로 함
- 하지만 이후 속도면에서 빠르다는 정보를 확인한 typeORM을 통해 리펙토링
하기로 함
- ORM이 전부를 해결해주지는 않기 떄문에 복잡한 요청을 하는 상황이 오면
Row Query를 적용하기로 함
</aside>
