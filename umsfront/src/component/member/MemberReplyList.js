import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFn } from "../etc/NetworkUtils";
import MemberReplyComp from "./MemberReplyComp";
import MemberReplyPaging from "./MemberReplyPaging";

function MemberReplyList() {
  const ROLE = localStorage.getItem("ROLE");
  const username = useParams().username;
  const LOGINER = localStorage.getItem("LOGINER");
  const [pageList, setPageList] = useState([]);

  useEffect(
    (pageNum) => {
      fetchFn(
        "GET",
        `http://localhost:8000/reply-service/replys/username?username=${username}&pageNum=0`,
        null
      ).then((data) => {
        if (LOGINER == username || ROLE == 2) {
          setPageList(data.result.content);
        } else {
          alert("권한없음");
          window.location.href = `/`;
        }
      });
    },
    [username]
  );

  return (
    <div>
      <h2>댓글 목록</h2>

      {pageList !== null &&
        pageList.length > 0 &&
        pageList.map((reply) => {
          return <MemberReplyComp key={reply.id} reply={reply} />;
        })}

      <MemberReplyPaging username={username} setFn={setPageList} />
      <Link className="b" to={`/`} style={{ fontSize: "30px" }}>
        돌아가기
      </Link>
      <br />
    </div>
  );
}

export default MemberReplyList;