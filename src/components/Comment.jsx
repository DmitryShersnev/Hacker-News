import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const url = import.meta.env.VITE_API_URL;

function Comment({ id, refreshKey }) {
  const [comment, setComment] = useState(null);
  const [showReplies, setShowReplies] = useState(false);
  console.log("Загружаю комментарий:", id, "refreshKey:", refreshKey);
  useEffect(() => {
    fetch(`${url}/item/${id}.json`)
      .then((response) => response.json())
      .then((data) => setComment(data));
  }, [id, refreshKey]);

  if (!comment) return <p>Загрузка комментария...</p>;

  return (
    <div
      style={{
        marginLeft: 20,
        marginRight: 20,

        borderRadius: 8,

        backgroundColor: "#f1f5f9",
      }}
    >
      <p style={{ textDecoration: "underline" }}>by {comment.by}</p>

      {/* <p>{comment.text}</p> */}
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(comment.text ?? ""),
        }}
      />

      {comment.kids?.length > 0 && (
        <>
          <button
            style={{ backgroundColor: "gray" }}
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? "Скрыть ответы" : `Ответы (${comment.kids.length})`}
          </button>

          {showReplies &&
            comment.kids.map((replyId) => (
              <Comment key={replyId} id={replyId} refreshKey={refreshKey} />
            ))}
        </>
      )}
    </div>
  );
}

export default Comment;
