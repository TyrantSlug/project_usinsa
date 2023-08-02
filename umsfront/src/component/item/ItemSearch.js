import React, { useState } from 'react'
import { fetchFn } from '../etc/NetworkUtils';
import ItemSearchList from './ItemSearchList';

function ItemSearch() {
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    function searchHandler(){
        fetchFn("GET", `http://localhost:8000/item-service/item/search/${keyword}`, null)
        .then(data=>{
            setSearchResults(data.result);
            window.location.href=`/item/search/${keyword}`
        })
    }

  return (
    <div>
        <input type="text" value={keyword} onChange={(e)=>{
            setKeyword(e.target.value)
        }} />
        <button onClick={searchHandler}>아이템 검색</button>

        {
            searchResults.length>0 && searchResults.map(item => <ItemSearchList key={item.id} item={item}/>)
        }

    </div>
  )
}

export default ItemSearch