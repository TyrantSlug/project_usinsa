package kr.co.tj.itemservice.service;

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

import kr.co.tj.itemservice.dto.ItemDTO;
import kr.co.tj.itemservice.dto.ItemEntity;
import kr.co.tj.itemservice.dto.ReplyResponse;
import kr.co.tj.itemservice.feign.ReplyFeign;
import kr.co.tj.itemservice.repository.ItemRepository;

@Service
public class ItemService {

   @Autowired
   private ItemRepository itemRepository;

   @Autowired
   private ReplyFeign replyFeign;
   
   public ItemDTO incrementViewCount(long id) {
	   Optional<ItemEntity> optional = itemRepository.findById(id);
	   if (!optional.isPresent()) {
	         throw new RuntimeException("Item not found");
	      }

	      ItemEntity itemEntity = optional.get();

       if (itemEntity != null) {
    	   ItemDTO itemDTO = new ItemDTO();
//           Long currentViewCount = itemEntity.getViewCount();
//           itemEntity.setViewCount(currentViewCount + 1);
           if (itemEntity.getViewCount() == null || itemEntity.getViewCount() == 0L) {
               itemEntity.setViewCount(1L);
           } else {
               Long currentViewCount = itemEntity.getViewCount();
               itemEntity.setViewCount(currentViewCount + 1);
           }
           itemRepository.save(itemEntity);
           itemDTO = ItemDTO.toItemDTO(itemEntity);
           return itemDTO;
       }else {
    	   return null;
       }
   }
   
   @Transactional
   public String updateEaByProductId2(ItemEntity itemEntity) {

      try {
         itemRepository.save(itemEntity);
         return "ok";
      } catch (Exception e) {
         e.printStackTrace();
         return "fail";
      }
   }
   
   @Transactional
   public String updateEaByProductId(ItemEntity itemEntity) {

      try {
         itemRepository.save(itemEntity);
         return "ok";
      } catch (Exception e) {
         e.printStackTrace();
         return "fail";
      }
   }
   
   public Page<ItemDTO> findAll(String username, int pageNum) {

      List<Sort.Order> sortList = new ArrayList<>();
      sortList.add(Sort.Order.desc("id"));

      Pageable pageable = PageRequest.of(pageNum, 20, Sort.by(sortList));
      Page<ItemEntity> pageItem = itemRepository.findByUsername(username, pageable);
      new ItemDTO();
      Page<ItemDTO> pageDto = pageItem.map(itemEntity -> ItemDTO.toItemDTO(itemEntity));

      return pageDto;
   }
   
   public Page<ItemDTO> search(String keyword, int pageNum) {
       List<Sort.Order> sortList = new ArrayList<>();
       sortList.add(Sort.Order.desc("id"));
       
       Pageable pageable = PageRequest.of(pageNum, 20, Sort.by(sortList));
       Page<ItemEntity> pageItem = itemRepository.findByitemNameContaining(keyword, pageable);
       Page<ItemDTO> pageDTO = pageItem.map(itemEntity -> ItemDTO.toItemDTO(itemEntity));
       
       return pageDTO;
   }

//   public List<ItemDTO> search(String keyword) {
//      List<ItemEntity> list_entity = itemRepository.findByitemNameContaining(keyword);
//
//      List<ItemDTO> list_e = new ArrayList<>();
//
//      for (ItemEntity e : list_entity) {
//         list_e.add(ItemDTO.toItemDTO(e));
//      }
//      return list_e;
//   }

   public List<ItemDTO> itemListOfStaff(String username) {

      List<ItemEntity> list_entity = itemRepository.findByUsername(username);

      List<ItemDTO> list_dto = new ArrayList<>();

      for (ItemEntity e : list_entity) {
         list_dto.add(ItemDTO.toItemDTO(e));
      }

      return list_dto;
   }

   public Page<ItemDTO> findAll(int page) {
      List<Sort.Order> sortList = new ArrayList<>();
      sortList.add(Sort.Order.desc("id"));

      Pageable pageable = PageRequest.of(page, 20, Sort.by(sortList));
      Page<ItemEntity> pageItem = itemRepository.findAll(pageable);
      new ItemDTO();
      Page<ItemDTO> pageDto = pageItem.map(itemEntity -> ItemDTO.toItemDTO(itemEntity));

      return pageDto;
   }

