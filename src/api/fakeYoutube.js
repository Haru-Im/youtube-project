import axios from "axios";

// class 만들기
export default class FakeYoutube {
  constructor() {}

  // class 멤버함수이므로 function 적지 않아도 됨
  // 내부적으로 axios 사용해 json을 읽어오도록 만들기
  // popular와 search에서 id가 달랐음
  async search(keyword) {
    // keyword가 있으면 멤버함수인 #키를 붙여 searchByKeyword함수를 전달,
    // keyword가 없다면 mostPopular함수를 호출
    // 함수 앞에 #을 붙이면 프라이빗 함수 -> 클래스 내부에서는 호출 가능, 외부에서는 불가능
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword() {
    // 키워드 검사 안해도 되므로 바로 search.json 사용
    return (
      axios
        .get(`/videos/search.json`)
        .then((res) => res.data.items)
        // 아이템즈를 돌며 id가 있다면 videoId의 문자열로 덮어줌
        // 다른건 유지되고 id만 videoId로 할당됨
        // search든 popular이든 상관없이 동일한 ui 보여주도록
        .then((items) => items.map((e) => ({ ...e, id: e.id.videoId })))
    );
  }

  async #mostPopular() {
    return axios.get(`/videos/popular.json`).then((res) => res.data.items);
  }
}
