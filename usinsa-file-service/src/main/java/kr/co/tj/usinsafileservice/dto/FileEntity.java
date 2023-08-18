package kr.co.tj.usinsafileservice.dto;


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

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="file")
public class FileEntity {
	
	@Id // 기본키가 된다.
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private Long id;
	
	@Column(columnDefinition = "MediumBLOB")// 자료형을 꼭 "MediumBLOB")로 설정. 안 하면 TinyBlob이 되어서 용량이 너무 적어 업로드가 안 됨.
	private byte[] bytes;
	
	private String originalName;
	private String savedName;
	private Date uploadDate;
	private String uploaderId;
	private Long bid;
	
}

