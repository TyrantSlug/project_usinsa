import React, { useEffect, useState } from 'react'
import { fetchFn } from '../etc/NetworkUtils';
import MemberComp from './MemberComp';
import { Link } from 'react-router-dom';

function MemberList() {
   
    const ROLE = localStorage.getItem("ROLE");
    const [members, setMembers] = useState([]);

    // ***findAll
    useEffect(()=>{
        fetchFn("GET", "http://localhost:8000/member-service/members/all", null)
        .then((data) => {

            if (ROLE === "2"){
                setMembers(data.result);
              }
              else {
                alert("권한 없음");
                window.location.href=`/`;
              }

        })
    },[ROLE])


  return (
    <div>

        { ROLE === "2" &&
                
            <>
            <h2>회원 목록</h2>
            <Link to={`/`}>돌아가기</Link><br/>
            <Link to={`/member-service/insert`}>등록하기</Link></>
            
        }
            
        {
            members.length>0 
            && 
            members.map(member => <MemberComp key={member.id} member={member}/>)
        }
    </div>

   
  )
}

export default MemberList