// Youtube 클래스는 apiClient를 외부(YoutubeApiContext)로부터 주입받아 호출하는 클래스
// apiClient에는 search와 videos라는 두 가지 함수가 있구나 예측 가능
// search는 공개함수, #붙은 것은 비공개함수
// #searchByKeyword, #mostPopular 메서드 모두 Promise를 반환
// #search..는 Youtube API의 search 엔드포인트를 호출해 정보를 가져와 가공, promise 반환
// #most..는 Youtube API의 videos 엔드포인트를 호출해 promise를 반환
// 즉 Youtube 클래스는 Youtube API를 호출하고 keyword에 해당하는 정보를 가져올 수 있음

export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  // id를 주면 이미지 URL 받아오기
  async channelImageURL(id) {
    return this.apiClient
      .channels({ params: { part: "snippet", id } })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  async relatedVideos(id) {
    return (
      this.apiClient
        .search({
          params: {
            part: "snippet",
            maxResults: 25,
            type: "video",
            relatedToVideoId: id,
          },
        })
        // id가 객체로 되어있어서 매핑작업
        .then((res) => res.data.items.map((e) => ({ ...e, id: e.id.videoId })))
    );
  }

  async #searchByKeyword(keyword) {
    return (
      this.apiClient
        // search는 비동기 함수 즉 promise를 리턴하는 함수 => then을 이용해 받아온 데이터를 처리
        .search({
          params: {
            part: "snippet",
            maxResults: 25,
            type: "video",
            q: keyword,
          },
        })
        .then((res) => res.data.items.map((e) => ({ ...e, id: e.id.videoId })))
    );
  }

  async #mostPopular(keyword) {
    return this.apiClient
      .videos({
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
