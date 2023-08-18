package kr.co.tj.memberservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.tj.memberservice.dto.MemberEntity;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {

	MemberEntity findByUsername(String username);

}
