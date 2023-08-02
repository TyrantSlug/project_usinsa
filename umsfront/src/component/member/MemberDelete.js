import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFn } from '../etc/NetworkUtils';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


function MemberDelete() {

    const LOGINER = localStorage.getItem("LOGINER");
    const username = useParams().username;
    const passwordRef = useRef();

    // ***findByUsername
    useEffect(()=>{
        fetchFn("GET", `http://localhost:8000/member-service/members/username/${username}`, null)
        .then(data=>{
            if (LOGINER === data.username){
                passwordRef.current.focus()  
            } else {
                window.location.href=`/`;
            }  
        })
    },[username, LOGINER]);



  return (
    <div>
        <h2>회원 삭제</h2>

        <Row className="justify-content-center">
            <Col md={2}>
              
                <Form.Group className="mb-3" controlId="formBasicEmail1">
                  <Form.Label><strong>아이디</strong></Form.Label>
                  <Col sm={40}>
                    <Form.Control value={username} disabled />
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail7">
                  <Form.Label><strong>비밀번호</strong></Form.Label>
                  <Col sm={40} className="d-flex justify-content-center">
                    <Form.Control ref={passwordRef} placeholder='비밀번호를 입력하세요' />
                  </Col>
                </Form.Group>
  
        </Col>
          </Row>

        <Button variant='dark' onClick={()=>{
            const password = passwordRef.current.value;
            const dto = {
                username, password
            }

            // ***delete
            fetchFn("DELETE", "http://localhost:8000/member-service/members/delete", dto)
            .then(data =>{
                if(data === undefined){
                    passwordRef.current.value="";
                    return;
                }
                localStorage.setItem("BTOKEN", null);
                localStorage.setItem("LOGINER", null);
                localStorage.setItem("ROLE", null);
                window.location.href="/";
            })
        }}>삭제</Button>

    </div>
  )
}

export default MemberDelete