   public Page<ItemDTO> findByItemType(String itemType, int page) {
      List<Sort.Order> sortList = new ArrayList<>();
      sortList.add(Sort.Order.desc("id"));

      Pageable pageable = PageRequest.of(page, 20, Sort.by(sortList));
      Page<ItemEntity> pageItem = itemRepository.findByItemType(itemType, pageable);
      new ItemDTO();
      Page<ItemDTO> pageDto = pageItem.map(itemEntity -> ItemDTO.toItemDTO(itemEntity));

      return pageDto;
   }



   public ItemDTO createItem(ItemDTO itemDTO) {

      itemDTO = getDate(itemDTO);
      
      itemDTO.setViewCount(0L);

//      itemDTO.setSalePrice(itemDTO.getPrice() - (itemDTO.getPrice() * (itemDTO.getDiscount() / 100)));
//      itemDTO.setTotalPrice(itemDTO.getSalePrice() * itemDTO.getEa());

      ItemEntity itemEntity = itemDTO.toItemEntity();

      itemEntity = itemRepository.save(itemEntity);

      itemDTO = ItemDTO.toItemDTO(itemEntity);
//      통신작업
//      ItemResponse itemResponse = itemDTO.toItemResponse();

      return itemDTO;
   }

   private ItemDTO getDate(ItemDTO itemDTO) {
      Date now = new Date();

      if (itemDTO.getCreateDate() == null) {
         itemDTO.setCreateDate(now);
      }

      itemDTO.setUpdateDate(now);

      return itemDTO;
   }

   public List<ItemDTO> findAll() {
      List<ItemDTO> list_dto = new ArrayList<>();
      List<ItemEntity> list_entity = itemRepository.findAll();

      for (ItemEntity entity : list_entity) {
         list_dto.add(ItemDTO.toItemDTO(entity));
      }

      return list_dto;
   }

   public List<ItemDTO> findByUsername(String username) {

      List<ItemDTO> list_dto = new ArrayList<>();

      List<ItemEntity> list_entity = itemRepository.findByUsername(username);

      for (ItemEntity entity : list_entity) {
         list_dto.add(ItemDTO.toItemDTO(entity));
      }

      return list_dto;
   }

   public ItemDTO findById(Long id) {
      Optional<ItemEntity> optional = itemRepository.findById(id);

      if (!optional.isPresent()) {
         throw new RuntimeException("잘못된 정보에용1");
      }

      ItemEntity entity = optional.get();

      ItemDTO dto = ItemDTO.toItemDTO(entity);

      return dto;
   }

   @Transactional
   public ItemDTO updateItem(ItemDTO itemDTO) {

      Optional<ItemEntity> optional = itemRepository.findById(itemDTO.getId());

      if (!optional.isPresent()) {
         throw new RuntimeException("잘못된 정보에용1");
      }

      ItemEntity entity = optional.get();

      if (entity == null) {
         throw new RuntimeException("잘못된 정보에용");
      }

      entity.setItemName(itemDTO.getItemName());
      entity.setPrice(itemDTO.getPrice());
      entity.setDiscount(itemDTO.getDiscount());
      entity.setEa(itemDTO.getEa());
      entity.setItemDescribe(itemDTO.getItemDescribe());
      entity.setUpdateDate(new Date());
      entity.setItemType(itemDTO.getItemType());
      entity = itemRepository.save(entity);
      itemDTO = ItemDTO.toItemDTO(entity);

      return itemDTO;
   }

   public List<ItemDTO> findByItemType(String itemType) {
      List<ItemDTO> list_dto = new ArrayList<>();
      List<ItemEntity> list_entity = itemRepository.findByItemType(itemType);

      for (ItemEntity entity : list_entity) {
         list_dto.add(ItemDTO.toItemDTO(entity));
      }
      return list_dto;
   }

   @Transactional
   public void deleteItem(Long id) {
      itemRepository.deleteById(id);
   }

   public ItemDTO getReplys(Long id) {

      Optional<ItemEntity> optional = itemRepository.findById(id);

      if (!optional.isPresent()) {
         throw new RuntimeException("안돼");
      }

      ItemEntity itemEntity = optional.get();

      // ItemEntity itemEntity = itemRepository.findById(id);

      ItemDTO itemDTO = new ItemDTO();
      itemDTO = ItemDTO.toItemDTO(itemEntity);

      List<ReplyResponse> replyList = replyFeign.getReplysByBid(id);

      itemDTO.setReplyList(replyList);

      return itemDTO;
   }

   

}