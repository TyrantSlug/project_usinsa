package kr.co.tj.itemservice.dto;

import lombok.Data;

@Data
public class ItemRequest {

	private Long id;

	private String itemName;
	
	private Long price;
	
	private Long discount;
	
	private String username;
	
	private Long ea;
	
	private String itemDescribe;
	
	private String itemType;
	
	private Long viewCount;
	
}
