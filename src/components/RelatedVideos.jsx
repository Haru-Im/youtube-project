//video.id와 연관된 비디오 보여주는 컴포넌트

import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../Context/YoutubeApiContext";
import { VideoCard } from "./VideoCard";

export const RelatedVideos = ({ id }) => {
  const { youtube } = useYoutubeApi();
  // list를 보여줘야 하므로 isLoading, error도 사용
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["related", id], () => youtube.relatedVideos(id), {
    staleTime: 1000 * 60 * 5,
  });
  return (
    // Video.jsx와 유사하므로 복붙
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>ERROR!!!</p>}
      {videos && (
        // grid가 아님
        <ul>
          {videos.map((video) => (
            // type 전달
            <VideoCard key={video.id} video={video} type="list" />
          ))}
        </ul>
      )}
    </>
  );
};
