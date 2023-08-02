package kr.co.tj.itemservice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tj.itemservice.dto.ItemDTO;
import kr.co.tj.itemservice.dto.ItemEntity;
import kr.co.tj.itemservice.dto.ItemRequest;
import kr.co.tj.itemservice.dto.ItemResponse;
import kr.co.tj.itemservice.dto.OrderResponse;
import kr.co.tj.itemservice.service.ItemService;

@RestController
@RequestMapping("/item-service")
public class ItemController {

   @Autowired
   private ItemService itemService;
   
   @GetMapping("/viewcount/{id}")
   public ResponseEntity<?> getItem(@PathVariable("id") long id) {
       ItemDTO itemDTO = itemService.findById(id);

       if (itemDTO != null) {
           // 조회수 증가
           itemService.incrementViewCount(id);

           return ResponseEntity.status(HttpStatus.OK).body(itemDTO);
       } else {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
       }
   }
   
   @PutMapping("/item/productid2")
   public ResponseEntity<?> updateStockByProductId2(@RequestBody OrderResponse orderResponse) {

      ItemDTO itemDTO = itemService.findById(orderResponse.getProductId());
      ItemEntity itemEntity = ItemDTO.toItemEntity(itemDTO);
      
      itemEntity.setEa(itemEntity.getEa() + orderResponse.getQty());

      String result;

      try {
         result = itemService.updateEaByProductId2(itemEntity);
         if (result.equalsIgnoreCase("ok")) {
            return ResponseEntity.status(HttpStatus.OK).body("1: 성공");
         } else {
            return ResponseEntity.status(HttpStatus.OK).body("0: 재고 갱신 실패");
         }

      } catch (Exception e) {
         e.printStackTrace();
         return ResponseEntity.status(HttpStatus.OK).body("0: 재고 갱신 실패");
      }

   }
   
   @PutMapping("/item/productid")
   public ResponseEntity<?> updateStockByProductId(@RequestBody OrderResponse orderResponse) {

      ItemDTO itemDTO = itemService.findById(orderResponse.getProductId());
      // ItemEntity itemEntity = itemService.findById(orderResponse.getProductId());
      ItemEntity itemEntity = ItemDTO.toItemEntity(itemDTO);

      if (itemEntity == null) {
         return ResponseEntity.status(HttpStatus.OK).body("0: 존재하지 않는 상품");
      }

      if (itemEntity.getEa() < orderResponse.getQty()) {
         return ResponseEntity.status(HttpStatus.OK).body("0: 재고가 부족합니다.");
      }

      itemEntity.setEa(itemEntity.getEa() - orderResponse.getQty());

      String result;

      try {
         result = itemService.updateEaByProductId(itemEntity);
         if (result.equalsIgnoreCase("ok")) {
            return ResponseEntity.status(HttpStatus.OK).body("1: 성공");
         } else {
            return ResponseEntity.status(HttpStatus.OK).body("0: 재고 갱신 실패");
         }

      } catch (Exception e) {
         e.printStackTrace();
         return ResponseEntity.status(HttpStatus.OK).body("0: 재고 갱신 실패");
      }

   }
   

   @GetMapping("/list/username/search")
   public ResponseEntity<?> list(@RequestParam("username") String username, @RequestParam("pageNum") int pageNum) {
      Map<String, Object> map = new HashMap<>();
      Page<ItemDTO> page = itemService.findAll(username, pageNum);
      map.put("result", page);

      return ResponseEntity.ok().body(map);
   }
   
   @GetMapping("/search/{keyword}")
   public ResponseEntity<?> search(@PathVariable("keyword") String keyword, @RequestParam("pageNum") int pageNum) {
      Map<String, Object> map = new HashMap<>();
      
      try {
         Page<ItemDTO> page = itemService.search(keyword, pageNum);
         map.put("result", page);
         return ResponseEntity.ok().body(map);
      } catch (Exception e) {
         e.printStackTrace();
         map.put("result", "에러");
         return ResponseEntity.badRequest().body(map);
      }
   }

//   @GetMapping("/search/{keyword}")
//   public ResponseEntity<?> search(@PathVariable("keyword") String keyword) {
//      Map<String, Object> map = new HashMap<>();
//
//      try {
//         List<ItemDTO> list = itemService.search(keyword);
//         map.put("result", list);
//         return ResponseEntity.ok().body(map);
//      } catch (Exception e) {
//         e.printStackTrace();
//         map.put("result", "에러");
//         return ResponseEntity.badRequest().body(map);
//      }
//   }

   @GetMapping("/list/username/{username}")
   public ResponseEntity<?> itemListOfStaff(@PathVariable("username") String username) {
      Map<String, Object> map = new HashMap<>();

      try {
         List<ItemDTO> list = itemService.itemListOfStaff(username);
         map.put("result", list);
         return ResponseEntity.ok().body(map);
      } catch (Exception e) {
         e.printStackTrace();
         map.put("result", "해당 스태프의 리스트를 가져오지 못했습니다.");
         return ResponseEntity.badRequest().body(map);
      }
   }

