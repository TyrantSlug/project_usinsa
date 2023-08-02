import React, { useState } from 'react'
import { fetchFn3 } from '../etc/NetworkUtils';

function ItemUpload() {
    const [bytes, setBytes] = useState(null);

    function onSubmitHandler(e){
        e.preventDefault();
        const formData = new FormData(e.target);

        //     console.log(formData.get(file1));

        // *** (x)
        fetchFn3("POST", "http://localhost:8000/api/item/fileUpload", formData)
        .then(data=>{
            console.log(data);
            setBytes("data:image/png;base64,"+data.bytes);
        })

    }

  return (
    <div>
        {
            bytes !== null && <img src={bytes}/>
        }
        <form method="post" encType="multipart/form-data" onSubmit={onSubmitHandler}>
        id: <input name="id"/><br/>
            업로드할 파일: <input name="file1" type="file"/><br/>
            <button>파일 업로드 </button>
        </form>
    </div>
  )
}

export default ItemUpload