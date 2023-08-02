package kr.co.tj.bookmarkservice.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.tj.bookmarkservice.dto.BookmarkEntity;

public interface BookmarkRepository extends JpaRepository<BookmarkEntity, Long> {

	Optional<BookmarkEntity> findByBidAndUsername(Long bid, String username);

	Page<BookmarkEntity> findByUsername(String username, Pageable pageable);

	void deleteByBid(Long bid);
	
	

}
