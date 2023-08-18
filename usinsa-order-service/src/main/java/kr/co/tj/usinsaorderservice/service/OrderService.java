package kr.co.tj.usinsaorderservice.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import kr.co.tj.usinsaorderservice.dto.OrderDTO;
import kr.co.tj.usinsaorderservice.dto.OrderEntity;
import kr.co.tj.usinsaorderservice.dto.OrderResponse;
import kr.co.tj.usinsaorderservice.feign.ItemFeign;
import kr.co.tj.usinsaorderservice.repository.OrderRepository;



@Service
public class OrderService {

   
   @Autowired
   OrderRepository orderRepository;
   
   @Autowired
   ItemFeign itemFeign;

   @Transactional
   public void deleteOrder(OrderDTO orderDTO) {
      
      Long id = orderDTO.getId();

      OrderResponse orderResponse = orderDTO.toOrderResponse();
      itemFeign.updateEaByProductId2(orderResponse);
      
      
      orderRepository.deleteById(id);
      
   }
   
   public OrderDTO createOrder(OrderDTO orderDTO) {
      // TODO Auto-generated method stub
      
      orderDTO = getDate(orderDTO);
      orderDTO.setTotalPrice(orderDTO.getUnitPrice() * orderDTO.getQty());
      
      if(orderDTO.getTotalPrice() <= 0) {
         throw new RuntimeException("주문 가격 실패");
      }
      
      OrderEntity orderEntity = orderDTO.toOrderEntity();
      
      orderEntity = orderRepository.save(orderEntity);
      
      
      OrderResponse orderResponse = orderDTO.toOrderResponse();
      String result = itemFeign.updateEaByProductId(orderResponse);
      
      if (result.startsWith("0")) {
         orderRepository.delete(orderEntity);
         return null;
      }

      return orderDTO;

}
   
   private OrderDTO getDate(OrderDTO orderDTO) {
      Date date = new Date();
      
      if (orderDTO.getCreateDate() == null) {
         orderDTO.setCreateDate(date);
      }
      
      orderDTO.setUpdateDate(date);
      return orderDTO;
   }

   public List<OrderDTO> getOrdersByUsername(String username) {
      // TODO Auto-generated method stub
      
      List<OrderEntity> dbList = orderRepository.findByUsername(username);
      List<OrderDTO> list = new ArrayList<>();
      
      for (OrderEntity x : dbList) {
         OrderDTO orderDTO = OrderDTO.toOrderDTO(x);
         list.add(orderDTO);
      }
      
//      dbList.forEach(entity -> list.add(OrderDTO.toOrderDTO(entity)));
      
      return list;
   }
   
   public Page<OrderDTO> findByUsername(String username, int pageNum) {
       List<Sort.Order> sortList = new ArrayList<>();
          sortList.add(Sort.Order.desc("id"));

          Pageable pageable = PageRequest.of(pageNum, 5, Sort.by(sortList));
          Page<OrderEntity> pageItem = orderRepository.findByUsername(username, pageable);
          Page<OrderDTO> pageDto = pageItem.map(orderEntity -> OrderDTO.toOrderDTO(orderEntity));

          return pageDto;
   }










}