import './App.css';
import React from "react";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainEx from './component/etc/MainEx';
import MyHeader from './component/etc/MyHeader';
import MemberLogin from './component/member/MemberLogin';
import MemberList from './component/member/MemberList';
import MemberInsert from './component/member/MemberInsert';
import MemberDelete from './component/member/MemberDelete';
import MemberDetail from './component/member/MemberDetail';
import ReplyUpdate from './component/reply/ReplyUpdate';
import EmptyPage from './component/etc/EmptyPage';
import ReplyInsert from './component/reply/ReplyInsert';
import ItemInsert from './component/item/ItemInsert';
import ItemDetail from './component/item/ItemDetail';
import ItemList from './component/item/ItemList';
import ItemListType from './component/item/ItemListType';
import ItemUpdate from './component/item/ItemUpdate';
import MemberUpdateName from './component/member/MemberUpdateName';
import MemberUpdatePassword from './component/member/MemberUpdatePassword';
import MemberLogout from './component/member/MemberLogout';
import ItemListOfStaff from './component/item/ItemListOfStaff';
import ItemSearchList from './component/item/ItemSearchList';
import OrderInsert from './component/order/OrderInsert';
import MemberOrderList from './component/member/MemberOrderList';
import MemberReplyList from './component/member/MemberReplyList';



function App() {
  return (
    <div className="App">
      <header>
        <MyHeader/> 
      </header>

      <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<MainEx/>}/>

          <Route path='/member-service/orderList/:username' element={<MemberOrderList/>}/>
          <Route path='/member-service/login' element={<MemberLogin/>}/>
          <Route path='/member-service/logout' element={<MemberLogout/>}/>
          <Route path='/member-service/list' element={<MemberList/>}/>
          <Route path='/member-service/detail/:username' element={<MemberDetail/>}/>
          <Route path='/member-service/insert' element={<MemberInsert/>}/>
          <Route path='/member-service/updateName/:username' element={<MemberUpdateName/>}/>
          <Route path='/member-service/updatePassword/:username' element={<MemberUpdatePassword/>}/>
          <Route path='/member-service/delete/:username' element={<MemberDelete/>}/>
          <Route path="/member-service/memberReply/:username" element={<MemberReplyList/>}
            />

          <Route path='/item-service/insert' element={<ItemInsert/>} />
          <Route path='/item-service/detail/:id' element={<ItemDetail/>} />
          <Route path='/item-service/list/itemType/:itemType' element={<ItemListType/>} />
          <Route path='/item-service/list/username/:username' element={<ItemListOfStaff/>} />
          <Route path='/item-service/list' element={<ItemList/>} />
          <Route path='/item-service/update/:id' element={<ItemUpdate/>} />
          <Route path='/item-service/search/:keyword' element={<ItemSearchList/>} />

          <Route path='/reply-service/update/:id' element={<ReplyUpdate/>}/>
          <Route path='/reply-service/insert' element={<ReplyInsert/>}/>

          <Route path='/order-service/orders/:id' element={<OrderInsert/>}/>

          <Route path='/*' element={<EmptyPage/>}/>
        </Routes>
      </div>
      </BrowserRouter>
        
 

    </div>
  );
}

export default App;