import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { fetchNews } from "../api/fetchNews";
const NewsList = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const loading = useSelector((state) => state.news.loading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNews());
    console.log(news);
  }, []);

  const handleClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <>
      {loading ? (
        <p>Идёт загрузка...</p>
      ) : (
        <>
          {news.map((item, index) => (
            <div
              key={item.id}
              className="news-item"
              onClick={() => handleClick(item.id)}
            >
              <h3>
                {index + 1}. {item.title}
              </h3>
              <p>
                {item.score} points by {item.by}{" "}
                {new Date(item.time * 1000).toLocaleString("ru-RU")},{" "}
                {item.kids?.length ?? 0} comments
              </p>
              <hr></hr>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default NewsList;
