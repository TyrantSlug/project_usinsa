import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFn } from "../etc/NetworkUtils";
import ItemComp from "./ItemComp";
import { Button } from "react-bootstrap";
import ItemSearchPage from "./ItemSearchPage";

function ItemSearchList() {
  const [pageList, setPageList] = useState([]);
  const keyword = useParams().keyword;
  const ROLE = localStorage.getItem("ROLE");

  useEffect(() => {
    fetchFn("GET", `/api/item-service/search/${keyword}?pageNum=0`).then(
      (data) => {
        setPageList(data.result.content);
      }
    );
  }, [keyword]);

  function onClickHandler() {
    window.location.href = "/item-service/list";
  }

  function onClickHandler2() {
    const selectedItemType = "상의";
    window.location.href = `/item-service/list/itemType/${selectedItemType}`;
  }

  function onClickHandler3() {
    const selectedItemType = "하의";
    window.location.href = `/item-service/list/itemType/${selectedItemType}`;
  }

  function onClickHandler4() {
    const selectedItemType = "모자";
    window.location.href = `/item-service/list/itemType/${selectedItemType}`;
  }

  function onClickHandler5() {
    const selectedItemType = "가방";
    window.location.href = `/item-service/list/itemType/${selectedItemType}`;
  }

  return (
    <div>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div
          style={{
            width: "80px",
            borderRight: "1px solid #ccc",
            backgroundColor: "black",
            padding: "10px",
            height: "100vh",
          }}
        >
          <Button
            variant="dark"
            block="true"
            onClick={onClickHandler}
            className="mb-4 custom-button"
          >
            <strong>전부</strong>
          </Button>
          <Button
            variant="dark"
            block="true"
            onClick={onClickHandler2}
            className="mb-2 custom-button"
          >
            <strong>상의</strong>
          </Button>
          <Button
            variant="dark"
            block="true"
            onClick={onClickHandler3}
            className="mb-2 custom-button"
          >
            <strong>하의</strong>
          </Button>
          <Button
            variant="dark"
            block="true"
            onClick={onClickHandler4}
            className="mb-2 custom-button"
          >
            <strong>모자</strong>
          </Button>
          <Button
            variant="dark"
            block="true"
            onClick={onClickHandler5}
            className="mb-2 custom-button"
          >
            <strong>가방</strong>
          </Button>
        </div>

        <div style={{ flex: 1 }}>
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
                  <ItemComp key={item.id} item={item} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <ItemSearchPage keyword={keyword} setFn={setPageList} />
    </div>
  );
}

export default ItemSearchList;
