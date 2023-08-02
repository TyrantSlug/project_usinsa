import React, { useEffect, useState } from 'react';
import { fetchFn } from '../etc/NetworkUtils';
import ItemComp from './ItemComp';
import { useParams } from 'react-router-dom';
import ItemSearchPaging from './ItemSearchPaging';
import { Button } from 'react-bootstrap';

function ItemListOfStaff() {
  const [pageList, setPageList] = useState([]);
  const username = useParams().username;

  useEffect(() => {
    fetchFn("GET", `http://localhost:8000/item-service/list/username/search?username=${username}&pageNum=0`, null)
      .then((data) => {
        setPageList(data.result.content);
      });
  }, [username]);

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
          onClick={() => window.location.href = "/item-service/list"}
          className="mb-4 custom-button"
        >
          <strong>전부</strong>
        </Button>
        <Button
          variant="dark"
          block="true"
          onClick={() => window.location.href = "/item-service/list/itemType/상의"}
          className="mb-2 custom-button"
        >
          <strong>상의</strong>
        </Button>
        <Button
          variant="dark"
          block="true"
          onClick={() => window.location.href = "/item-service/list/itemType/하의"}
          className="mb-2 custom-button"
        >
          <strong>하의</strong>
        </Button>
        <Button
          variant="dark"
          block="true"
          onClick={() => window.location.href = "/item-service/list/itemType/모자"}
          className="mb-2 custom-button"
        >
          <strong>모자</strong>
        </Button>
        <Button
          variant="dark"
          block="true"
          onClick={() => window.location.href = "/item-service/list/itemType/가방"}
          className="mb-2 custom-button"
        >
          <strong>가방</strong>
        </Button>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
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
          <ItemSearchPaging setFn={setPageList} />
        </div>
      </div>
    </div>
  );
}

export default ItemListOfStaff;