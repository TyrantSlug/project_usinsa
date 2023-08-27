package kr.co.tj.usinsafileservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.tj.usinsafileservice.dto.FileEntity;

public interface FileRepository extends JpaRepository<FileEntity, Long> {

	Optional<FileEntity> findByBid(Long bid);

	void deleteByBid(Long bid);

}
