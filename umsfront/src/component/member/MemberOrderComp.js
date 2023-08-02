import { Button, Card } from 'react-bootstrap';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFn } from '../etc/NetworkUtils';

function MemberOrderComp({ order }) {
  const navigate = useNavigate();
  const username = useParams().username;
  const id = order.id;
  const productId = order.productId;
  const qty = order.qty;

  function deleteOrder(){
    let isOk = window.confirm("주문 취소하시겠습니까?");

    if(isOk){

      const dto = {
        id,
        productId,
        qty
      };

      console.log(dto)
      fetchFn(
        "DELETE",
        "http://localhost:8000/order-service/orders",
        dto
      ).then((data)=>{
        console.log(dto)
        window.location.href = `/member-service/orderList/${username}`;
      })

    }
  }

  function viewItemDetails() {
    navigate(`/item-service/detail/${order.productId}`);
  }

  return (
    <div style={{
      justifyContent: "center",
       display: "flex"
      }}>
    <Card className="custom-card border-dark" style={{width: '400px', marginBottom: '20px'}} key={order.id}>
      <Card.Body>
        <Card.Title>주문 번호: {order.id}</Card.Title>
        <Card.Title style={{marginBottom:'20px'}}>상품 이름: {order.productName}</Card.Title>
        <Card.Text>수량: {order.qty}</Card.Text>
        <Card.Text>개당 가격: {order.unitPrice}</Card.Text>
        <Card.Text>총 가격: {order.totalPrice}</Card.Text>
        <Card.Text>주문일: {moment(order.createDate).format('YYYY-MM-DD')}</Card.Text>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
          <Button variant='dark' onClick={viewItemDetails}>
            상품 자세히 보기
          </Button>
          <Button variant='dark' onClick={deleteOrder}>
              주문취소
          </Button>
        </div>
      </Card.Body>
      
    </Card>
    </div>
  );
}

export default MemberOrderComp;