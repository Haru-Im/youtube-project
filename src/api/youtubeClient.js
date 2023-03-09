// Youtube API를 사용해 정보를 가져오기 위한 클라이언트 코드(서버와 통신해 데이터 주고받는 코드)
// 인스턴스 : 클래스를 통해 생성된 객체. 클래스는 객체를 생성하기 위한 탬플릿, 생성된 객체가 인스턴스
// YoutubeClient 클래스는 axios 라이브러리를 통해 Youtube API와 통신하는 데 필요한 인스턴스를 생성함
// `axios` 라이브러리의 create()를 호출해 인스턴스(=this.httpClient)를 생성하며 baseURL, params 속성을 설정
// 이렇게 생성된 this.httpClient 인스턴스는 search()와 videos() 메서드에서 get() 메서드를 호출할 때 사용
// get() 메서드는 axios 라이브러리에서 제공하는 HTTP GET 요청 메서드
// (get은 YOUTUBE API에 요청을 보내며 첫 번째 매개변수로 요청보낼 URL을, 두 번째로 요청에 대한 구체적 설명이 있는 객체를 전달)
// search()와 videos() 메서드에서 전달받은 params 객체는 get() 메서드에 전달되어 HTTP 요청을 보냄
// 반환된 데이터를 Promise로 처리함
// search()와 videos() 앞에 async를 붙임으로써 메서드를 선언하여 함수 실행이 완료될 때까지 다른 작업을 처리할 수 있도록 만듦
// 만약 await을 사용하면 promise가 반환하는 값을 받을 때까지 실행을 일시 중지하고 이후 코드를 실행할 것임

import axios from "axios";

export default class YoutubeClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(params) {
    return this.httpClient.get("search", params);
  }

  async videos(params) {
    return this.httpClient.get("videos", params);
  }

  async channels(params) {
    return this.httpClient.get("channels", params);
  }
}
