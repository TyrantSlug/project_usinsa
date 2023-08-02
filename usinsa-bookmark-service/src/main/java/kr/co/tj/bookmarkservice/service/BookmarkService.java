package kr.co.tj.bookmarkservice.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import kr.co.tj.bookmarkservice.dto.BookmarkDTO;
import kr.co.tj.bookmarkservice.dto.BookmarkEntity;
import kr.co.tj.bookmarkservice.repository.BookmarkRepository;

@Service
public class BookmarkService {
	
	@Autowired
	private BookmarkRepository bookmarkRepository;

	public BookmarkDTO createBookmark(BookmarkDTO bookmarkDTO) {
		
		BookmarkEntity entity = new ModelMapper().map(bookmarkDTO, BookmarkEntity.class);
		
		entity.setCreateDate(new Date());
		
		entity = bookmarkRepository.save(entity);
		
		return new ModelMapper().map(entity, BookmarkDTO.class);
	}

	public BookmarkDTO findByBidAndUsername(Long bid, String username) {
		
		Optional<BookmarkEntity> optional = bookmarkRepository.findByBidAndUsername(bid, username);
		BookmarkEntity entity = optional.get();
		
		return new ModelMapper().map(entity, BookmarkDTO.class);
	}

	public List<BookmarkDTO> findByUsername(String username, int pageNum) {
		
		List<Sort.Order> sortList = new ArrayList<>();
		sortList.add(Sort.Order.desc("id"));
		
		Pageable pageable = PageRequest.of(pageNum, 20, Sort.by(sortList));
		Page<BookmarkEntity> pageItem = bookmarkRepository.findByUsername(username, pageable);
		
		List<BookmarkEntity> list_entity = pageItem.getContent();
		List<BookmarkDTO> list_dto = new ArrayList<>();
		
		for(BookmarkEntity x: list_entity) {
			BookmarkDTO dto = new ModelMapper().map(x, BookmarkDTO.class);
			list_dto.add(dto);
		}
		
		return list_dto;
	}

	@Transactional
	public void delete(Long bid) {
		bookmarkRepository.deleteByBid(bid);
	}

}
