import { useNavigate } from "react-router-dom";
import { formatAgo } from "../util/date";

export const VideoCard = ({ video, type }) => {
  const { thumbnails, title, publishedAt, channelTitle } = video.snippet;
  const navigate = useNavigate();

  // 비디오 정보를 가져오는 것이 아닌 이미 있으므로, object에 정보를 함께 전달
  // 라우터에 부가적인 객체 전달할 때는 두 번째 인자에 객체를 전달하면 됨
  // state에 videoId라는 key로 video 객체 전달 (생략)
  const handleClick = () => {
    return navigate(`/videos/watch/${video.id}`, { state: { video } });
  };

  // 전달받은 type이 list라면
  const isList = type === "list";

  return (
    <li className={isList ? "flex gap-1 m-2" : ""} onClick={handleClick}>
      {/* 작았을 때 이미지가 꽉 채우도록 */}
      {/* w-full : 지정된 부모컨테이너 꽉 채우도록 */}
      <img
        className={isList ? "w-60 mr-2" : "w-full"}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div>
        {/* line 두 줄 넘지 않도록 */}
        <p className="font-semibold my-2 line-clamp-2">{title}</p>
        <p className="text-sm opacity-80">{channelTitle}</p>
        <p className="text-sm opacity-80">{formatAgo(publishedAt, "ko")}</p>
      </div>
    </li>
  );
};

// 세 줄을 넘지 않도록 -> line-clamp 플러그인 설치해야함
// 설치 후 tailwind.config에 플러그인 추가 -> line-clamp-2
