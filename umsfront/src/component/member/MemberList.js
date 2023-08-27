import React, { useEffect, useState } from "react";
import { fetchFn } from "../etc/NetworkUtils";
import MemberComp from "./MemberComp";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

function MemberList() {
  const ROLE = localStorage.getItem("ROLE");
  const [members, setMembers] = useState([]);

  // ***findAll
  useEffect(() => {
    fetchFn("GET", "/api/member-service/members/all", null).then((data) => {
      if (ROLE === "2") {
        setMembers(data.result);
      } else {
        alert("권한 없음");
        window.location.href = `/`;
      }
    });
  }, [ROLE]);

  return (
    <div className="MemberList">
      {ROLE === "2" && (
        <>
          <h2>회원 목록</h2>
          <Link className="b" to={`/`} style={{ fontSize: "25px" }}>
            돌아가기
          </Link>
        </>
      )}
      {members.length > 0 &&
        members.map((member) => (
          <ListGroup key={member.id} horizontal="md" className="my-2">
            <ListGroup.Item>
              <MemberComp key={member.id} member={member} />
            </ListGroup.Item>
            <ListGroup.Item>{`닉네임: ${member.name}`}</ListGroup.Item>
            {/* Add other member details here */}
          </ListGroup>
        ))}
    </div>
  );
}

export default MemberList;
