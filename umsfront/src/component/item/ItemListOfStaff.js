import React, { useEffect, useState } from "react";
import { fetchFn } from "../etc/NetworkUtils";
import ItemComp from "./ItemComp";
import { useParams } from "react-router-dom";
import ItemSearchPaging from "./ItemSearchPaging";
import { Button } from "react-bootstrap";

function ItemListOfStaff() {
  const [pageList, setPageList] = useState([]);
  const username = useParams().username;

  // useEffect(() => {
  //   fetchFn(
  //     "GET",
  //     `/api/item-service/list/username/search?username=${username}&pageNum=0`,
  //     null
  //   ).then((data) => {
  //     setPageList(data.result.content);
  //   });
  // }, [username]);

  useEffect(() => {
    fetchFn(
      "GET",
      `/api/item-service/list/username/${username}?pageNum=0`
    ).then((data) => {
      setPageList(data.result.content);
    });
  }, [username]);

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
      <ItemSearchPaging username={username} setFn={setPageList} />
    </div>
  );
}

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>
//       <div
//         style={{
//           width: "80px",
//           borderRight: "1px solid #ccc",
//           backgroundColor: "black",
//           padding: "10px",
//         }}
//       >
//         <Button
//           variant="dark"
//           block="true"
//           onClick={() => (window.location.href = "/item-service/list")}
//           className="mb-4 custom-button"
//         >
//           <strong>전부</strong>
//         </Button>
//         <Button
//           variant="dark"
//           block="true"
//           onClick={() =>
//             (window.location.href = "/item-service/list/itemType/상의")
//           }
//           className="mb-2 custom-button"
//         >
//           <strong>상의</strong>
//         </Button>
//         <Button
//           variant="dark"
//           block="true"
//           onClick={() =>
//             (window.location.href = "/item-service/list/itemType/하의")
//           }
//           className="mb-2 custom-button"
//         >
//           <strong>하의</strong>
//         </Button>
//         <Button
//           variant="dark"
//           block="true"
//           onClick={() =>
//             (window.location.href = "/item-service/list/itemType/모자")
//           }
//           className="mb-2 custom-button"
//         >
//           <strong>모자</strong>
//         </Button>
//         <Button
//           variant="dark"
//           block="true"
//           onClick={() =>
//             (window.location.href = "/item-service/list/itemType/가방")
//           }
//           className="mb-2 custom-button"
//         >
//           <strong>가방</strong>
//         </Button>
//       </div>

//       <div style={{ flex: 1 }}>
//         <div style={{ marginTop: "30px", marginBottom: "30px" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               flexWrap: "wrap",
//             }}
//           >
//             {pageList.length >= 0 &&
//               pageList.map((item) => (
//                 <div
//                   key={item.id}
//                   style={{
//                     flexBasis: "10%",
//                     margin: "20px",
//                     minWidth: "300px",
//                   }}
//                 >
//                   <ItemComp key={item.id} item={item} />
//                 </div>
//               ))}
//           </div>
//           <ItemSearchPaging username={username} setFn={setPageList} />
//         </div>
//       </div>
//     </div>
//   );
// }

export default ItemListOfStaff;
