// router 정의는 app.js에서 해도 되지만 index.js에서 하겠음
// children은 outlet 안에서 보여질 것들
// 어플리케이션이 router로 시작할 수 있도록 RouterProvider에 경로를 양보해 줌

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Videos } from "./pages/Videos";
import { VideoDetail } from "./pages/VideoDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      //index 최상위라면 보여주는 element
      { index: true, element: <Videos /> },
      { path: "/videos", element: <Videos /> },
      //videos 경로에서 특정 파람을 keyword라고 명시하고, keyword에 맞는 검색 결과를 보여줄 것
      { path: "/videos/:keyword", element: <Videos /> },
      { path: "/videos/watch/:videoId", element: <VideoDetail /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
