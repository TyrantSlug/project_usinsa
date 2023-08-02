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
	private String dbsaveFilename;
	private Long bid;
	
	public static FileDTO toFileDTO(FileEntity fileEntity) {
		// TODO Auto-generated method stub
		return FileDTO.builder()
				.id(fileEntity.getId())
				.originalName(fileEntity.getOriginalName())
				.savedName(fileEntity.getSavedName())
				.uploadDate(fileEntity.getUploadDate())
				.uploaderId(fileEntity.getUploaderId())
				.dbsaveFilename(fileEntity.getDbsaveFilename())
				.bid(fileEntity.getBid())
				.build();
	}


}
