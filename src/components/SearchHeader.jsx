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
  // keyword가 변경될 때마다 text를 변경해줄 것 (뒤로가기 했을때 이전것이 나오도록)
  // keyword 가 있다면 키워드를, 없다면 빈 문자열을
  useEffect(() => {
    setText(keyword || "");
  }, [keyword]);
  return (
    // header flex로 만들어서 일렬로 나오도록
    // padding, text size, border-bottom, margin bottom
    <header className="w-full flex p-4 text-2xl border-b border-zinc-600 mb-4">
      {/* 일렬로 만들어주기 , 중간정렬 */}
      <Link to="/" className="flex items-center">
        {/* tailwind.config에서 원하는 색 지정 가능 */}
        <BsYoutube className="text-4xl text-brand " />
        {/* margin-left */}
        <h1 className="font-bold ml-2 text-3xl">Sexytube</h1>
      </Link>
      {/* 넓이 꽉 채우고, flex, 넓어지면 항상 중간에 있도록 */}
      <form className="w-full flex justify-center" onSubmit={handleSubmit}>
        {/* 너비는 7/12정도, 패딩, 포커스되면 outline생기지 않도록 */}
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
