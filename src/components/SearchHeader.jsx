// input에서 submit event가 발생하면(=사용자가 검색한 경우) /videos/:keyword 경로로 이동하게 되고
// useParams()을 이용해 keyword를 저장하고 있음
// 뒤로가기 시 입력폼에 이전 검색결과를 띄워주기 위해 useEffect와 setText를 활용, keyword가 없다면 빈 문자열 띄워주기
// header 태그 사용, 'react-router-dom'에서 제공하는 Link 사용해 클릭 시 이동할 수 있도록
// tailwind를 사용해 css 적용

import { useEffect, useState } from "react";
import { BsYoutube, BsSearch } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";

export const SearchHeader = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/videos/${text}`);
  };

  useEffect(() => {
    setText(keyword || "");
  }, [keyword]);
  return (
    <header className="w-full flex p-4 text-2xl border-b border-zinc-600 mb-4">
      <Link to="/" className="flex items-center">
        {/* tailwind.config에서 원하는 색 지정 가능 */}
        <BsYoutube className="text-4xl text-brand " />
        <h1 className="font-bold ml-2 text-3xl">Sexytube</h1>
      </Link>
      {/* 넓이 꽉 채우고, flex, 넓어지면 항상 중간에 있도록 */}
      <form className="w-full flex justify-center" onSubmit={handleSubmit}>
        {/* 너비는 7/12정도, 패딩, 포커스되면 outline 생기지 않도록 */}
        <input
          className="w-7/12 p-2 outline-none bg-black text-gray-50"
          type="text"
          placeholder="Search..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* 양쪽으로 패딩 4 */}
        <button className="bg-zinc-600 px-4">
          <BsSearch />
        </button>
      </form>
    </header>
  );
};
