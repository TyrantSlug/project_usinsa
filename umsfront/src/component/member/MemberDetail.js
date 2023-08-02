import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFn } from "../etc/NetworkUtils";
import { Button, Card } from "react-bootstrap";
import moment from "moment";
import "../etc/background.css";

function MemberDetail() {
  const username = useParams().username;
  const [member, setMember] = useState(null);
  const LOGINER = localStorage.getItem("LOGINER");
  const ROLE = localStorage.getItem("ROLE");

  // ***findByUsername
  useEffect(() => {
    fetchFn(
      "GET",
      `http://localhost:8000/member-service/members/username/${username}`,
      null
    ).then((data) => {
      if (ROLE === "2" || LOGINER === username) {
        setMember(data);
      } else {
        window.location.href = `/`;
      }
    });
  }, [username, LOGINER, ROLE]);

  function onClickHandler1(){
    window.location.href = `/member-service/orderList/${LOGINER}`
  }

  function onClickHandler2(){
    window.location.href = `/member-service/memberReply/${username}`
  }

  function onClickHandler3(){
    window.location.href = `/member-service/updateName/${username}`
  }

  function onClickHandler4(){
    window.location.href = `/member-service/delete/${username}`
  }

  return (
    <div className="member-detail-container">
      <div className="member-detail-background">
        <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <h2>회원 정보 자세히 보기</h2>
        {member !== null && (
          <Card className="custom-card border-dark" style={{ width: "500px" }}>
            <Card.Body>
              <Card.Title>아이디: {member.username}</Card.Title>
              <Card.Subtitle className="mb-2 ">
                이름: {member.name}
              </Card.Subtitle>
              <Card.Text>핸드폰 번호: {member.phoneNumber}</Card.Text>
              <Card.Text>주소: {member.address}</Card.Text>
              <Card.Text>키: {member.height}</Card.Text>
              <Card.Text>몸무게: {member.weight}</Card.Text>
              <Card.Text>
                가입일: {moment(member.createDate).format("YYYY-MM-DD")}
              </Card.Text>
              <Card.Text>
                수정일: {moment(member.updateDate).format("YYYY-MM-DD")}
              </Card.Text>
              <Button style={{ marginBottom: "10px" }} variant="dark" onClick={onClickHandler1}>
                나의 주문내역
              </Button>
              <br />
              <Button style={{ marginBottom: "10px" }} variant="dark" onClick={onClickHandler2}>
               나의 댓글내역
              </Button>
              <br />
              <Button variant="dark" onClick={onClickHandler3}>
               수정
              </Button>
              &nbsp;
              <Button variant="dark" onClick={onClickHandler4}>
                삭제
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDetail;