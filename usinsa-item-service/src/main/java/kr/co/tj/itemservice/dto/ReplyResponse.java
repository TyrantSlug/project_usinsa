package kr.co.tj.itemservice.dto;

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
public class ReplyResponse implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String username;
	private String content;	
	private Date createDate;
	private Date updateDate;
	private Long bid;
	
	
}
