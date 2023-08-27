import React, { useEffect, useState } from "react";
import ItemComp from "./ItemComp";
import { fetchFn } from "../etc/NetworkUtils";
import ItemListTypePaging from "./ItemListTypePaging";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

function ItemTypeList() {
  const ROLE = localStorage.getItem("ROLE");
  const [pageList, setPageList] = useState([]);
  const [itemType, setItemType] = useState("");



  useEffect(() => {
    fetchFn("GET", `/api/item-service/itemtype/${itemType}?pageNum=0`).then(
      (data) => {
        setPageList(data.result.content);
      }
    );
  }, [itemType]);

  function onClickHandler(selectedItemType) {
    setItemType(selectedItemType); // Set the selected item type to the state
    window.location.href = `/item-service/list/itemType/${selectedItemType}`;
  }

  function onClickHandler1() {
    setItemType(""); // Clear the itemType state to show all items
    window.location.href = "/item-service/list";
  }

  function onClickHandler2() {
    onClickHandler("상의"); // Call the shared onClickHandler with the selected item type
  }

  function onClickHandler3() {
    onClickHandler("하의"); // Call the shared onClickHandler with the selected item type
  }

  function onClickHandler4() {
    onClickHandler("모자"); // Call the shared onClickHandler with the selected item type
  }

  function onClickHandler5() {
    onClickHandler("가방"); // Call the shared onClickHandler with the selected item type
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
