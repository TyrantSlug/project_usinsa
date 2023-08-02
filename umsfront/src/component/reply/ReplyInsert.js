import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InsertFetchFn, fetchFn } from "../etc/NetworkUtils";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

function ReplyInsert() {
  const username = localStorage.getItem("LOGINER");
  const bid = useParams().id;
  const id = useParams().id;
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchFn(
      "GET",
      `http://localhost:8000/item-service/item/id/${id}`,
      null
    ).then((data) => {
      setItem(data);
    });
  }, [id]);

  function onSubmitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const dto = {
      content: formData.get("content"),
      username,
      bid,
      productName: item.itemName,
    };

    InsertFetchFn("reply-service", dto, "user/replys");
  }

  return (
    <div>
      <form action="#" onSubmit={onSubmitHandler}>
        <div
          style={{ display: "flex", justifyContent: "center", height: "10%" }}
        >
          <div style={{ width: "600px", display: "flex" }}>
            <div style={{ flexBasis: "80%" }}>
              <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <Form.Control
                  name="content"
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{
                    height: "100px",
                    marginTop: "10px",
                    textAlign: "center",
                  }}
                />
              </FloatingLabel>
            </div>
            <div
              style={{
                flexBasis: "15%",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              <Button
                type="submit"
                variant="dark"
                style={{ height: "100px", width: "100px" }}
              >
                작성하기
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReplyInsert;