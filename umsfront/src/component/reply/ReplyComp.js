import React from 'react'
import { useParams } from 'react-router-dom';
import { DeleteFetchFn } from '../etc/NetworkUtils';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ReplyComp(props) {

    const LOGINER = localStorage.getItem("LOGINER");
    const reply = props.reply;
    const bid = useParams().id;

    function onClickReplyUpdateFn(e){
      e.preventDefault();
      window.location.href = `/reply-service/update/${reply.id}`;
    }

    function onClickReplyDeleteFn(e){
        e.preventDefault();

        let dto = {
            id: reply.id,
            bid
          }

        let replyDelete = window.confirm("정말로 삭제하시겠습니까?");
        if(replyDelete){
            
            DeleteFetchFn("reply-service", dto, "user");
        }
    }

  return (
    <div>


<div style={{ display: 'flex', justifyContent: 'center', height: '0%', marginBottom: '10px'}}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
    <div style={{ flexBasis: '80%' }}>
      <Card style={{ width: '600px' }}>
        <Card.Body>
          <Card.Title>작성자: {reply.username}</Card.Title>
          <Card.Text>
            작성일: {moment(reply.createDate).format("YYYY-MM-DD HH:mm:ss")} |
            수정일: {moment(reply.updateDate).format("YYYY-MM-DD HH:mm:ss")}
          </Card.Text>
          <Card.Title>{reply.content}</Card.Title>
          {
            LOGINER === reply.username &&
            <div>              
              <Button variant="dark" style={{ float: 'right', marginLeft: '10px' }} onClick={onClickReplyDeleteFn}>삭제하기</Button>
              <Button variant="dark" style={{ float: 'right' }} onClick={onClickReplyUpdateFn}>수정하기</Button>
            </div>
          }
        </Card.Body>
      </Card>
    </div>
  </div>
</div>

    </div>
  )
}

export default ReplyComp

// import React from 'react'
// import { Link, useParams } from 'react-router-dom';
// import { DeleteFetchFn } from '../etc/NetworkUtils';

// function ReplyComp(props) {

//     const LOGINER = localStorage.getItem("LOGINER");
//     const reply = props.reply;
//     const bid = useParams().id;

//     function onclickReplyDeleteFn(e){
//         e.preventDefault();

//         let dto = {
//             id: reply.id,
//             bid
//           }

//         let replyDelete = window.confirm("정말로 삭제하시겠습니까?");
//         if(replyDelete){
            
//             DeleteFetchFn("reply", dto);
//         }
//     }

//   return (
//     <div>

//         <p>{reply.username}</p>
//         <p>{reply.content}</p>
//         <p>{reply.createDate}</p>
//         <p>{reply.updateDate}</p>

//         {
//           LOGINER === reply.username && <>
//           <Link to={`/reply/update/${reply.id}`}>수정하기</Link>
//           <button onClick={onclickReplyDeleteFn}>삭제하기</button>
      
//           </>
//         }

//     </div>
//   )
// }

// export default ReplyComp