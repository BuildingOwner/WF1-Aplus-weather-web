import "./css/App.css";
import "./css/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useCurrentLocation from "./hooks/useCurrentLocation";
import Expention from "./components/exponsion/expension";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/MainPage";
import WeekPage from "./components/week/week-page";
import AirMain from "./components/airPollution/AirMain";
import NewsMain from "./components/news/NewsMain";
import DateTime from "./components/Main/DateTime";
function App() {
  const { loaded, address, error } = useCurrentLocation();

  if (!loaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="center-content">
          <DateTime />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route
              path="/week/*"
              element={<WeekPage location={address} />}
            ></Route>
            <Route path="/airPollution/*" element={<AirMain />}></Route>
            <Route path="/news/*" element={<NewsMain />}></Route>
            {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
            {/* <Route path="*" element={<NotFound />}></Route> */}
          </Routes>
        </div>
        <Expention location={address} />
      </BrowserRouter>
    </div>
  );
}

export default App;
