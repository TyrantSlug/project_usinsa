package kr.co.tj.usinsaorderservice.dto;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="orders")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String username;
	
	@Column(nullable = false)
	private Long productId;
	
	@Column(nullable = false)
	private Long qty;
	
	@Column(nullable = false)
	private Long unitPrice;
	
	@Column(nullable = false)
	private Long totalPrice;
	
	@Column(nullable = false)
	private String productName;
	
	private Date createDate;
	private Date updateDate;

}
