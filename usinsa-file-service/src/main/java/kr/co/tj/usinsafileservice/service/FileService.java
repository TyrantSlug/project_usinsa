package kr.co.tj.usinsafileservice.service;

import java.io.File;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import kr.co.tj.usinsafileservice.dto.FileDTO;
import kr.co.tj.usinsafileservice.dto.FileEntity;
import kr.co.tj.usinsafileservice.repository.FileRepository;

@Service
public class FileService {

	@Autowired
	private FileRepository fileRepository;

	// 아이템 이미지 파일 추가
	public FileEntity uploadFile(byte[] bytes, FileDTO dto) {
		FileEntity entity = FileEntity.builder().bytes(bytes).bytes(bytes).bid(dto.getBid())
				.originalName(dto.getOriginalName()).savedName(dto.getSavedName()).uploadDate(dto.getUploadDate())
				.uploaderId(dto.getUploaderId()).build();
		return fileRepository.save(entity);
	}

	public static String makeFilename(String orgFilename) {

		String uid = UUID.randomUUID().toString();
		String savedName = uid + "_" + orgFilename;

		return savedName;
	}

	public byte[] fintByBid(Long bid) {
		Optional<FileEntity> fileEntity = fileRepository.findByBid(bid);
		if (fileEntity.isPresent()) {
			FileEntity entity = fileEntity.get();
			return entity.getBytes();
		}
		return null;
	}

	@Transactional
	public void delete(Long bid) {

		fileRepository.deleteByBid(bid);
	}

}
