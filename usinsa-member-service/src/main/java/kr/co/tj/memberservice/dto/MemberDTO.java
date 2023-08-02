package kr.co.tj.memberservice.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDTO implements Serializable {
   

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

   public static MemberDTO toMemberDTO(MemberRequest memberRequest) {
      return MemberDTO.builder()
            .username(memberRequest.getUsername())
            .name(memberRequest.getName())
            .password(memberRequest.getPassword())
            .password2(memberRequest.getPassword2())
            .orgPassword(memberRequest.getOrgPassword())
            .role(memberRequest.getRole())
            .phoneNumber(memberRequest.getPhoneNumber())
            .address(memberRequest.getAddress())
            .height(memberRequest.getHeight())
            .weight(memberRequest.getWeight())
            .build();

   }

   public MemberResponse toMemberResponse() {
      return MemberResponse.builder()
            .username(username)
            .name(name)
            .createDate(createDate)
            .updateDate(updateDate)
            .password(password)
            .password2(password2)
            .orgPassword(orgPassword)
            .token(token)
            .role(role)
            .phoneNumber(phoneNumber)
            .address(address)
            .height(height)
            .weight(weight)
            .orderList(orderList)
            .build();
   }

   public MemberEntity toMemberEntity() {
      return MemberEntity.builder()
            .id(id)
            .username(username)
            .name(name)
            .createDate(createDate)
            .updateDate(updateDate)
            .password(password)
            .role(role)
            .phoneNumber(phoneNumber)
            .address(address)
            .height(height)
            .weight(weight)
            .build();
   }

   public MemberDTO toMemberDTO(MemberEntity memberEntity) {
      this.id = memberEntity.getId();
      this.username = memberEntity.getUsername();
      this.name = memberEntity.getName();
      this.createDate = memberEntity.getCreateDate();
      this.updateDate = memberEntity.getUpdateDate();
      this.password = memberEntity.getPassword();
      this.role = memberEntity.getRole();
      this.token= memberEntity.getToken();
      this.phoneNumber = memberEntity.getPhoneNumber();
      this.address = memberEntity.getAddress();
      this.height = memberEntity.getHeight();
      this.weight = memberEntity.getWeight();
      
      
      
      return this;
   }
   
	public static MemberDTO toMemberDTO(MemberLoginRequest memberLoginRequest) {
		// TODO Auto-generated method stub
		return MemberDTO.builder()
				.username(memberLoginRequest.getUsername())
				.password(memberLoginRequest.getPassword())
				.build();
	}

}