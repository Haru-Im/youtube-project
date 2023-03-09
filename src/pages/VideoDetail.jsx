// 영상 플레이 : iFrame 사용하면 됨 -> 예제 복사

import { useLocation } from "react-router-dom";
import { ChannelInfo } from "../components/ChannelInfo";
import { RelatedVideos } from "../components/RelatedVideos";

export const VideoDetail = () => {
  const {
    state: { video },
  } = useLocation();
  const { title, channelId, channelTitle, description } = video.snippet;
  console.log(video);

  return (
    // 화면의 넓이가 lg 이상인 경우에는 flex를 row방향으로
    <section className="flex flex-col lg:flex-row">
      <article className="basis-4/6">
        <iframe
          // title 안 쓰면 오류나길래..
          title={title}
          id="player"
          type="text/html"
          // width: 부모컨테이너 가득 채우도록
          width="100%"
          height="640"
          // 비디오 url : embed 뒤에 원하는 id 삽입하면 됨
          src={`http://www.youtube.com/embed/${video.id}`}
          frameborder="0"
        />
        <div className="p-8">
          <h2 className="text-xl font-bold">{title}</h2>
          {/* 채널 id로 채널 썸네일 이미지 Api 요청해 받아오는 컴포넌트 */}
          <ChannelInfo id={channelId} name={channelTitle} />
          {/* 여백, 공백 등이 잘 나오도록 pre태그 */}
          {/* pre너비 너무 넓아서 컨테이너 맞춰서 래핑되게 white..*/}
          <pre className="whitespace-pre-wrap">{description}</pre>
        </div>
      </article>

      {/* 영상의 연관 비디오 보여주는 컴포넌트 */}
      <section className="basis-2/6">
        <RelatedVideos id={video.id} />
      </section>
    </section>
  );
};
