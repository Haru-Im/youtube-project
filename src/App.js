// 두 개의 우산 : YoutubeApiProvider, QueryClientProvider
// Outlet에서만 네트워크 통신 일어나므로 SearchHeader에는 우산 씌울 필요 없음

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { SearchHeader } from "./components/SearchHeader";
import { YoutubeApiProvider } from "./Context/YoutubeApiContext";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <SearchHeader />
      {/* ApiProvider 우산 씌워주기 */}
      <YoutubeApiProvider>
        {/* 네트워크 통신 일어나는 Outlet에 우산 씌워주기 */}
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </>
  );
}

export default App;