   @GetMapping("/items/list") // itemList 불러오기
   public ResponseEntity<?> list(int pageNum) {

      Map<String, Object> map = new HashMap<>();

      Page<ItemDTO> page = itemService.findAll(pageNum);
      map.put("result", page);

      return ResponseEntity.ok().body(map);
   }

   @GetMapping("/itemtype/itemtype") // ItemTypeList 불러오기
   public ResponseEntity<?> listByItemType(@RequestParam String itemType, @RequestParam int pageNum) {
      Map<String, Object> map = new HashMap<>();

      Page<ItemDTO> page = itemService.findByItemType(itemType, pageNum);
      map.put("result", page);

      return ResponseEntity.ok().body(map);
   }



   @GetMapping("/item/id/{id}/replys")
   public ResponseEntity<?> getReplys(@PathVariable() Long id) {

      if (id == null) {
         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 정보");
      }

      ItemDTO dto = itemService.getReplys(id);

      ItemResponse itemResponse = dto.toItemResponse();

      return ResponseEntity.status(HttpStatus.OK).body(itemResponse);
   }

   @DeleteMapping("/item/manager")
   public ResponseEntity<?> delete(@RequestBody ItemRequest itemRequest) {

      if (itemRequest == null || itemRequest.getId() == null) {
         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 정보");
      }

      ItemDTO itemDTO = ItemDTO.toItemDTO(itemRequest);

      Long id = itemDTO.getId();

      itemService.deleteItem(id);

      ItemResponse itemResponse = itemDTO.toItemResponse();

      return ResponseEntity.status(HttpStatus.OK).body(itemResponse);
   }

   @GetMapping("/list/itemtype/{itemType}")
   public ResponseEntity<?> findByItemType(@PathVariable("itemType") String itemType) {

      if (itemType == null) {
         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 정보");
      }

      List<ItemDTO> list = itemService.findByItemType(itemType);

      return ResponseEntity.status(HttpStatus.OK).body(list);

   }

   @PutMapping("/item/manager/update")
   public ResponseEntity<?> update(@RequestBody ItemRequest itemRequest) {

      if (itemRequest == null || itemRequest.getItemName() == null || itemRequest.getPrice() == 0
            || itemRequest.getEa() == 0 || itemRequest.getItemDescribe() == null
            || itemRequest.getItemDescribe() == "" || itemRequest.getItemType() == null
            || itemRequest.getItemType() == "") {
         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 정보");
      }

      ItemDTO itemDTO = ItemDTO.toItemDTO(itemRequest);

      itemDTO = itemService.updateItem(itemDTO);

      ItemResponse itemResponse = itemDTO.toItemResponse();

      return ResponseEntity.status(HttpStatus.OK).body(itemResponse);

   }

   @GetMapping("/item/id/{id}")
   public ResponseEntity<?> findById(@PathVariable() Long id) {

      if (id == null) {
         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 정보");
      }

      ItemDTO dto = itemService.findById(id);

      return ResponseEntity.status(HttpStatus.OK).body(dto);
   }

   @GetMapping("/item/username/{username}")
   public ResponseEntity<?> findByUsername(@PathVariable() String username) {

      if (username == null) {
         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 정보");
      }

      List<ItemDTO> list = itemService.findByUsername(username);

//      List<ItemResponse> responsesList = new ArrayList<>();

      return ResponseEntity.status(HttpStatus.OK).body(list);
   }

   @GetMapping("/items/all")
   public ResponseEntity<?> findAll() {

      List<ItemDTO> list = itemService.findAll();

      return ResponseEntity.status(HttpStatus.OK).body(list);
   }

   @PostMapping("/item/manager")
   public ResponseEntity<?> createItem(@RequestBody ItemRequest itemRequest) {

      if (itemRequest.getItemName() == null || itemRequest.getPrice() == 0 || itemRequest.getDiscount() <= -1
            || itemRequest.getUsername() == null || itemRequest.getUsername().equals("") || itemRequest.getEa() <= 0
            || itemRequest.getItemDescribe() == null || itemRequest.getItemDescribe().equals("")
            || itemRequest.getItemType() == null || itemRequest.getItemType().equals("")) {
         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("상품 입력 실패1");
      }

      ItemDTO itemDTO = ItemDTO.toItemDTO(itemRequest);

      itemDTO = itemService.createItem(itemDTO);

      ItemResponse itemResponse = itemDTO.toItemResponse();

      return ResponseEntity.status(HttpStatus.OK).body(itemResponse);

   }

   @GetMapping("/health_check")
   private String status() {
      return "item 서비스";
   }

}