import React, { useEffect, useState } from 'react'
import ItemComp from './ItemComp';
import { fetchFn } from '../etc/NetworkUtils';
import ItemListTypePaging from './ItemListTypePaging';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ItemTypeList() {
    
    const ROLE = localStorage.getItem("ROLE");
    const [pageList, setPageList] = useState([]);

    const selectList = ["", "상의", "하의", "모자", "가방"];
    const [Selected, setSelected] = useState("item.itemType");

    const itemType = useParams().itemType;
  
    const handleSelect = (e) => {
      setSelected(e.target.value);
    };

    // ***listByItemType
    useEffect(() => {
        fetchFn("GET", `http://localhost:8000/item-service/itemtype/itemtype?itemType=${itemType}&pageNum=0`)
        .then(
            (data) => {
                // console.log(data);
                setPageList(data.result.content);
            }
        );

    }, [itemType]);

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


    return (
        <div style={{ display: "flex", minHeight: "100vh"}}>
          <div style={{
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
          <div style={{ flex: 1}}>
            {ROLE === "1" || ROLE === "2" ? (
              <Button
                variant="dark"
                style={{ marginTop: "10px", marginBottom: "10px", width: "200px", height: "40px" }}
              >
                <Link className="a" to={"/item-service/insert"}>
                  아이템 등록하기
                </Link>
              </Button>
            ) : (
              <></>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {pageList.length >= 0 &&
                pageList.map((item) => (
                  <div
                    key={item.id}
                    style={{ flexBasis: "10%", margin: "20px", minWidth: "300px" }}
                  >
                    <ItemComp key={item.id} item={item} />
                  </div>
                ))}
            </div>
            <ItemListTypePaging itemType={itemType} setFn={setPageList} />
          </div>
        </div>
      );
}

export default ItemTypeList