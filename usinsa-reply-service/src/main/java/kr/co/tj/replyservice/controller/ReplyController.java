package kr.co.tj.replyservice.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tj.replyservice.dto.ReplyDTO;
import kr.co.tj.replyservice.dto.ReplyRequest;
import kr.co.tj.replyservice.dto.ReplyResponse;
import kr.co.tj.replyservice.service.ReplyService;

@RestController
@RequestMapping("/reply-service")
public class ReplyController {
	
	@Autowired
	private ReplyService replyService;
	

//	댓글 페이지네이션 코드
//	@GetMapping("/bid")
//	public ResponseEntity<?> listByBid(@RequestParam Long bid, @RequestParam int pageNum) {
//	    Map<String, Object> map = new HashMap<>();
//	    Page<ReplyDTO> page = replyService.findByBid(bid, pageNum);
//	    map.put("result", page);
//	    return ResponseEntity.ok().body(map);
//	}
	
	@Autowired
	private Environment env;
	
	@GetMapping("replys/username")
	   public ResponseEntity<?> listByUsername(@RequestParam("username") String username, @RequestParam("pageNum") int pageNum) {
	      Map<String, Object> map = new HashMap<>();

	      Page<ReplyDTO> page = replyService.findByUsername(username, pageNum);
	      map.put("result", page);

	      return ResponseEntity.ok().body(map);
	   }
	
	
	
	   @GetMapping("replys/bid")
	   public ResponseEntity<?> listByBid(@RequestParam("bid") Long bid, @RequestParam("pageNum") int pageNum) {
	       Map<String, Object> map = new HashMap<>();
	       
	       Page<ReplyDTO> page = replyService.findByBid(bid, pageNum);
	       
	       map.put("result", page);
	       
	       return ResponseEntity.ok().body(map);
	   }

	
	@GetMapping("/health_check")
	public String status() {
		return "reply service입니다."+env.getProperty("local.server.port");
	}
	
	@GetMapping("/all/{bid}")
	public ResponseEntity<?> findByBId(@PathVariable("bid") Long bid){
	
		List<ReplyResponse> responseList = new ArrayList<>();
		
//		if ( bid == null) {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 접근입니다.");
//		}
		
		try {
			List<ReplyDTO> list = replyService.findByBId(bid);
			
			for (ReplyDTO replyDTO : list) {
				ReplyResponse replyResponse = replyDTO.toReplyResponse();
				responseList.add(replyResponse);
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(responseList);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		
		
	}

	
	
	// 댓글 입력
	@PostMapping("/user/replys")
	public ResponseEntity<?> insert(@RequestBody ReplyRequest replyRequest){

		if (replyRequest == null 
				|| replyRequest.getUsername() == null 
				|| replyRequest.getUsername().isEmpty()
				|| replyRequest.getContent() == null
				|| replyRequest.getContent().isEmpty()) {
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 접근입니다.");
		}
			
			
		try {
			ReplyDTO replyDTO = ReplyDTO.toReplyDTO(replyRequest);
			replyDTO = replyService.insert(replyDTO);
			ReplyResponse replyResponse = replyDTO.toReplyResponse();
			
			return ResponseEntity.status(HttpStatus.CREATED).body(replyResponse);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
}
	

	// 댓글 id로 검색해서 불러오기
	@GetMapping("/id/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Long id){
		
		if ( id == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("실패했습니다.");
		}
		
		try {
			ReplyDTO replyDTO = replyService.findById(id);
			ReplyResponse replyResponse = replyDTO.toReplyResponse();

			return ResponseEntity.status(HttpStatus.OK).body(replyResponse);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
//	// 특정 게시글(bid)에 있는 모든 댓글 불러오기
//	@GetMapping("/all/{bid}")
//	public ResponseEntity<?> findByBId(@PathVariable("bid") Long bid){
//	
//		List<ReplyResponse> responseList = new ArrayList<>();
//		
//		if ( bid == null) {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 접근입니다.");
//		}
//		
//		try {
//			List<ReplyDTO> list = replyService.findByBId(bid);
//			return ResponseEntity.status(HttpStatus.OK).body(list);
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//		}
//		
//		
//	}
	

	// 특정 유저가 작성한 모든 댓글 불러오기
	@GetMapping("/username/{username}")
	public ResponseEntity<?> findByUsername(@PathVariable("username") String username){
		
		
		if ( username == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 접근입니다.");
		}
		
		try {
			List<ReplyDTO> list = replyService.findByUsername(username);
			return ResponseEntity.status(HttpStatus.OK).body(list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		
	}
	

	// 댓글 수정하기
	@PutMapping("/user")
	public ResponseEntity<?> update(@RequestBody ReplyRequest replyRequest){
		
		if (replyRequest == null 
				|| replyRequest.getId() == null
				|| replyRequest.getId() == 0L
				|| replyRequest.getUsername() == null
				|| replyRequest.getUsername().isEmpty()
				|| replyRequest.getContent() == null
				|| replyRequest.getContent().isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 접근입니다.");
		}

		try {
			ReplyDTO replyDTO = ReplyDTO.toReplyDTO(replyRequest);
			replyDTO = replyService.update(replyDTO);
			ReplyResponse replyResponse = replyDTO.toReplyResponse();
			
			return ResponseEntity.status(HttpStatus.OK).body(replyResponse);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}	
	}
	
	
	
	// 댓글 삭제하기
	@DeleteMapping("/user")
	public ResponseEntity<?> delete(@RequestBody ReplyRequest replyRequest){

		if (replyRequest == null
				|| replyRequest.getId() == null
				|| replyRequest.getId() == 0L) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 접근입니다.");
		}

		try {
			ReplyDTO replyDTO = ReplyDTO.toReplyDTO(replyRequest);
			replyService.delete(replyDTO.getId());
			ReplyResponse replyResponse = replyDTO.toReplyResponse();
			
			return ResponseEntity.status(HttpStatus.OK).body(replyResponse);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
}
