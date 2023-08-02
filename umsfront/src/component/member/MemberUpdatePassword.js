import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { UpdateFetchFn, UpdateFetchFn2, fetchFn } from '../etc/NetworkUtils';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function MemberUpdatePassword() {
  const LOGINER = localStorage.getItem('LOGINER');
  const username = useParams().username;
  const passwordRef = useRef();

  useEffect(() => {
    fetchFn('GET', `http://localhost:8000/member-service/members/username/${username}`, null)
      .then(data => {
        if (LOGINER === data.username) {
          passwordRef.current.focus();
        } else {
          window.location.href = '/';
        }
      });
  }, [username, LOGINER]);

  function onSubmitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const password = formData.get('password');
    const password2 = formData.get('password2');
    const orgPassword = formData.get('orgPassword');

    const dto = {
      username,
      password,
      password2,
      orgPassword,
    };

    UpdateFetchFn2('member-service/members/user/password', dto)
      .then(data => {
        window.location.href = `/member-service/detail/${LOGINER}`;
      })
      .catch(error => {
        console.error(error);
        // 오류 처리 로직 추가
      });
  }

  return (
    <div>
      <h2>비밀번호 수정</h2>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Form onSubmit={onSubmitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail1">
                <Form.Label><strong>아이디</strong></Form.Label>
                <Form.Control value={username} disabled className="text-center" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail7">
                <Form.Label><strong>비밀번호</strong></Form.Label>
                <Form.Control name="password" ref={passwordRef} type="password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail7">
                <Form.Label><strong>비밀번호 확인</strong></Form.Label>
                <Form.Control name="password2" type="password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail7">
                <Form.Label><strong>기존 비밀번호</strong></Form.Label>
                <Form.Control name="orgPassword" type="password" />
              </Form.Group>
              <Button variant="dark" type="submit">
                  <strong>수정</strong>
                </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MemberUpdatePassword;