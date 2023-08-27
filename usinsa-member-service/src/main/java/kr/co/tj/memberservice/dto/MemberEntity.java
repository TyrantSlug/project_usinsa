package kr.co.tj.memberservice.dto;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "members")
public class MemberEntity implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GenericGenerator(strategy = "uuid", name = "id-uuid")
	@GeneratedValue(generator = "id-uuid")
	private String id;
	
	@Column(nullable = false, unique = true)
	private String username;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String password;
	
	private Date createDate;
	
	private Date updateDate;
	
	private String token;
	
	@ColumnDefault("0")
	private int role;
	
	   private String phoneNumber;
	   private String address;
	   private String height;
	   private String weight;

}
