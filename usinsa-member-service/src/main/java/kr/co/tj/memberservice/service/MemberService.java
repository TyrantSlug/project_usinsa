package kr.co.tj.memberservice.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.google.common.base.Optional;

import kr.co.tj.memberservice.dto.MemberDTO;
import kr.co.tj.memberservice.dto.MemberEntity;
import kr.co.tj.memberservice.dto.MemberRequest;
import kr.co.tj.memberservice.dto.MemberResponse;
import kr.co.tj.memberservice.dto.OrderResponse;
import kr.co.tj.memberservice.feign.OrderFeign;
import kr.co.tj.memberservice.repository.MemberRepository;

@Service
public class MemberService {

	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private TokenProvider tokenProvider;
	
	@Autowired
	private OrderFeign orderFeign;
// // // 	
	
	public String checkByUsername(String username) {

		MemberEntity entity = memberRepository.findByUsername(username);

		if (entity == null) {
			return "사용 가능";
		} else {
			return "사용 불가";
		}
	}

	public MemberDTO createMember(MemberDTO memberDTO) {
		memberDTO = getDate(memberDTO);
		
		MemberEntity memberEntity = memberDTO.toMemberEntity();
		
		memberEntity.setPassword(passwordEncoder.encode(memberEntity.getPassword()));
		memberEntity.setCreateDate(new Date());
		memberEntity.setUpdateDate(new Date());
		
		memberEntity = memberRepository.save(memberEntity);
		
		return memberDTO.toMemberDTO(memberEntity);
	}

	private MemberDTO getDate(MemberDTO memberDTO) {
		Date date = new Date();
		
		if(memberDTO.getCreateDate() == null) {
			memberDTO.setCreateDate(date);
		}
		
		memberDTO.setUpdateDate(date);
		return memberDTO;
	}

	public MemberEntity getMemberByUsername(String username) {
		// TODO Auto-generated method stub
		return memberRepository.findByUsername(username);
	}

//	@Transactional
//	public MemberResponse updateMember(MemberResponse memberResponse) {
//		MemberEntity memberEntity = memberRepository.findByUsername(memberResponse.getUsername());
//		
//		if(memberEntity == null) {
//			throw new RuntimeException("");
//		}
//		
//		memberEntity.setName(memberResponse.getName());
//		memberEntity.setUpdateDate(new Date());
//		memberEntity.setAddress(memberResponse.getAddress());
//		memberEntity.setHeight(memberResponse.getHeight());
//		memberEntity.setPhoneNumber(memberResponse.getPhoneNumber());
//		memberEntity.setWeight(memberResponse.getWeight());
//		memberEntity = memberRepository.save(memberEntity);
//		dto = MemberDTO.toM(memberEntity);
//
//		return memberEntity;
//	}
	
	public MemberDTO updateMember(MemberDTO dto) {
		
		MemberEntity entity = memberRepository.findByUsername(dto.getUsername());

		if (entity == null) {
			throw new RuntimeException("");
		}
		
		if(!passwordEncoder.matches(dto.getPassword(), entity.getPassword())) {
			throw new RuntimeException("비밀번호가 다름.");
		}

		entity.setName(dto.getName());
		entity.setPhoneNumber(dto.getPhoneNumber());
		entity.setAddress(dto.getAddress());
		entity.setHeight(dto.getHeight());
		entity.setWeight(dto.getWeight());
		entity.setUpdateDate(new Date());
		entity = memberRepository.save(entity);
		
		dto.setId(null);
		dto.setPassword(null);
		
//		MemberDTO memberDTO = new MemberDTO();
		dto = dto.toMemberDTO(entity);

		return dto;
	}

	public void deleteMember(MemberResponse memberResponse) {
		MemberEntity memberEntity = memberRepository.findByUsername(memberResponse.getUsername());
		
		if(memberEntity == null) {
			throw new RuntimeException("삭제 실패");
		}
		
		memberRepository.delete(memberEntity);
	}

	public List<MemberResponse> findAll() {
		List<MemberEntity> memberEntity = memberRepository.findAll();
		List<MemberResponse> memberResponse = new ArrayList<>();
		
		for (MemberEntity e : memberEntity) {
			memberResponse.add(new ModelMapper().map(e, MemberResponse.class));;
		}

		return memberResponse;
	}

	public MemberDTO login(MemberDTO memberDTO) {

		MemberEntity memberEntity = memberRepository.findByUsername(memberDTO.getUsername());
		if(memberEntity == null) {
			throw new RuntimeException("해당 회원이 없어서 로그인 거부");
		}
		
		System.out.println(memberEntity);
		if(!passwordEncoder.matches(memberDTO.getPassword(), memberEntity.getPassword())) {
			throw new RuntimeException("비밀번호 틀림");
		}
		
		String token = tokenProvider.create(memberEntity);
		
		memberDTO.setToken(token);
		
		memberDTO = memberDTO.toMemberDTO(memberEntity);
		memberDTO.setToken(token);
		
		
		return memberDTO;
	}

	public MemberDTO updatePassword(MemberRequest memberRequest) {
		
		MemberDTO memberDTO = MemberDTO.toMemberDTO(memberRequest);
		
		MemberEntity entity = memberRepository.findByUsername(memberDTO.getUsername());

		if (entity == null) {
			throw new RuntimeException("에러");
		}

		if(!passwordEncoder.matches(memberDTO.getOrgPassword(), entity.getPassword())) {
			throw new RuntimeException("비밀번호 틀림");
		}
		
		entity.setPassword(passwordEncoder.encode(memberDTO.getPassword()));
		entity.setUpdateDate(new Date());

		entity = memberRepository.save(entity);

		memberDTO = memberDTO.toMemberDTO(entity);
		
		memberDTO.setId(null);
		memberDTO.setPassword(null);

		return memberDTO;
	
	}

	public MemberDTO getOrders(String username) {
		 MemberEntity memberEntity = memberRepository.findByUsername(username);
	      if(memberEntity == null) {
	         throw new RuntimeException("존재하지 않는 사용자입니다.");
	      }
	      
	      MemberDTO memberDTO = new MemberDTO();
	      memberDTO = memberDTO.toMemberDTO(memberEntity);
	      
	      List<OrderResponse> orderList = orderFeign.getOrdersByUsername(username);
	      
	      memberDTO.setOrderList(orderList);
	      
	      return memberDTO;

	}

	public MemberDTO findByUsername(String username) {
		
		if(username == null) {
			throw new RuntimeException("유저네임 오류");
		}
		
		MemberEntity entity = memberRepository.findByUsername(username);
		
		MemberDTO dto = new MemberDTO();
		
		dto = dto.toMemberDTO(entity);
		dto.setId(null);
		dto.setPassword(null);
		
		return dto;
	}

	
}
