package kr.co.tj.usinsafileservice.dto;


import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileDTO {
	
	private Long id;
	private String originalName;
	private String savedName;
	private Date uploadDate;
	private String uploaderId;
	private byte[] bytes;
	private Long bid;
	

}
