import moment from "moment";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { DeleteFetchFn, DeleteFetchFn2 } from "../etc/NetworkUtils";
import { useParams } from "react-router-dom";

function MemberReplyComp(props) {
  const LOGINER = localStorage.getItem("LOGINER");
  const reply = props.reply;
  const bid = useParams().id;

  function onClickReplyUpdateFn(e) {
    e.preventDefault();
    window.location.href = `/reply-service/update/${reply.id}`;
  }

  function onClickReplyDeleteFn(e) {
    e.preventDefault();

    let dto = {
      id: reply.id,
      bid,
    };

    let replyDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (replyDelete) {
      DeleteFetchFn2("reply-service", dto, "user");
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "0%",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ flexBasis: "80%" }}>
            <Card style={{ width: "600px" }}>
              <Card.Body>
                <Card.Title>상품 이름: {reply.productName}</Card.Title>
                <Card.Text>
                  작성일:{" "}
                  {moment(reply.createDate).format("YYYY-MM-DD HH:mm:ss")} |
                  수정일:{" "}
                  {moment(reply.updateDate).format("YYYY-MM-DD HH:mm:ss")}
                </Card.Text>
                <Card.Title>{reply.content}</Card.Title>
                {LOGINER === reply.username && (
                  <div>
                    <Button
                      variant="dark"
                      style={{ float: "right", marginLeft: "10px" }}
                      onClick={onClickReplyDeleteFn}
                    >
                      삭제하기
                    </Button>
                    <Button
                      variant="dark"
                      style={{ float: "right" }}
                      onClick={onClickReplyUpdateFn}
                    >
                      수정하기
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberReplyComp;
