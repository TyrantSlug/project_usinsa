package kr.co.tj.bookmarkservice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tj.bookmarkservice.dto.BookmarkDTO;
import kr.co.tj.bookmarkservice.service.BookmarkService;

@RestController
@RequestMapping("/bookmark-service")
public class BookmarkController {
	
	@Autowired
	private BookmarkService bookmarkService;
	
	
	@PostMapping("/createBookmark")
	public ResponseEntity<?> createBookmark(@RequestBody BookmarkDTO bookmarkDTO){
		Map<String, Object> map = new HashMap<>();
		
		try {
			bookmarkDTO = bookmarkService.createBookmark(bookmarkDTO);
			map.put("result", bookmarkDTO);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "등록 실패");
			return ResponseEntity.badRequest().body(map);
		}
		
	}
	
	@GetMapping("/bid/{bid}/username/{username}")
	public ResponseEntity<?> findByBidAndUsername(@PathVariable Long bid, @PathVariable String username){
		Map<String, Object> map = new HashMap<>();
		
		try {
			BookmarkDTO bookmarkDTO = bookmarkService.findByBidAndUsername(bid, username);
			map.put("result", bookmarkDTO);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "실패");
			return ResponseEntity.badRequest().body(map);
		}
		
	}
	
	@GetMapping("/username")
	public ResponseEntity<?> findByUsername(@RequestParam("username") String username, @RequestParam("pageNum") int pageNum){
		
		try {
			List<BookmarkDTO> list = bookmarkService.findByUsername(username, pageNum);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(e);
		}
	}
	
	@DeleteMapping("deleteBookmark")
	public ResponseEntity<?> deleteBookmark(@RequestBody BookmarkDTO bookmarkDTO){
		Map<String, Object> map = new HashMap<>();
		bookmarkService.delete(bookmarkDTO.getBid());
		map.put("result", bookmarkDTO);
		return ResponseEntity.ok().body(map);
	}

}
