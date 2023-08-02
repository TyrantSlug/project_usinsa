import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchFn } from '../etc/NetworkUtils';
import ItemComp from './ItemComp';
import { Button } from 'react-bootstrap';
import ItemSearchPage from './ItemSearchPage';

function ItemSearchList() {
  const [pageList, setPageList] = useState([]);
  const keyword = useParams().keyword;
  const ROLE = localStorage.getItem("ROLE");

  useEffect(() => {
    fetchFn("GET", `http://localhost:8000/item-service/search/${keyword}?pageNum=0`)
      .then((data) => {
        setPageList(data.result.content);
      });
  }, [keyword]);


  function onClickHandler() {
    window.location.href = "/item-service/list";
  }

  function onClickHandler2() {
    window.location.href = "/item-service/list/itemType/상의";
  }

  function onClickHandler3() {
    window.location.href = "/item-service/list/itemType/하의";
  }

  function onClickHandler4() {
    window.location.href = "/item-service/list/itemType/모자";
  }

  function onClickHandler5() {
    window.location.href = "/item-service/list/itemType/가방";
  }

  function onClickHandler6() {
    window.location.href = "/item-service/insert";
  }

  return (
    <div>

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ width: '80px', borderRight: '1px solid #ccc', backgroundColor: 'black', padding: '10px', height: '100vh'}}>
          <Button variant='dark' block="true" onClick={onClickHandler} className='mb-4 custom-button'><strong>전부</strong></Button>
          <Button variant='dark' block="true" onClick={onClickHandler2} className='mb-2 custom-button'><strong>상의</strong></Button>
          <Button variant='dark' block="true" onClick={onClickHandler3} className='mb-2 custom-button'><strong>하의</strong></Button>
          <Button variant='dark' block="true" onClick={onClickHandler4} className='mb-2 custom-button'><strong>모자</strong></Button>
          <Button variant='dark' block="true" onClick={onClickHandler5} className='mb-2 custom-button'><strong>가방</strong></Button>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {pageList.length > 0 && pageList.map(item =>
              <div key={item.id} style={{ flexBasis: '10%', margin: '20px', minWidth: '300px' }}>
                <ItemComp key={item.id} item={item} />
              </div>
            )}
          </div>
        </div>
       
      </div>
      <ItemSearchPage keyword={keyword} setFn={setPageList} />
    </div>
    
  );
}

export default ItemSearchList;