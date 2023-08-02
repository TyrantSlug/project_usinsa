package kr.co.tj.usinsaorderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {
	
	private Long id;
	private String username;	
	private Long productId;
	private Long qty;
	private Long unitPrice;
	private String productName;

}
