import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UpdateFetchFn, UpdateFetchFn2, fetchFn } from '../etc/NetworkUtils';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row, Modal } from 'react-bootstrap';
import MemberUpdatePassword from './MemberUpdatePassword';

function MemberUpdateName() {
  const LOGINER = localStorage.getItem('LOGINER');
  const username = useParams().username;
  const [member, setMember] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ***findByUsername
  useEffect(() => {
    fetchFn('GET', `http://localhost:8000/member-service/members/username/${username}`, null).then(data => {
      if (LOGINER === data.username) {
        setMember(data);
        console.log(data);
      } else {
        window.location.href = '/';
      }
    });
  }, [username, LOGINER]);

  function onSubmitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const password = formData.get('password');
    const phoneNumber = formData.get('phoneNumber');
    const address = formData.get('address');
    const height = formData.get('height');
    const weight = formData.get('weight');

    const dto = {
      username,
      name,
      password,
      phoneNumber,
      address,
      height,
      weight,
    };

    UpdateFetchFn2('member-service/members/user/username', dto);
  }

  function onInputHandler(e) {
    let val = e.target.value;
    let newMember = { ...member, [e.target.name]: val };

    setMember(newMember);
  }

  function handleModalClose() {
    setShowModal(false);
  }

  return (
    <div>
      <h2>회원 정보 수정</h2>
      {member !== null && (
        <Container>
          <Row className="justify-content-center">
            <Col md={2}>
              <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail1">
                  <Form.Label><strong>아이디</strong></Form.Label>
                  <Col sm={40}>
                    <Form.Control value={username} disabled />
                  </Col>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail2">
                  <Form.Label><strong>이름</strong></Form.Label>
                  <Col sm={40} className="d-flex justify-content-center">
                    <Form.Control name="name" value={member.name} onInput={onInputHandler} />
                  </Col>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail3">
                  <Form.Label><strong>핸드폰 번호</strong></Form.Label>
                  <Col sm={40} className="d-flex justify-content-center">
                    <Form.Control
                      name="phoneNumber"
                      value={member.phoneNumber == null ? '' : member.phoneNumber}
                      onInput={onInputHandler}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail4">
                  <Form.Label><strong>주소</strong></Form.Label>
                  <Col sm={40} className="d-flex justify-content-center">
                    <Form.Control
                      name="address"
                      value={member.address == null ? '' : member.address}
                      onInput={onInputHandler}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail5">
                  <Form.Label><strong>키</strong></Form.Label>
                  <Col sm={40} className="d-flex justify-content-center">
                    <Form.Control
                      name="height"
                      value={member.height == null ? '' : member.height}
                      onInput={onInputHandler}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail6">
                  <Form.Label><strong>몸무게</strong></Form.Label>
                  <Col sm={40} className="d-flex justify-content-center">
                    <Form.Control
                      name="weight"
                      value={member.weight == null ? '' : member.weight}
                      onInput={onInputHandler}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail7">
                  <Form.Label><strong>비밀번호</strong></Form.Label>
                  <Col sm={40} className="d-flex justify-content-center">
                    <Form.Control name="password" type="password" />
                  </Col>
                </Form.Group>

                <Button variant="dark" type="submit">
                  수정
                </Button>
                <br />
                <br />

                <Button variant="dark" onClick={() => setShowModal(true)}>
                  비밀번호 수정
                </Button>

                
              </Form>

              <Modal show={showModal} onHide={handleModalClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>비밀번호 수정</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <MemberUpdatePassword />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                      닫기
                    </Button>
                  </Modal.Footer>
                </Modal>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default MemberUpdateName;