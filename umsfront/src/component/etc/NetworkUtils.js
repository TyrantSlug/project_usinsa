export function fetchFn(method, url, dto){
 
    const token = localStorage.getItem("BTOKEN");

    let options = {
        method: method,
        headers : {
            "Content-Type" : "application/json"
        }
    };

    if(token !== null && token.length > 0) {
        options.headers.Authorization = "Bearer "+token;
    }

    if(dto){
        options.body = JSON.stringify(dto);
    }

    return fetch(url, options)
    .then((response) => {

        if(response.status === 403){
            window.location.href = `/member/login`;
        }

        if(!response.ok){
            throw new Error("잘못된 접근입니다.");
        }
        return response.json();
    })
    .catch((error) => {
        alert(error.message);
    })
}


export function InsertFetchFn(servicename, dto, is){

    // *** (x)
    return fetchFn("POST", `http://localhost:8000/${servicename}/${is}`, dto)
    .then((data) => {
        if(data === undefined){
            return
        }

        let what = "";

        if(servicename === "member-service"){
            what = data.username;
        } else if(servicename === "item-service"){

            what = data.id;
            console.log(what);
        } else if(servicename === "reply-service"){
            servicename = "item-service"
            what = data.bid;
        } else if(servicename === "order-service"){
            servicename = "item-service"
            what = data.productId;
            alert("주문 완료");
        }

        window.location.href = `/${servicename}/detail/${what}`;
    })  
}

export function UpdateFetchFn2(servicename, dto){

    // *** (x)
    return fetchFn("PUT", `http://localhost:8000/${servicename}`, dto)
    .then((data) => {
        if(data === undefined){
            return
          }
        if(servicename === "member-service"){
            window.location.href = `/${servicename}/detail/${data.username}`;
        } else if (servicename === "item-service") {
            window.location.href = `/${servicename}/detail/${data.id}`;
        } else if (servicename === "reply-service") {
            servicename = "item-service"
            window.location.href = `/${servicename}/detail/${data.bid}`;
        } else if (servicename === "member-service/members/user/username") {
            window.location.href=`/member-service/detail/${data.username}`;
        } else if (servicename === "member-service/password") {
            if(data.username === undefined){
                alert("비밀번호가 잘못되었습니다.");
                return
              }
            window.location.href=`/member-service/detail/${data.username}`;
        }
    })
}

export function UpdateFetchFn(servicename, dto, is){

    // *** (x)
    return fetchFn("PUT", `http://localhost:8000/${servicename}/${is}`, dto)
    .then((data) => {
        if(data === undefined){
            return
          }
        if(servicename === "member-service"){
            window.location.href = `/${servicename}/detail/${data.username}`;
        } else if (servicename === "item-service") {
            window.location.href = `/${servicename}/detail/${data.id}`;
        } else if (servicename === "reply-service") {
            servicename = "item-service"
            window.location.href = `/${servicename}/detail/${data.bid}`;
        } else if (servicename === "member-service/members/user/username") {
            window.location.href=`/member-service/detail/${data.username}`;
        } else if (servicename === "member-service/password") {
            if(data.username === undefined){
                alert("비밀번호가 잘못되었습니다.");
                return
              }
            window.location.href=`/member-service/detail/${data.username}`;
        }
    })
}

export function DeleteFetchFn(servicename, dto, is){

    /// *** (x)
    return fetchFn("DELETE", `http://localhost:8000/${servicename}/${is}`, dto)
    .then((data) => {
        if(data === undefined){
            return
          }
      
        let what = `${data.id}`;

        if(servicename === "reply-service"){
            servicename = "item-service"
            what = data.bid;
            window.location.href = `/${servicename}/detail/${what}`;
        } else {
             window.location.href = `/${servicename}/list`;
        } 
    })
}

export function DeleteFetchFn2(servicename, dto, is){

    /// *** (x)
    return fetchFn("DELETE", `http://localhost:8000/${servicename}/${is}`, dto)
    .then((data) => {
        const username = localStorage.getItem("LOGINER");
        if(data === undefined){
            return
          }
      
        let what = `${data.id}`;
        console.log(username);

        if(servicename === "reply-service"){
            servicename = "member-service"
            what = data.bid;
            window.location.href = `/${servicename}/memberReply/${username}`;
        } else {
             window.location.href = `/${servicename}/list`;
        } 
    })
}

export function idCheckFetFn(username) {

    // *** checkid (x)
    const url = new URL(`http://localhost:8000/member-service/checkid?username=${username}`);

    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

 
    return fetch(url, options)
        .then(res => {
            
            return res.json();
        })
}


export function bookmarkFetchFn(method, url, dto){
 
    const token = localStorage.getItem("BTOKEN");

    let options = {
        method: method,
        headers : {
            "Content-Type" : "application/json"
        }
    };

    if(token !== null && token.length > 0) {
        options.headers.Authorization = "Bearer "+token;
    }

    if(dto){
        options.body = JSON.stringify(dto);
    }

    return fetch(url, options)
    .then((response) => {

        if(response.status === 403){
            window.location.href = `/member/login`;
        }

         if(!response.ok){
            console.error = () => {};
         }

        return response.json(); 
    })
    .catch((error) => {
        alert(error.message);
    })
}