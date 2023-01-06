// ESLint 는 javascript 로 적힌 코드가 js 문법에 잘 맞게 쓰였는지 검사해주고 문법 에러를 명시해주는 툴이다.
//* 사용이유: js 문법 에러를 잡기 위함
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
// npx eslint 검사하고_싶은_파일명.js
// npx eslint 검사하고_싶은_파일명.js --fix // 자동 코드
