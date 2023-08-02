import React, { useEffect, useState } from 'react'
import { fetchFn } from '../etc/NetworkUtils';
import { Pagination } from 'react-bootstrap';

function MemberOrderPaging(props) {
  const [pageStart] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const username = props.username;

  function onClickHandler(pageNum) {
    fetchFn(
      "GET",
      `http://localhost:8000/order-service/orders/username?username=${username}&pageNum=${
        pageNum - 1
      }`
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

  function getPageNumInfo() {
    fetchFn(
      "GET",
      `http://localhost:8000/order-service/orders/username?username=${username}&pageNum=0`
    ).then((data) => {
      setTotalPages(data.result.totalPages);
    });
  }
  useEffect(getPageNumInfo, [username]);

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

export default MemberOrderPaging