import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Videos } from "./pages/Videos";
import { VideoDetail } from "./pages/VideoDetail";

//router 정의는 app.js애서 해도 되고 index.js에서 해도 됨
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      //index 최상위라면 보여주는 element
      { index: true, element: <Videos /> },
      { path: "/videos", element: <Videos /> },
      //videos다음 특정 키워드파람 있는 경우 검색결과의 목록 보여줄것
      { path: "/videos/:keyword", element: <Videos /> },
      { path: "/videos/watch/:videoId", element: <VideoDetail /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* App.js가 아닌 router에게 경로 양보 */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
