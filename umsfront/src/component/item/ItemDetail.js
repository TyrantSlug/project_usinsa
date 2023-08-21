import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { bookmarkFetchFn, fetchFn } from "../etc/NetworkUtils";
import ReplyInsert from "../reply/ReplyInsert";
import ReplyList from "../reply/ReplyList";
import { Button, Modal } from "react-bootstrap";
import OrderInsert from "../order/OrderInsert";
import moment from "moment";

function ItemDetail() {
  const LOGINER = localStorage.getItem("LOGINER");
  const id = useParams().id;
  const username = useParams().username;
  const [item, setItem] = useState(null);
  const bid = useParams().id;
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false); // 모달 열기/닫기 상태

  const uploaderId = localStorage.getItem("LOGINER");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    bookmarkFetchFn(
      "GET",
      `/api/bookmark-service/bid/${id}/username/${LOGINER}`,
      null
    ).then((data) => {
      if (data.result) {
        setIsLiked(true);
      }
      if (data.result === "실패") {
        setIsLiked(false);
      }
    });
  }, [id, LOGINER]);

  function createBookmark() {
    const dto = {
      bid: item.id,
      itemName: item.itemName,
      sellerName: item.username,
      username: LOGINER,
    };

    const url = `/api/bookmark-service/createBookmark`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    };

    fetch(url, options)
      .then((res) => {
        if (!res) {
          throw new Error("좋아요 추가 실패");
        }
        return res.json();
      })
      .then((data) => {
        setIsLiked(true);
        console.log("좋아요 추가");
      });
  }

  function deleteBookmark() {
    const dto = {
      bid: item.id,
    };
    const url = `/api/bookmark-service/deleteBookmark`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    };

    fetch(url, options)
      .then((res) => {
        if (!res) {
          throw new Error("좋아요 취소 실패");
        }
        return res.json();
      })
      .then((data) => {
        setIsLiked(false);
        console.log("좋아요 삭제");
      });
  }

  const handleLikeToggle = () => {
    //setIsLiked(!isLiked);
    if (isLiked) {
      deleteBookmark();
    } else {
      createBookmark();
    }
  };

  useEffect(() => {
    const url = `/api/item-service/viewcount/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("조회수 증가 실패");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        console.error("API 요청 실패:", error);
      });
  }, [id]);

  useEffect(() => {
    fetchFn("GET", `/api/item-service/item/id/${id}`, null).then((data) => {
      setItem(data);
      console.log(data);
    });
  }, [id]);

  useEffect(() => {
    if (file) {
      filedelete();
      handleFileUpload();
    }
  }, [file]);

  function filedelete() {
    const token = localStorage.getItem("BTOKEN");
    const url = "/api/file-service/fileDelete";
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ bid: bid }),
    };

    fetch(url, options)
      .then((response) => {})
      .then((data) => {});
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleFileUpload() {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploaderId", uploaderId);
    formData.append("bid", bid);

    const token = localStorage.getItem("BTOKEN");
    const url = "/api/file-service/fileUpload";
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };

    fetch(url, options)
      .then((response) => {
        // 응답 처리 로직
        if (!response) {
          console.log(response);
        }
      })
      .then((data) => {
        console.log("File upload success:", data);
        window.location.href = `/item-service/detail/${id}`;
      })
      .catch((error) => {
        console.error("File upload error:", error);
      });
  }

  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/file-service/image/${bid}`);
        if (response.status === 200) {
          const blob = await response.blob();
          const objectURL = URL.createObjectURL(blob);
          setImageURL(objectURL);
          console.log(imageURL);
        } else {
          throw new Error("Image not found");
        }
      } catch (error) {
        console.log(error);
        setImageURL(null);
      }
    };

    fetchImage();
  }, [bid]);

  function onsubmitHandler(e) {
    e.preventDefault();

    fetchFn(
      "GET",
      `/api/item/list/username/search?username=${username}&pageNum=0`,
      null
    ).then((data) => {
      window.location.href = `/item/list/username/${item.username}`;
    });
  }

  function deleteHere() {
    let isOk = window.confirm("정말 삭제하시겠습니까?");

    if (isOk) {
      const dto = {
        id,
      };
      fetchFn("DELETE", "/api/item-service/item/manager", dto).then(() => {
        window.location.href = "/item-service/list";
      });
    }
  }

  function aaaaa() {
    alert("로그인 후 이용가능");
  }

  function handleImageUploadClick() {
    fileInputRef.current.click();
  }

  // 모달 열기/닫기 함수
  function toggleModal() {
    setShowModal(!showModal);
  }

  const getDiscountedPrice = () => {
    const discountedPrice = (item.price * (100 - item.discount)) / 100;
    return Math.round(discountedPrice);
  };

  function onClickHandler1() {
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
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          width: "80px",
          borderRight: "1px solid #ccc",
          padding: "10px",
          background: "black",
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
        <h2 style={{ textAlign: "center", marginBottom: "50px" }}>
          상품정보 자세히 보기
        </h2>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            {imageURL ? (
              <>
                <img src={imageURL} alt="Image" width={500} height={500} />
              </>
            ) : (
              <img src="/img/a.jpg" width={500} height={500} />
            )}
          </div>
          <div
            style={{
              flex: 1,
              borderLeft: "2px solid #ccc",
              paddingLeft: "20px",
              paddingRight: "300px",
            }}
          >
            {item !== null && (
              <>
                {item.member && <p>등록자: {item.member.username}</p>}
                등록자:{" "}
                <Link
                  className="b"
                  to={`/item-service/list/username/${item.username}`}
                  onSubmit={onsubmitHandler}
                >
                  {item.username}
                </Link>
                <br />
                <p style={{ textAlign: "left" }}>상품번호: {item.id}</p>
                <br />
                <p style={{ textAlign: "right" }}>상품이름: {item.itemName}</p>
                <br />
                가격: {item.price}
                <br />
                할인률: {item.discount}
                <br />
                할인가격 : {getDiscountedPrice()}
                <br />
                재고: {item.ea}
                <br />
                상품정보: {item.itemDescribe}
                <br />
                종류: {item.itemType}
                <br />
                등록날짜: {moment(item.createDate).format("YYYY-MM-DD")}
                <br />
                조회수: {item.viewCount}
                <br />
                {LOGINER === item.username ? (
                  <>
                    <Button variant="dark" onClick={handleImageUploadClick}>
                      이미지 등록
                    </Button>
                    &nbsp;
                    <Button variant="dark">
                      <Link className="a" to={`/item-service/update/${id}`}>
                        수정
                      </Link>
                    </Button>
                    &nbsp;
                    <Button variant="dark">
                      <Link className="a" onClick={deleteHere}>
                        삭제
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    {LOGINER === "null" ? (
                      <>
                        <Button variant="dark" onClick={aaaaa}>
                          구매
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="dark" onClick={toggleModal}>
                          구매
                        </Button>
                        <button onClick={handleLikeToggle}>
                          {isLiked ? <span>❤️</span> : <span>🤍</span>}
                        </button>
                      </>
                    )}
                  </>
                )}
                <form action="#" encType="multipart/form-data" display="inline">
                  <input
                    type="file"
                    name="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <input
                    type="submit"
                    disabled={file !== null}
                    style={{ display: "none" }}
                  />
                </form>
              </>
            )}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <ReplyInsert />
          <ReplyList />
        </div>
      </div>
      {/* 구매 모달 */}
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>구매</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderInsert />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ItemDetail;
