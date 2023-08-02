import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UpdateFetchFn, fetchFn } from '../etc/NetworkUtils';
import { useNavigate } from 'react-router-dom';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

function ReplyUpdate() {

    const LOGINER = localStorage.getItem("LOGINER");
    const navigate = useNavigate();
    const id = useParams().id;
    const [reply, setReply] = useState(null);

    // ***findById
    useEffect(() => {
        fetchFn("GET", `http://localhost:8000/reply-service/id/${id}`, null)
        .then((data) => {
          setReply(data);
            if(LOGINER === data.username){
                setReply(data);
            } else {
                alert("잘못된 접근입니다.")
                window.location.href=`/`;
            }
        });
     }, [id, LOGINER]);

    function onInputHandler(e){
        
        let val = e.target.value;
        let newReply = {...reply, [e.target.name]:val};
        setReply(newReply);
    }

    function onSubmitHandler(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const content = formData.get("content");

        const dto = {
            id,
            username: reply.username,
            content
        }

        UpdateFetchFn("reply-service", dto, "user");
    }

    function onClickCancel(e){
        e.preventDefault();
        let replyDelete = window.confirm("작성을 취소하시겠습니까?");
        if(replyDelete){
            
            navigate(-1);
        }
    }

  return (
    <div>
        <h2>댓글 수정 </h2>

        { reply !== null &&    <form action='#' onSubmit={onSubmitHandler}>
  <div style={{ display: 'flex', justifyContent: 'center',  height: '10%' }}>
    <div style={{ width: '600px', display: 'flex' }}>
      <div style={{ flexBasis: '80%' }}>
        <FloatingLabel controlId="floatingTextarea2" label="Comments">
          <Form.Control 
            name="content"
            as="textarea"
            value={reply.content}
            placeholder="Leave a comment here"
            onInput={onInputHandler}
            style={{ height: '100px', marginTop: '10px', textAlign: 'center' }}
          />
        </FloatingLabel> 
      </div>
      <div style={{ flexBasis: '15%', marginTop: '10px', marginLeft: '10px'}}>
        <Button type="submit" variant="dark" style={{ height: '45px', width: '100%', marginBottom: '10px'}}>수정하기</Button>
        <Button type="submit" variant="dark" style={{ height: '45px', width: '100%'  }} onClick={onClickCancel}>취소하기</Button>
      </div>
    </div>
  </div>
</form>
}
    </div>
  )
}

export default ReplyUpdate


// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { UpdateFetchFn, fetchFn } from '../etc/NetworkUtils';

// function ReplyUpdate() {

//    const LOGINER = localStorage.getItem("LOGINER");
//     const id = useParams().id;
//     const [reply, setReply] = useState(null);

//     useEffect(() => {
//         fetchFn("GET", `http://localhost:9007/api/reply/id/${id}`, null)
//         .then((data) => {

//             if(LOGINER === data.result.username){
//                 setReply(data.result);
//             } else {
//                 alert("잘못된 접근입니다.")
//                 window.location.href=`/`;
//             }
//         });
//     }, [id, LOGINER]);

//     function onInputHandler(e){
        
//         let val = e.target.value;
//         let newReply = {...reply, [e.target.name]:val};
//         setReply(newReply);
//     }

//     function onSubmitHandler(e){
//         e.preventDefault();

//         const formData = new FormData(e.target);
//         const content = formData.get("content");

//         const dto = {
//             id,
//             username: reply.username,
//             content
//         }

//         UpdateFetchFn("reply", dto);
//     }

//   return (
//     <div>
//         <h2>댓글 수정 </h2>

//         { reply !== null && <form action='#' onSubmit={onSubmitHandler}>
        
//         <input name='content' value={reply.content} onInput={onInputHandler}/><br/>
//             <button>수정</button>
//         </form>
//         }   
//     </div>
//   )
// }

// export default ReplyUpdate