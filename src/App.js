import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { SearchHeader } from "./components/SearchHeader";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      {/* 자식 요소 추가하기 */}
      <SearchHeader />
      {/* 네트워크 통신 일어나는 Outlet에 우산 씌워주기 */}
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default App;
