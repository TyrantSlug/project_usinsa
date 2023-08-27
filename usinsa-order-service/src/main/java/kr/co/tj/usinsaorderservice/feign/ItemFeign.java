package kr.co.tj.usinsaorderservice.feign;


import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import kr.co.tj.usinsaorderservice.dto.OrderResponse;



@FeignClient(name = "item-service")
public interface ItemFeign {
   
   
   @PutMapping("/item-service/item/productid")
   public String updateEaByProductId(@RequestBody OrderResponse orderResponse);
   
   @PutMapping("/item-service/item/productid2")
   public String updateEaByProductId2(@RequestBody OrderResponse orderResponse);

}