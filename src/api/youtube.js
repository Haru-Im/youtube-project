import axios from "axios";

export default class Youtube {
  // 기본적인 url과 사용하는 key 설정
  constructor() {
    // httpCliient에 axios 통신에 필요한 기본 세팅을 할당
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      // 네트워크 키는 코드상에 바로 적으면 보안에 취약함
      // 제일 상위폴더에 .env파일을 만들기
      // .gitignore에서 #misc에 .env추가해 commit되지 않도록 세팅하기
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    return this.httpClient
      .get("search", {
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((e) => ({ ...e, id: e.id.videoId })));
  }

  async #mostPopular(keyword) {
    return this.httpClient
      .get("videos", {
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
          q: keyword,
        },
      })
      .then((res) => res.data.items);
  }
}
