### throw
예외처리. throw를 쓰지않으면 에러를 감지 못하고 계속 다음 코드를 실행함.
에러가 발생했을때 즉각적으로 다음 코드로 넘어가지 않고 catch,등의 에러이벤트 담당 함수로 넘어가도록 만듦.
예를 들어 지금 로그인 이벤트에서 로그인 정보를 잘못 입력했을 때 throw를 하지 않으면 catch에서 잡지 못하고 다음 함수 then(),등이 계속 실행됨.