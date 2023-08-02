import React, { useEffect, useState } from 'react'

import ItemComp from './ItemComp';
import { fetchFn } from '../etc/NetworkUtils';
import ItemListPaging from './ItemListPaging';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';



function ItemList() {

    const ROLE = localStorage.getItem("ROLE");
    const [pageList, setPageList] = useState([]);

    const selectList = ["", "상의", "하의", "모자", "가방"];
    const [Selected, setSelected] = useState("item.itemType");
  
    const handleSelect = (e) => {
      setSelected(e.target.value);
    };

    useEffect(() => {
        fetchFn("GET", `http://localhost:8000/item-service/items/list?pageNum=0`).then(
            (data) => {
                setPageList(data.result.content);
            }
        );
    }, []);

    function onSubmitHandler(e){
        e.preventDefault();
        if (Selected === "item.itemType"){
            window.location.href=`/item-service/list`
        } else {
            window.location.href=`/item-service/list/itemtype/${Selected}`
        }
    }
    function onClickHandler1(){
      window.location.href = "/item-service/list"
    }
    
    function onClickHandler2(){
      window.location.href = "/item-service/list/itemType/상의"
    }

    function onClickHandler3(){
      window.location.href = "/item-service/list/itemType/하의"
    }

    function onClickHandler4(){
      window.location.href = "/item-service/list/itemType/모자"
    }

    function onClickHandler5(){
      window.location.href = "/item-service/list/itemType/가방"
    }

    function onClickHandler6(){
      window.location.href = "/item-service/insert"
    }



    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <div
            style={{
              width: "80px",
              borderRight: '1px solid #ccc',
              backgroundColor: "black",
              padding: "10px",
            }}
          >
            <Button variant='dark' block="true" onClick={onClickHandler1} className="mb-4 custom-button">
            <strong>전부</strong>
            </Button>
            <Button variant="dark" block="true" onClick={onClickHandler2} className="mb-2 custom-button">
              <strong>상의</strong>
            </Button>
            <Button variant="dark" block="true" onClick={onClickHandler3} className="mb-2 custom-button">
              <strong>하의</strong>
            </Button>
            <Button variant="dark" block="true" onClick={onClickHandler4} className="mb-2 custom-button">
              <strong>모자</strong>
            </Button>
            <Button variant="dark" block="true" onClick={onClickHandler5} className="mb-2 custom-button">
              <strong>가방</strong>
            </Button>
          </div>
      
          <div style={{ flex: 1 }}>
            {(ROLE === "1" || ROLE === "2") && (
              <Button onClick={onClickHandler6}
                variant="dark"
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  width: "200px",
                  height: "40px",
                }}
              >
                  아이템 등록하기
              </Button>
            )}
      
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {pageList.length > 0 &&
                pageList.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      flexBasis: "10%",
                      margin: "20px",
                      minWidth: "300px",
                    }}
                  >
                    <ItemComp item={item} />
                  </div>
                ))}
            </div>
            <ItemListPaging setFn={setPageList} />
          </div>
        </div>
      );
}

export default ItemList