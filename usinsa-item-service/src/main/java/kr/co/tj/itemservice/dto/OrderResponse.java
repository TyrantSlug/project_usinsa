package kr.co.tj.itemservice.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse implements Serializable{/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	private String username;
	private Long productId;
	private Long qty;
	private Long unitPrice;
	private Long totalPrice;
	private Date createDate;
	private Date updateDate;
}
