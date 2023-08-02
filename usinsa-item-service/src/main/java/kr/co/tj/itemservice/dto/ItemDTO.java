package kr.co.tj.itemservice.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemDTO {
	
	private Long id;
	
	private String itemName;
	
	private Long price;
	
	private Long discount;
	
	private Long salePrice;
	
	private Long totalPrice;
	
	private String username;
	
	private Long ea;
	
	private String itemDescribe;
	
	private String itemType;
	
	private List<ReplyResponse> replyList;
	
	private Date createDate;
	private Date updateDate;
	
	private Long viewCount;
	
	
	public static ItemDTO toItemDTO(ItemRequest itemRequest) {
		// TODO Auto-generated method stub
		return ItemDTO.builder()
				.id(itemRequest.getId())
				.itemName(itemRequest.getItemName())
				.price(itemRequest.getPrice())
				.discount(itemRequest.getDiscount())
				.username(itemRequest.getUsername())
				.ea(itemRequest.getEa())
				.itemDescribe(itemRequest.getItemDescribe())
				.itemType(itemRequest.getItemType())
				.viewCount(itemRequest.getViewCount())
				.build();
	}




	public ItemEntity toItemEntity() {
		
		return ItemEntity.builder()
				.id(id)
				.itemName(itemName)
				.price(price)
				.discount(discount)
				.username(username)
				.ea(ea)
				.itemDescribe(itemDescribe)
				.itemType(itemType)
				.createDate(createDate)
				.updateDate(updateDate)
				.viewCount(viewCount)
				.build();
	}




	public ItemResponse toItemResponse() {
		
		return ItemResponse.builder()
				.id(id)
				.itemName(itemName)
				.price(price)
				.discount(discount)
				.salePrice(salePrice)
				.totalPrice(totalPrice)
				.username(username)
				.ea(ea)
				.itemDescribe(itemDescribe)
				.itemType(itemType)
				.createDate(createDate)
				.updateDate(updateDate)
				.replyList(replyList)
				.viewCount(viewCount)
				.build();
	}




	public static ItemDTO toItemDTO(ItemEntity entity) {

		return ItemDTO.builder()
				.id(entity.getId())
				.itemName(entity.getItemName())
				.price(entity.getPrice())
				.discount(entity.getDiscount())
				.username(entity.getUsername())
				.ea(entity.getEa())
				.itemDescribe(entity.getItemDescribe())
				.itemType(entity.getItemType())
				.createDate(entity.getCreateDate())
				.updateDate(entity.getUpdateDate())
				.viewCount(entity.getViewCount())
				.build();
	}




	public static ItemEntity toItemEntity(ItemDTO itemDTO) {
		// TODO Auto-generated method stub
		return ItemEntity.builder()
	            .id(itemDTO.getId())
	            .itemName(itemDTO.getItemName())
	            .price(itemDTO.getPrice())
	            .discount(itemDTO.getDiscount())
	            .username(itemDTO.getUsername())
	            .ea(itemDTO.getEa())
	            .itemDescribe(itemDTO.getItemDescribe())
	            .itemType(itemDTO.getItemType())
	            .createDate(itemDTO.getCreateDate())
	            .updateDate(itemDTO.getUpdateDate())
	            .viewCount(itemDTO.getViewCount())
	            .build();

	}

}
