//여러 군데, 여러번 쓰이는 함수,모듈 저장소.

import axios from "axios"; // axios 호출

axios.defaults.baseURL = "http://localhost:3000"; //프록시 서버
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

//서버와의 데이터 통신을 위한 메소드
export default {
  methods: {
    // url을 받고, data를 파라미터로 주고 받음.$api의 3 번쨰 인자로 메소드를 받도록하고 post를 기본값으로 함.
    //추가로 이제 post말고도 get도 그냥 쓸 수 있음.
    async $api(url, data, method = "post") {
      // url을 받고, data를 파라미터로 주고 받음
      try {
        const response = await axios({
          // axios로 서버를 호출하고, 그 결과를 return하는 방식
          method, // 전달된 메소드를 사용하도록 변경
          url, // url 호출
          data, // data 받음
        });
        return response.data; // data return
      } catch (e) {
        console.log(e); // 일단 console.log로 에러 표현
        throw e; // 에러를 다시 던져서 상위 컴포넌트에서 처리하도록 함
      }
    },
    $base64(file) {
      return new Promise((resolve) => {
        var a = new FileReader();
        a.onload = (e) => resolve(e.target.result);
        a.readAsDataURL(file);
      });
    },
  },
};
