import { useDispatch } from "react-redux";

import NewsList from "../components/NewsList";
import { fetchNews } from "../api/fetchNews";

function HackerNews() {
  const dispatch = useDispatch();
  return (
    <>
      <h1>Hacker News</h1>
      <button
        onClick={() => {
          dispatch(fetchNews());
        }}
      >
        Обновить список
      </button>
      <hr></hr>
      <NewsList />
    </>
  );
}

export default HackerNews;
