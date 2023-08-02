import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFn } from "../etc/NetworkUtils";
import MemberOrderPaging from "./MemberOrderPaging";
import MemberOrderComp from "./MemberOrderComp";

function MemberOrderList() {
  const ROLE = localStorage.getItem("ROLE");
  const username = useParams().username;
  const LOGINER = localStorage.getItem("LOGINER");
  const [pageList, setPageList] = useState([]);

  useEffect(
    (pageNum) => {
      fetchFn(
        "GET",
        `http://localhost:8000/order-service/orders/username?username=${username}&pageNum=0`,
        null
      ).then((data) => {
        if (LOGINER == username || ROLE == 2) {
          setPageList(data.result.content);
        } else {
          alert("권한없음");
          window.location.href = `/`;
        }
      });
    }
    , [username]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '40px' }}>주문 목록</h2>

      {
        pageList.length>0  &&
        pageList.map((order) => {
          return <MemberOrderComp key={order.id} order={order} />
        })
      }

      <MemberOrderPaging username={username} setFn={setPageList} />
      <Link className="b" to={`/`} style={{ fontSize: "30px" }}>
        돌아가기
      </Link>
      <br />
      </div>
    </div>
  );
}

export default MemberOrderList;