// Outlet안에 들어가는 컴포넌트이므로, 우산의 데이터를 받아서 쓸 수 있음
// keyword와 youtube 인스턴스를 객체로 받아옴
// keyword가 있다면 youtube 인스턴스에 있는 search를 이용해 videos에 할당
// keyword가 없다면 mostPoopular 호출해 mostPopular 데이터가 videos에 할당
// UI에는 로딩, 에러, 데이터를 매핑해 VideoCard로 만듦
// useQuery : key와 데이터 어떻게 가져올 지 fn, key의 keyword가 바뀔 때마다 새로운 검색 결과 가져옴
// useYoutubeApi() 훅을 통해 가져온 youtube API로 keyword를 검색어로 검색을 수행

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { VideoCard } from "../components/VideoCard";
import { useYoutubeApi } from "../Context/YoutubeApiContext";

export const Videos = () => {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos", keyword], () => youtube.search(keyword), {
    staleTime: 1000 * 60 * 1,
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>ERROR!!!</p>}
      {videos && (
        // 화면 grid로 만들기, 분기점 : sm, lg, xl, 2xl
        // gap을 줘서 조금 띄워놓기
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} type="null" />
          ))}
        </ul>
      )}
    </>
  );
};
