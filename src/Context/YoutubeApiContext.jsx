// Youtube API를 사용하기 위한 Context와 Provider를 구현한 코드
// 이를 통해 애플리케이션 전역에서 Youtube API에 접근할 수 있음
// createContext로 context를 생성 => YoutubeApiContext.
// YoutubeApiContext : Youtube API 클라이언트 객체(=youtube 인스턴스)를 담고 있음
// client 변수에 FakeYoutubeClient 혹은 YoutubeClient 호출값을 저장하고 Youtube 클래스에 전달
// Youtube 클래스는 전달받은 client 정보로 promise를 반환함
// Provider 우산 안에서 제공하는 value는 youtube 인스턴스
// useYoutubeApi훅을 생성해 useContext를 사용할 수 있도록 함

import { createContext, useContext } from "react";
import Youtube from "../api/youtube";
import YoutubeClient from "../api/youtubeClient";

export const YoutubeApiContext = createContext({ youtube: null });

// const client = new FakeYoutubeClient();
const client = new YoutubeClient();
const youtube = new Youtube(client);

export const YoutubeApiProvider = ({ children }) => {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
};

export const useYoutubeApi = () => {
  return useContext(YoutubeApiContext);
};
