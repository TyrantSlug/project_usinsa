package kr.co.tj.usinsaorderservice.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.tj.usinsaorderservice.dto.OrderEntity;



public interface OrderRepository extends JpaRepository<OrderEntity, Long>{

	List<OrderEntity> findByUsername(String username);

	OrderEntity findByProductId(String productId);

	Page<OrderEntity> findByUsername(String username, Pageable pageable);

}
