package kr.co.tj.usinsafileservice.controller;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


import kr.co.tj.usinsafileservice.dto.FileDTO;
import kr.co.tj.usinsafileservice.dto.FileEntity;
import kr.co.tj.usinsafileservice.service.FileService;

@Controller
@RequestMapping("/file-service")
public class FileController {

	@Autowired
	private FileService fileService;

	// 이미지 파일 업로드
	@PostMapping("/fileUpload")
	public ResponseEntity<?> fileUpload(MultipartHttpServletRequest mRequest) {
		Map<String, Object> map = new HashMap<>();
		MultipartFile file = mRequest.getFile("file");
		String originalName = file.getOriginalFilename();
		String savedName = FileService.makeFilename(originalName);
		Date date = new Date();
		String uploaderId = mRequest.getParameter("uploaderId");
		String bid = mRequest.getParameter("bid");
		Long bid2 = Long.parseLong(bid);
		try {
			FileDTO dto = new FileDTO();
			dto.setBid(bid2);
			dto.setOriginalName(originalName);
			dto.setSavedName(savedName);
			dto.setUploadDate(date);
			dto.setUploaderId(uploaderId);
			byte[] bytes = file.getBytes();
			fileService.uploadFile(bytes, dto);
			bytes = Base64.encodeBase64(bytes);
			String strBytes = new String(bytes, "UTF-8");
			map.put("bytes", strBytes);
		} catch (Exception e) {
			e.printStackTrace();
		}
		map.put("result", "ok");
		return ResponseEntity.ok().body(map);
	}

	// 이미지 가져오기
	@GetMapping("image/{bid}")
	public ResponseEntity<?> fileDownload(@PathVariable("bid") Long bid) {
		byte[] bytes = fileService.fintByBid(bid);
		if (bytes != null) {
			ByteArrayResource resource = new ByteArrayResource(bytes);
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.IMAGE_JPEG);

			return ResponseEntity.ok().headers(headers).contentLength(bytes.length).body(resource);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	//이미지 삭제
	@DeleteMapping("fileDelete")
	public ResponseEntity<?> filedelete(@RequestBody FileDTO fileDTO) {
		Map<String, Object> map = new HashMap<>();

		// 조건 작성하면 작동하지 않음. 존재 유무로 삭제를 하게 해뒀음.


		fileService.delete(fileDTO.getBid());
		map.put("result", fileDTO);
		return ResponseEntity.ok().body(map);

	}

}
