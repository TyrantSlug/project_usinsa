import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchFn } from '../etc/NetworkUtils';
import { Button, Card, Row } from 'react-bootstrap';

function ItemComp(props) {
  const item = props.item;
  const username = useParams().username;

  const bid = item.id;
  const [image, setImage] = useState(null);

  useEffect(() => {
    const url = `http://localhost:8000/file-service/image/${bid}`;
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(url, options)
      .then((response) => {
        
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("이미지를 찾을 수 없습니다.");
        }
      })
      .then(data => {
        setImage(data.result);
      })
      .catch(error => {
        setImage(null);
      });
  }, [bid]);

  const b = image ? image.dbsaveFilename : null;

  function onClickHandler(e){
    e.preventDefault();

    fetchFn("GET", `http://localhost:8000/item-service/list/username/search?username=${username}&pageNum=0`, null)
      .then(data => {
        window.location.href = `/item-service/list/username/${item.username}`;
      });
  }

  return (
    <Row className="justify-content-center">
      <Card className="custom-card">
        {image !== null ? (
          <div className="card-image-wrapper">
            <Card.Img className='img' variant="top" src={`/img/${b}`} onClick={() => {window.location.href = `/item-service/detail/${item.id}`}}/>
          </div>
        ) : (
          <div className="card-image-wrapper">
            <Card.Img className='img' variant="top" src="/img/a.jpg" onClick={() => {window.location.href = `/item-service/detail/${item.id}`}} />
          </div>
        )}
        <Card.Body>
          <div>
            <Card.Title className="card-title">
              <p>
                <span className='c'>등록자: {item.username}</span>
              </p>
              <Link className='b' to={`/item-service/detail/${item.id}`}> {item.itemName}</Link>
            </Card.Title>
            <Card.Text>
              가격: {item.price}<br />
              할인률: {item.discount}<br />
              할인가격: {item.price*(100 - item.discount)/100}
            </Card.Text>
            <Button variant="dark"  onClick={onClickHandler}>
              {item.username}의 상품 모두 보기
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Row>
  );
}

export default ItemComp;
