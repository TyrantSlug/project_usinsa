package kr.co.tj.memberservice.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberRequest  {
	
	
	private String username;
	
	private String name;
	
	private String password;
	private String password2;
	private String orgPassword;
	
	private int role;

   private String phoneNumber;
   private String address;
   private String height;
   private String weight;



}
