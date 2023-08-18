package kr.co.tj.itemservice.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemResponse implements Serializable {

	private static final long serialVersionUID = 1L;
	
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

}
