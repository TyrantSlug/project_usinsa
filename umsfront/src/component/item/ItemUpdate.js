import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFn } from '../etc/NetworkUtils';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';

function ItemUpdate() {

  const id = useParams().id;
  const [item, setItem] = useState(null);

  const selectList = ["", "상의", "하의", "모자", "가방"];
  const [Selected, setSelected] = useState("item.itemType");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  // *** findById
  useEffect(() => {
    fetchFn("GET", `http://localhost:8000/item-service/item/id/${id}`, null)
      .then(data => {
        setItem(data);
      })
  }, [id]);

  function onInputHandler(e){
        
    let val = e.target.value;
    let newItem = {...item, [e.target.name]:val};
    setItem(newItem);
  }


  function onSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemName = formData.get("itemName");
    const price = formData.get("price");
    const discount = formData.get("discount");
    const ea = formData.get("ea");
    const itemDescribe = formData.get("itemDescribe");
    const itemType = Selected

    const dto = {
      id,
      itemName,
      price,
      discount,
      ea,
      itemDescribe,
      itemType
    };
    
    // *** update
    fetchFn("PUT", "http://localhost:8000/item-service/item/manager/update", dto)
      .then(data => {
        window.location.href = `/item-service/detail/${data.id}`;
      })
  }
  return (
    <div>
      <h2>상품 수정</h2>
      {item !== null &&
    <Container>
    <Row className="justify-content-center">
      <Col md={2}>
    <Form onSubmit={onSubmitHandler}>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>상품이름</Form.Label>
        <Col sm={40}> 
        <Form.Control name="itemName" value={item.itemName} onInput={onInputHandler} />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>가격</Form.Label>
        <Col sm={40}> 
        <Form.Control name="price" value={item.price} onInput={onInputHandler} />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>할인률</Form.Label>
        <Col sm={40}> 
        <Form.Control name="discount" value={item.discount} onInput={onInputHandler} />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>재고</Form.Label>
        <Col sm={40}> 
        <Form.Control name="ea" value={item.ea} onInput={onInputHandler} />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>상품정보</Form.Label>
        <Col sm={40}> 
        <Form.Control name="itemDescribe" value={item.itemDescribe} onInput={onInputHandler} />
        </Col>
      </Form.Group>

      상품종류: <select name='itemType' onChange={handleSelect} value={item.itemType} onInput={onInputHandler}>
                {selectList.map((itemType) => (
                    <option value={itemType} key={itemType} >
                    {itemType}
                    </option>
                ))}
            </select><br/>

      <Button variant="dark" type="submit">
        수정
      </Button>
    </Form>
    </Col>
    </Row>
    </Container>
    }
    </div>
  )
    // <div>
    //   <h2>상품 수정</h2>
    //   {
    //     item !== null &&
    //     <form action='#' onSubmit={onSubmitHandler}>
    //       상품이름 : <input name='itemName' value={item.itemName} onInput={onInputHandler}/><br/>
    //       가격 : <input name='price' value={item.price}  onInput={onInputHandler} /><br/>
    //       할인률 : <input name='discount' value={item.discount} onInput={onInputHandler} /><br/>
    //       재고 : <input name='ea' value={item.ea}  onInput={onInputHandler} /><br/>
    //       상품정보 : <input name='itemDescribe' value={item.itemDescribe}  onInput={onInputHandler} /><br/>
    //       상품종류: <select onChange={handleSelect} value={item.itemType}>
    //             {selectList.map((itemType) => (
    //                 <option value={itemType} key={itemType} >
    //                 {itemType}
    //                 </option>
    //             ))}
    //         </select><br/>
    //       <button>수정</button>
    //     </form>
    //   }
    // </div>
  // )
}

export default ItemUpdate