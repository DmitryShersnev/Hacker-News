import "./App.css";
import { Route, Routes } from "react-router";
import HackerNews from "./pages/HackerNews";
import NewsPage from "./pages/NewsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HackerNews />} />
        <Route path="/news/:id" element={<NewsPage />} />
      </Routes>
    </>
  );
}

export default App;
