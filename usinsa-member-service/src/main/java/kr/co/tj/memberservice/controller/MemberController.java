package kr.co.tj.memberservice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tj.memberservice.dto.MemberDTO;
import kr.co.tj.memberservice.dto.MemberLoginRequest;
import kr.co.tj.memberservice.dto.MemberRequest;
import kr.co.tj.memberservice.dto.MemberResponse;
import kr.co.tj.memberservice.service.MemberService;

@RestController
@RequestMapping("/member-service")
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private Environment env;
 // //
	@GetMapping("/checkid")
	public ResponseEntity<?> checkId(String username) {
		
		Map<String, Object> map = new HashMap<>();
		map.put("result", memberService.checkByUsername(username));
		return ResponseEntity.ok().body(map);

	}
	
	@GetMapping("/member/orders/{username}")
	public ResponseEntity<?> getOrders(@PathVariable("username") String username) {
		MemberDTO memberDTO = memberService.getOrders(username);

		MemberResponse memberResponse = memberDTO.toMemberResponse();

		return ResponseEntity.status(HttpStatus.OK).body(memberResponse);
	}
	
	@PutMapping("/members/user/password")
	public ResponseEntity<?> updatePassword(@RequestBody MemberRequest memberRequest) {

		MemberDTO memberDTO = MemberDTO.toMemberDTO(memberRequest);
		
		
		if (memberDTO == null) {
			return ResponseEntity.badRequest().body("something wrong1");
		}

		if (memberDTO.getOrgPassword() == null) {
			return ResponseEntity.badRequest().body("something wrong2");
		}

		if (memberDTO.getUsername() == null) {
			return ResponseEntity.badRequest().body("something wrong3");
		}

		String password = memberDTO.getPassword();
		String password2 = memberDTO.getPassword2();

		if (password == null) {
			return ResponseEntity.badRequest().body("something wrong4");
		}

		if (password2 == null) {
			return ResponseEntity.badRequest().body("something wrong5");
		}

		if (!password.equals(password2)) {
			return ResponseEntity.badRequest().body("something wrong6");
		}

		try {
			memberDTO = memberService.updatePassword(memberRequest);
			MemberResponse memberResponse = memberDTO.toMemberResponse();
			return ResponseEntity.status(HttpStatus.OK).body(memberResponse);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비번 수정 실패");
		}

	}
	
	@GetMapping("/test")
	public ResponseEntity<?> test(){
		System.out.println("제발");
		return ResponseEntity.status(HttpStatus.OK).body(new MemberResponse());
	}

//status	
	@GetMapping("/health_check")
	public String status() {
		return "서버 확인"+":"+env.getProperty("data.test");
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody MemberLoginRequest memberLoginRequest){
		
		if(memberLoginRequest.getUsername() == null || memberLoginRequest.getUsername().isEmpty()) {
			return ResponseEntity.ok().body("아이디");
		}
		if(memberLoginRequest.getPassword() == null || memberLoginRequest.getPassword().isEmpty()) {
			return ResponseEntity.ok().body("비번");
		}
		MemberDTO memberDTO = MemberDTO.toMemberDTO(memberLoginRequest);
		
		memberDTO = memberService.login(memberDTO);
		
		System.out.println("::::::::::::::::::::::::::::::::::::::");
		System.out.println(memberDTO);
		
		if(memberDTO == null) {
			return ResponseEntity.ok().body("실패");
		}
		
		MemberResponse memberResponse = memberDTO.toMemberResponse();
		
		return ResponseEntity.status(HttpStatus.OK).body(memberResponse);
	}
	
	// 회원가입
	@PostMapping("/members")
	public ResponseEntity<?> createMember(@RequestBody MemberRequest memberRequest){
		MemberDTO memberDTO = MemberDTO.toMemberDTO(memberRequest);
		
		memberDTO = memberService.createMember(memberDTO);
		MemberResponse memberResponse = memberDTO.toMemberResponse();
		
		return ResponseEntity.status(HttpStatus.CREATED).body(memberResponse);
	}
	
	
	@PutMapping("/members/user/username")
	public ResponseEntity<?> updateMember(@RequestBody MemberRequest memberRequest){
		Map<String, Object> map = new HashMap<>();
		
		MemberDTO dto= MemberDTO.toMemberDTO(memberRequest);
		
		dto = memberService.updateMember(dto);
//		map.put("result", dto);
//		return ResponseEntity.ok().body(map);
		
		MemberResponse memberResponse = dto.toMemberResponse();
		
		return ResponseEntity.status(HttpStatus.OK).body(memberResponse);
		
	}
	
	// 회원 삭제
	@DeleteMapping("/members/delete")
	public ResponseEntity<?> deleteMember(@RequestBody MemberResponse memberResponse){
		Map<String, Object> map = new HashMap<>();
		
		if(memberResponse == null) {
			return ResponseEntity.status(HttpStatus.OK).body("해당회원은 존재하지않습니다.");
		}
		
		try {
			memberService.deleteMember(memberResponse);
			map.put("result", "삭제완료");
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("result", "삭제실패");
			return ResponseEntity.badRequest().body(map);
		}
		
	}
	
	@GetMapping("/members/username/{username}")
	public ResponseEntity<?> findByUsername(@PathVariable("username") String username){
		if(username == null) {
			return ResponseEntity.status(HttpStatus.OK).body("정보 없음.");
		}
		
		MemberDTO dto= memberService.findByUsername(username);
		
		MemberResponse memberResponse = dto.toMemberResponse();
		
		return ResponseEntity.status(HttpStatus.OK).body(memberResponse);
		
	}
	
	@GetMapping("/members/all")
	public ResponseEntity<?> findAllMembers(){
		Map<String, Object> map = new HashMap<>();
		
		try {
			List<MemberResponse> memberList = memberService.findAll();
			map.put("result", memberList);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("result", "회원 리스트를 불러오지 못했습니다");
			return ResponseEntity.badRequest().body(map);
		}
	}

}
