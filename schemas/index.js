const mongoose = require('mongoose');

module.exports = () => {
  const connect = () => {
    mongoose.connect(
      'mongodb://root:dbsgur!@localhost:27017',
      {
        dbName: 'socketDB',
        useNewUrlParser: true,
      },
      (err) => {
        if (err) {
          console.error('몽고디비 연결 에러', err);
        } else {
          console.log('몽고디비 연결 성공');
        }
      },
    );
  };

  mongoose.connection.on('error', (error) => {
    console.log('몽고디비 연결 에러', error);
  });

  mongoose.connection.on('disconnected', connect, () => {
    console.log('몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.');
  });

  connect();

  require('./room');
  require('./chat');
};

/***************************************************************************************
 * mongoose는 node의 ODM(Object Document Mapping): 객체와 다큐먼트를 매핑(1:1 짝지음)
 * mongoDB에 없어 불편한 기능들을 몽구스가 보완
 * 테이블과 유사한 기능, JOIN 기능 추가(MySQL에 있는 JOIN 기능을 populate라는 메서드를 통해 어느정도 보완)
 ***************************************************************************************/

/***************************************************************************************
 * SQL: SQL을 사용
 * > 대표적인 데이터베이스 관리 시스템으로 MySQL이 있음
 * > Node의 ORM으로 sequelize와 몇가지가 있다.
 * - 규칙에 맞는 데이터를 입력
 * - 테이블 간 JOIN 지원
 * - 안정성, 일관성
 * - 용어: 테이블 / 로우 / 컬럼
 * - 수직확장
 ***************************************************************************************
 * NoSQL: SQL을 사용하지 않음
 * > 대표적인 데이터베이스 관리 시스템으로 MongoDB가 있음
 * > Node의 ODM으로 mongoose가 있다.
 * - 자유로운 데이터 입력
 * - 컬렉션 간 JOIN 미지원
 * - 확장성, 가용성
 * - 용어: 컬렉션 / 다큐먼트 / 필드
 * - 수직확장 + 수평확장
 ***************************************************************************************/
