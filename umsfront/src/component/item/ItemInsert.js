import React, { useEffect, useState } from 'react'
import { InsertFetchFn } from '../etc/NetworkUtils';
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function ItemInsert() {
    const username = localStorage.getItem("LOGINER");
    const ROLE = localStorage.getItem("ROLE");

    const selectList = ["", "상의", "하의", "모자", "가방"];
    const [Selected, setSelected] = useState("");
  
    const handleSelect = (e) => {
      setSelected(e.target.value);
    };


    useEffect(() => {
        if (ROLE === "1" || ROLE === "2"){
            return;
        } alert("잘못된 접근입니다.");
        window.location.href=`/`

    }, [ROLE])

    function onSubmitHandler(e){

        e.preventDefault();

        const formData = new FormData(e.target);
        const itemName = formData.get('itemName');
        const price = formData.get('price');
        const discount = formData.get('discount');
        const ea = formData.get('ea');
        const itemDescribe = formData.get('itemDescribe');
        const salePrice = formData.get('salePrice');
        const itemType = Selected

        if (price < 0) {
          alert("상품 가격은 0보다 커야합니다");
          return;
        }
    
        if (price % 1 !== 0) {
          alert("상품 가격은 정수여야 합니다.");
          return;
        }

        const dto = {
            username,
            itemName,
            price,
            discount,
            salePrice,
            ea,
            itemDescribe,
            itemType
        };

        //InsertFetchFn("item-service", dto, "item/manager");
        
        const url = `http://localhost:8000/item-service/item/manager`
        const options = {
            method: 'POST',
            headers : {
            "Content-Type" : "application/json"
            },
            body: JSON.stringify(dto)
        }

        fetch(url, options)
        .then(res => {
          if (!res) {
            throw new Error("hi")
          }
          return res.json();
        })
        .then(data => {
            if(data.discount === 0){
             window.location.href = `/item-service/detail/${data.id}`;
            }
            window.location.href = `/item-service/detail/${data.id}`;
        })
    }




    return (
      <div>
        <h2>상품 등록</h2>
        <Container>
          <Row className="justify-content-center">
            <Col md={2}>
              <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>등록자</Form.Label>
                  <Col sm={40}>
                    <Form.Control name="username" value={username} readOnly />
                  </Col>
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="itemName">
                  <Form.Label>상품이름</Form.Label>
                  <Col sm={40}>
                    <Form.Control name="itemName" />
                  </Col>
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>가격</Form.Label>
                  <Col sm={40}>
                    <Form.Control name="price" />
                  </Col>
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="discount">
                  <Form.Label>할인률</Form.Label>
                  <Col sm={40}>
                    <Form.Control name="discount" />
                  </Col>
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="ea">
                  <Form.Label>재고</Form.Label>
                  <Col sm={40}>
                    <Form.Control name="ea" />
                  </Col>
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="itemDescribe">
                  <Form.Label>상품정보</Form.Label>
                  <Col sm={40}>
                    <Form.Control name="itemDescribe" />
                  </Col>
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                상품종류: &nbsp;
                <select onChange={handleSelect} value={Selected}>
                  {selectList.map((itemType) => (
                    <option value={itemType} key={itemType}>
                      {itemType}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                <Button variant="dark" type="submit">
                  등록하기
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
  
        <p>상품의 할인된 가격의 소수점 아래자리는 반올림 처리됩니다.</p>
      </div>
    );
  }
  
  export default ItemInsert;