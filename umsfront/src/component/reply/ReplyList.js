import React, { useEffect, useState } from "react";
import ReplyComp from "./ReplyComp";
import { useParams } from "react-router-dom";
import { fetchFn } from "../etc/NetworkUtils";
import ReplyListPaging from "./ReplyListPaging";

function ReplyList() {
  const bid = useParams().id;
  const [pageList, setPageList] = useState([]);

  // ***listByBid
  useEffect(
    (pageNum) => {
      fetchFn(
        "GET",
        `/api/reply-service/replys/bid/${bid}?pageNum=0`,
        null
      ).then((data) => {
        setPageList(data.result.content);
      });
    },
    [bid]
  );

  return (
    <div>
      ReplyList
      {pageList !== null &&
        pageList.length > 0 &&
        pageList.map((reply) => {
          return <ReplyComp key={reply.id} reply={reply} />;
        })}
      <ReplyListPaging bid={bid} setFn={setPageList} />
    </div>
  );
}

export default ReplyList;
