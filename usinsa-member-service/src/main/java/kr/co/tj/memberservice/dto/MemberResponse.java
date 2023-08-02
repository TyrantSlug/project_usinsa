package kr.co.tj.memberservice.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MemberResponse implements Serializable {
	

	   private static final long serialVersionUID = 1L;

	   private String id;
	   private String username;
	   private String name;
	   private Date createDate;
	   private Date updateDate;
	   private String password;
	   private String password2;
	   private String orgPassword;
	   private String token;
	   private int role;
	   private List<OrderResponse> orderList;
	   private String phoneNumber;
	   private String address;
	   private String height;
	   private String weight;

	
	

}
