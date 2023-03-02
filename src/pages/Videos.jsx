import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FakeYoutube from "../api/fakeYoutube";
import Youtube from "../api/youtube";
import { VideoCard } from "../components/VideoCard";

export const Videos = () => {
  // useParam 사용, 키워드 가져오기
  const { keyword } = useParams();

  // useQuery 사용 (1: cacheKey, 2:어떻게 가져올지 fn)
  // 관심있는 것은 로딩상태, 에러, 데이터(비디오에 관한)
  // 하나의 키만 사용하는게 아닌 키들의 연속 -> 전체 비디오즈 키 안에 keyword별로 캐시되도록
  // async(비동기함수), 데이터는 fetch로 처음에는 나이브한 방식으로 구현
  // 가지고 오고자 하는 url은 videos 경로 안의 json파일 (실제 API 아닌 mock data)
  // keyword 있다면 search.json, 없다면 popular.json
  // fetch하면 response 받아와 res.json으로 변환해준 다음
  // 실제 데이터가 오면 데이터 중에서도 item을 반환하도록

  const {
    isLoading,
    error,
    data: videos,
    // async 부분을 따로 빼두기
    // 두 번째 콜백함수는 유튜브에서 제공하는 search라는 api함수를 통해
    // 여기에 keyword를 전달해주면 됨
  } = useQuery(["videos", keyword], () => {
    // 만들어둔 class 사용
    // mockData 사용하고 싶으면 FakeYoutube, 그렇지 않으면 Youtube
    const youtube = new Youtube();
    return youtube.search(keyword);
  });

  //keyword 있다면 검색결과를, 없다면 hottrend 목록을 보여주기
  return (
    <>
      <div>{keyword ? `${keyword}` : "hotTrend"} </div>
      {/* 로딩이라면 로딩이라고 보여주고 */}
      {/* 에러 발생했다면 에러문구를 보여주기 */}
      {/* videos가 있다면 ul태그 안에서 map을 사용해 데이터를 VideoCard 컴포넌트 안에 넣어줌 */}
      {/* li의 자식 요소는 key가 있어야 하므로 배열의 id를 보내줄건데, */}
      {/* popular와 search의 id가 조금 다르게 생김 -> search는 객체 안의 videoId */}
      {/* 우선 키를 popular에 맞춰서 */}
      {/* prop으로 필요한 데이터 전달해주기 */}

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {videos && (
        <ul>
          {/* 자바스크립트 코드이므로 중괄호 안에 써주기 */}
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
};
