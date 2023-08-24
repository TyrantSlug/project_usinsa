import React, { useEffect, useState } from "react";
import { fetchFn } from "../etc/NetworkUtils";
import { Pagination } from "react-bootstrap";

function ReplyListPaging(props) {
  const [pageStart] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const bid = props.bid;

  // 페이징 작업 안헀음.
  function onClickHandler(pageNum) {
    fetchFn(
      "GET",
      `/api/reply-service/replys/bid/${bid}?pageNum=${pageNum - 1}`
    ).then((data) => {
      props.setFn(data.result.content);
      setCurrentPage(data.result.number);
      setTotalPages(data.result.totalPages);
    });
  }

  let pagingArr = [];
  if (totalPages !== undefined) {
    for (let i = pageStart; i < pageStart + 10 && i <= totalPages; i++) {
      pagingArr.push(i);
    }
  }

  // 페이징 작업 안했음.
  function getPageNumInfo() {
    fetchFn("GET", `/api/reply-service/replys/bid/${bid}?pageNum=0`).then(
      (data) => {
        setTotalPages(data.result.totalPages);
      }
    );
  }
  useEffect(getPageNumInfo, [bid]);

  return (
    <div className="d-flex justify-content-center">
      {totalPages !== undefined && (
        <Pagination>
          <Pagination.Prev
            disabled={currentPage === 0}
            onClick={() => onClickHandler(currentPage)}
          />

          {pagingArr.map((pageNum) => (
            <Pagination.Item
              key={pageNum}
              active={currentPage + 1 === pageNum}
              onClick={() => onClickHandler(pageNum)}
            >
              {pageNum}
            </Pagination.Item>
          ))}

          <Pagination.Next
            disabled={currentPage + 1 === totalPages}
            onClick={() => onClickHandler(currentPage + 2)}
          />
        </Pagination>
      )}
    </div>
  );
}

export default ReplyListPaging;
