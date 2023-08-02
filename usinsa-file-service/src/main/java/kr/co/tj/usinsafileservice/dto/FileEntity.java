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
	
	@Column(nullable = false)
	private String originalName;
	private String savedName;
	private Date uploadDate;
	private String uploaderId;
	private String dbsaveFilename;
	private Long bid;
	
}
