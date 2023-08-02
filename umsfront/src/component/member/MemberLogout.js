import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function MemberLogout() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    localStorage.setItem("BTOKEN", null);
    localStorage.setItem("LOGINER", null);
    localStorage.setItem("ROLE", null);
    setShowAlert(true);
    setTimeout(() => {
      navigate(-1);
    }, 500); // 1초 후 이전 페이지로 이동
  }, [navigate]);

  return (
    <div>
      {showAlert && (
        <Alert variant="black" onClose={() => setShowAlert(false)} dismissible>
          <strong>로그아웃되었습니다.</strong>
        </Alert>
      )}
    </div>
  );
}

export default MemberLogout;
