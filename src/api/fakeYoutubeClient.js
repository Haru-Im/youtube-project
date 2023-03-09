// search와 videos함수를 가지고 있는 FakeYoutubeClient 클래스
// 내부적으로는 무조건 정해진 mock데이터 읽어옴
// 따라서 constructor 필요 없고 keyword도 필요 없음

import axios from "axios";

export default class FakeYoutubeClient {
  // params에 relatedToVideoId가 있다면 related.json 사용하도록 만들기
  async search(params) {
    const isRelated = params.relatedToVideoId;
    return isRelated
      ? axios.get("/videos/related.json")
      : axios.get("/videos/search.json");
  }
  // return axios.get(`videos/${isRelated ? 'related' : 'search'}.json`)

  async videos() {
    return axios.get("videos/popular.json");
  }

  async channels() {
    return axios.get("videos/channel.json");
  }
}
