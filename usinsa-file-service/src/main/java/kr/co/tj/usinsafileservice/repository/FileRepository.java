package kr.co.tj.usinsafileservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.tj.usinsafileservice.dto.FileEntity;

public interface FileRepository extends JpaRepository<FileEntity, Long> {

	FileEntity findByBid(Long bid);

	void deleteByBid(Long bid);

}
