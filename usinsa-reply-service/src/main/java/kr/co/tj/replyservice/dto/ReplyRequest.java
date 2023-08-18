package kr.co.tj.replyservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyRequest{
	
	private Long id;
	private String username;
	private String content;	
	private Long bid;
	private String productName;
	
	
}
