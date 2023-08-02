import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { fetchFn } from './NetworkUtils';

function MyHeader() {
  const LOGINER = localStorage.getItem('LOGINER');
  const ROLE = localStorage.getItem('ROLE');

  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function searchHandler() {
    fetchFn('GET', `http://localhost:8000/item-service/search/${keyword}?pageNum=0`, null)
      .then(data => {
        console.log(data.result.content)
        setSearchResults(data.result.content);
        window.location.href = `/item-service/search/${keyword}`;
      });
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      searchHandler();
    }
  }

  return (
    <Navbar bg="black" variant="dark" style={{height:"100px"}}>
      <Container style={{ marginLeft: '30px', fontSize:"20px" }}>
        <Navbar.Brand href="/" style={{fontSize:"30px" }}>USINSA</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/item-service/list"><strong>상품</strong></Nav.Link>
            {ROLE === '2' && <Nav.Link href="/member-service/list"><strong>회원 목록</strong></Nav.Link>}
            {LOGINER === 'null' ? (
              <>
                <Nav.Link href="/member-service/login"><strong>로그인</strong></Nav.Link>
                <Nav.Link href="/member-service/insert"><strong>회원가입</strong></Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href={`/member-service/detail/${LOGINER}`}><strong>마이페이지</strong></Nav.Link>
                <Nav.Link href={`/member-service/orderList/${LOGINER}`}><strong>주문내역</strong></Nav.Link>
                <Nav.Link href="/member-service/logout"><strong>로그아웃</strong></Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="d-flex" >
        <input size={'40'}
          className="form-control me-2"
          type="search"
          placeholder="상품을 입력하세요"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-btn" onClick={searchHandler}>
          <img src="/search.png" alt="검색" width={50} style={{ marginLeft: '-13px' }} />
        </button>
      </div>
    </Navbar>
  );
}

export default MyHeader;