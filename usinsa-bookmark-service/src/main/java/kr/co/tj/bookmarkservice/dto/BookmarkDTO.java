package kr.co.tj.bookmarkservice.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookmarkDTO {
	
	private Long id;
	private String itemName;
	private String username;
	private String sellerName;
	private Long bid;
	private Date createDate;

}
