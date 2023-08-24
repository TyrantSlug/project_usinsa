import React, { useEffect, useState } from "react";
import ItemComp from "./ItemComp";
import { fetchFn } from "../etc/NetworkUtils";
import ItemListTypePaging from "./ItemListTypePaging";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

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
    fetchFn("GET", `/api/item-service/itemtype/${itemType}?pageNum=0`).then(
      (data) => {
        setPageList(data.result.content);
      }
    );
  }, [itemType]);

  function onClickHandler1() {
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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div
        style={{
          width: "80px",
          borderRight: "1px solid #ccc",
          backgroundColor: "black",
          padding: "10px",
        }}
      >
        <Button
          variant="dark"
          block="true"
          onClick={onClickHandler1}
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
        {ROLE === "1" || ROLE === "2" ? (
          <Button
            variant="dark"
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              width: "200px",
              height: "40px",
            }}
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

export default ItemTypeList;
