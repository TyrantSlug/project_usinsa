import React, { useEffect, useState } from 'react'
import ReplyComp from './ReplyComp';
import { useParams } from 'react-router-dom';
import { fetchFn } from '../etc/NetworkUtils';
import ReplyListPaging from './ReplyPaging';

function ReplyList() {

    const bid = useParams().id;
    const [pageList, setPageList] = useState([]);

    // // ***listByBid
    // useEffect(() => {
    //     fetchFn("GET", `http://localhost:9007/api/reply/bid?bid=${bid}&pageNum=0`, null)
    //     .then((data) => {
    //         setPageList(data.result.content);     
    //     })
    // }, [bid]);

    // ***listByBid
    useEffect((pageNum) => {
        fetchFn("GET", `http://localhost:8000/reply-service/replys/bid?bid=${bid}&pageNum=0`, null)
        .then((data) => {
           // console.log(data);
            setPageList(data.result.content);     
        })
    }, [bid]);


  return (
    <div>ReplyList
        {
            pageList !== null &&   
            pageList.length > 0 &&
            pageList.map(reply => {
               return <ReplyComp key={reply.id} reply={reply}/>
            })      
        }

    <ReplyListPaging id = {bid} setFn={setPageList} />
    </div>
  )
}

export default ReplyList