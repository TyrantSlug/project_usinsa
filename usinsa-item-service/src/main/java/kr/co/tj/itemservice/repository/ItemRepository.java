package kr.co.tj.itemservice.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.tj.itemservice.dto.ItemEntity;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {

	List<ItemEntity> findByUsername(String username);

	List<ItemEntity> findByItemType(String itemType);

	Page<ItemEntity> findByItemType(String itemType, Pageable pageable);

	List<ItemEntity> findByitemNameContaining(String keyword);

	Page<ItemEntity> findByUsername(String username, Pageable pageable);

	Page<ItemEntity> findByitemNameContaining(String keyword, Pageable pageable);

}
