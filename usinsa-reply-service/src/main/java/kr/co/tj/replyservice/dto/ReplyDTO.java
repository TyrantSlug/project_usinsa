package kr.co.tj.replyservice.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyDTO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long id;
	private String username;
	private String content;	
	private Date createDate;
	private Date updateDate;
	private Long bid;
	private String productName;
	
	public ReplyEntity toReplyEntity() {
		return ReplyEntity.builder()
				.id(id)
				.username(username)
				.content(content)
				.createDate(createDate)
				.updateDate(updateDate)
				.bid(bid)
				.productName(productName)
				.build();
	}
	
	public static ReplyDTO toReplyDTO(ReplyEntity replyEntity) {
		return ReplyDTO.builder()
				.id(replyEntity.getId())
				.username(replyEntity.getUsername())
				.content(replyEntity.getContent())
				.createDate(replyEntity.getCreateDate())
				.updateDate(replyEntity.getUpdateDate())
				.bid(replyEntity.getBid())
				.productName(replyEntity.getProductName())
				.build();
	}

	
	//request는 클라이언트에서 서버로 전송되는 메시지이다.
	public static ReplyDTO toReplyDTO(ReplyRequest replyRequest) {
		// TODO Auto-generated method stub
		return ReplyDTO.builder()
				.id(replyRequest.getId())
				.username(replyRequest.getUsername())
				.content(replyRequest.getContent())
				.bid(replyRequest.getBid())
				.productName(replyRequest.getProductName())
				.build();
	}

	public ReplyResponse toReplyResponse() {
		// TODO Auto-generated method stub
		return ReplyResponse.builder()
				.id(id)
				.username(username)
				.content(content)
				.createDate(createDate)
				.updateDate(updateDate)
				.bid(bid)
				.productName(productName)
				.build();
	}
	
}
