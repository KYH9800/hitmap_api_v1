// Prettier 는 나만의 코드 스타일을 만들고 적용하는 툴이다.
//* prettier 사용이유: 협업을 진행하는 동안 팀원과 동일한 형식으로 코드를 작성하게 하기 위해서입니다. 또한 코드 스타일로 인한 git 충돌 방지를 위함입니다.
module.exports = {
  tabWidth: 2, // 탭 너비는 2칸으로 지정
  semi: true, // 세미콜론 사용 여부, 쌍반점을 사용할지 여부, 사용
  singleQuote: true, // single 쿼테이션 사용 여부, 큰 따옴표 대신 작은 따옴표 사용여부, 사용
  trailingComma: 'all', // 여러 줄을 사용할 때, 후행 콤마 사용 방식, 모두 사용
  arrowParens: 'always', // 화살표 함수 괄호 사용 방식, “avoid” 을 기본값으로 사용하였고, 현재는 “always”를 기본값으로 사용하여 함수의 매개변수에 항상 괄호를 감싸도록 정의
  printWidth: 120, //  줄 바꿈 할 폭 길이, 120줄 이상이면, 줄바꿈이 된다
};

/* prettier 사용설명
{
  "arrowParens": "avoid", // 화살표 함수 괄호 사용 방식
  "bracketSpacing": false, // 객체 리터럴에서 괄호에 공백 삽입 여부 
  "endOfLine": "auto", // EoF 방식, OS별로 처리 방식이 다름 
  "htmlWhitespaceSensitivity": "css", // HTML 공백 감도 설정
  "jsxBracketSameLine": false, // JSX의 마지막 `>`를 다음 줄로 내릴지 여부 
  "jsxSingleQuote": false, // JSX에 singe 쿼테이션 사용 여부
  "printWidth": 80, //  줄 바꿈 할 폭 길이
  "proseWrap": "preserve", // markdown 텍스트의 줄바꿈 방식 (v1.8.2)
  "quoteProps": "as-needed" // 객체 속성에 쿼테이션 적용 방식
  "semi": true, // 세미콜론 사용 여부
  "singleQuote": true, // single 쿼테이션 사용 여부
  "tabWidth": 2, // 탭 너비 
  "trailingComma": "all", // 여러 줄을 사용할 때, 후행 콤마 사용 방식
  "useTabs": false, // 탭 사용 여부
  "vueIndentScriptAndStyle": true, // Vue 파일의 script와 style 태그의 들여쓰기 여부 (v1.19.0)
  "parser": '', // 사용할 parser를 지정, 자동으로 지정됨
  "filepath": '', // parser를 유추할 수 있는 파일을 지정
  "rangeStart": 0, // 포맷팅을 부분 적용할 파일의 시작 라인 지정
  "rangeEnd": Infinity, // 포맷팅 부분 적용할 파일의 끝 라인 지정,
  "requirePragma": false, // 파일 상단에 미리 정의된 주석을 작성하고 Pragma로 포맷팅 사용 여부 지정 (v1.8.0)
  "insertPragma": false, // 미리 정의된 @format marker의 사용 여부 (v1.8.0)
  "overrides": [ 
    {
      "files": "*.json",
      "options": {
        "printWidth": 200
      }
    }
  ], // 특정 파일별로 옵션을 다르게 지정함, ESLint 방식 사용
}

useTabs: true, // 탭 사용 여부, 띄어쓰기 대신 탭을 사용하여 간격을 조정하고 싶을때 활성화합니다. / 비활성화
*/
