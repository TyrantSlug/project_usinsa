package kr.co.tj.usinsaorderservice.controller;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tj.usinsaorderservice.dto.OrderDTO;
import kr.co.tj.usinsaorderservice.dto.OrderRequest;
import kr.co.tj.usinsaorderservice.dto.OrderResponse;
import kr.co.tj.usinsaorderservice.service.OrderService;


@RestController
@RequestMapping("order-service")
public class OrderController {
   
   @Autowired
   private OrderService orderService;
   
   @GetMapping("/health_check")
   public String status() {
      return "order service입니다.";
   }

   
   @DeleteMapping("/orders")
   public ResponseEntity<?> deleteOrder(@RequestBody OrderRequest orderRequest){
      
      OrderDTO orderDTO = OrderDTO.toOrderDTO(orderRequest);
      
      try {
         orderService.deleteOrder(orderDTO);
         return ResponseEntity.status(HttpStatus.OK).body(OrderResponse.builder().status(1).build());
      } catch (Exception e) {
         // TODO Auto-generated catch block
         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(OrderResponse.builder().status(0).build());
      }
   }   
   
   @PostMapping("/orders")
   public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest){
      
      OrderDTO orderDTO = OrderDTO.toOrderDTO(orderRequest);
      orderDTO = orderService.createOrder(orderDTO);
            
      OrderResponse orderResponse = orderDTO.toOrderResponse();
      
      return ResponseEntity.status(HttpStatus.CREATED).body(orderResponse);
   }
   
   @GetMapping("/orders/user/{username}")
   public ResponseEntity<?> getOrdersByUsername(@PathVariable() String username){
      
      List<OrderDTO> list = orderService.getOrdersByUsername(username);
      
      List<OrderResponse> responseList = new ArrayList<>();
      
      for(OrderDTO orderDTO : list) {
         OrderResponse orderResponse = orderDTO.toOrderResponse();
         responseList.add(orderResponse);
      }
      
      return ResponseEntity.status(HttpStatus.OK).body(responseList);
   }
   
   @GetMapping("/orders/username")
   public ResponseEntity<?> listByUsername(@RequestParam("username") String username, @RequestParam("pageNum") int pageNum) {
      Map<String, Object> map = new HashMap<>();
      System.out.println(map);
      Page<OrderDTO> page = orderService.findByUsername(username, pageNum);
      map.put("result", page);
      System.out.println(map);
      return ResponseEntity.ok().body(map);
   } 

   


}