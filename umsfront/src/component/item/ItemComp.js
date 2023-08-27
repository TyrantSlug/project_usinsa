import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFn } from "../etc/NetworkUtils";
import { Button, Card, Row } from "react-bootstrap";

function ItemComp(props) {
  const item = props.item;
  const username = useParams().username;

  const bid = item.id;

  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/file-service/image/${bid}`);
        if (response.status === 200) {
          const blob = await response.blob();
          const objectURL = URL.createObjectURL(blob);
          setImageURL(objectURL);
          console.log(imageURL);
        } else {
          throw new Error("Image not found");
        }
      } catch (error) {
        console.log(error);
        setImageURL(null);
      }
    };

    fetchImage();
  }, [bid]);

  function onClickHandler(e) {
    e.preventDefault();

    fetchFn(
      "GET",
      `/api/item-service/list/username/search?username=${username}&pageNum=0`,
      null
    ).then((data) => {
      window.location.href = `/item-service/list/username/${item.username}`;
    });
  }

  return (
    <Row className="justify-content-center">
      <Card className="custom-card">
        {imageURL ? (
          <div className="card-image-wrapper">
            <Card.Img
              className="img"
              variant="top"
              src={imageURL}
              onClick={() => {
                window.location.href = `/item-service/detail/${item.id}`;
              }}
            />
          </div>
        ) : (
          <div className="card-image-wrapper">
            <Card.Img
              className="img"
              variant="top"
              src="/img/a.jpg"
              onClick={() => {
                window.location.href = `/item-service/detail/${item.id}`;
              }}
            />
          </div>
        )}
        <Card.Body>
          <div>
            <Card.Title className="card-title">
              <p>
                <span className="c">등록자: {item.username}</span>
              </p>
              <Link className="b" to={`/item-service/detail/${item.id}`}>
                {" "}
                {item.itemName}
              </Link>
            </Card.Title>
            <Card.Text>
              가격: {item.price}
              <br />
              할인률: {item.discount}
              <br />
              할인가격: {(item.price * (100 - item.discount)) / 100}
            </Card.Text>
            <Button variant="dark" onClick={onClickHandler}>
              {item.username}의 상품 모두 보기
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Row>
  );
}

export default ItemComp;
