package kr.co.tj.usinsafileservice.controller;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
import kr.co.tj.usinsafileservice.repository.FileRepository;
import kr.co.tj.usinsafileservice.service.FileService;

@Controller
@RequestMapping("/file-service")
public class FileController {

	@Autowired
	private FileService fileService;

	@Autowired
	private FileRepository fileRepository;

	@GetMapping("/image/{bid}")
	public ResponseEntity<?> findByBId(@PathVariable("bid") Long bid) {

		Map<String, Object> map = new HashMap<>();

		FileDTO fileDTO = fileService.findByBId(bid);
		map.put("result", fileDTO);
		return ResponseEntity.ok().body(map);
	}
	
	@DeleteMapping("/filedelete")
	public ResponseEntity<?> filedelete(@RequestBody FileDTO fileDTO){
		Map<String, Object> map = new HashMap<>();
		
		fileService.delete(fileDTO.getBid());
		map.put("result", fileDTO);
		return ResponseEntity.ok().body(map);
		
	}
	
	@PostMapping("/fileupload")
	public String fileupload(MultipartHttpServletRequest mRequest) {
	    MultipartFile file = mRequest.getFile("file");
	    String orgFilename = file.getOriginalFilename();

	    // 파일이 저장될 경로 설정
	    File path = new File("C:"+ File.separator + File.separator + "workspace" + File.separator +
	            "workspace_react" + File.separator + "umsfront" + File.separator + "public" + File.separator + "img");

	    if (!path.exists()) {
	        path.mkdirs();
	    }

	    
	    String datePath = FileService.makePath(path.getPath());
	    String savedName = FileService.makeFilename(orgFilename);

	    try {
	        file.transferTo(new File(path + datePath, savedName));
	        String dbsaveFilename = datePath + File.separator + savedName;
	    
	        // 파일 정보를 DB에 저장하는 코드 추가
	        
	        Date date = new Date();
	        
	        dbsaveFilename = dbsaveFilename.replace(File.separatorChar, '/');
	        
	        System.out.println(dbsaveFilename);
			
			FileEntity fileEntity = new FileEntity();
					
		    fileEntity.setOriginalName(orgFilename);
		    fileEntity.setSavedName(savedName);
		    fileEntity.setUploadDate(date);
		    fileEntity.setDbsaveFilename(dbsaveFilename);

		    String uploaderId = mRequest.getParameter("uploaderId");
		    String bid = mRequest.getParameter("bid");
	        Long bid2 =  Long.parseLong(bid);

	        fileEntity.setUploaderId(uploaderId);
	        fileEntity.setBid(bid2);

		    fileRepository.save(fileEntity); // 파일 정보를 db에 저장합니다.
		           
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    return null;
	}
	

}
