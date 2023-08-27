package kr.co.tj.memberservice.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import kr.co.tj.memberservice.dto.MemberEntity;

@Component
public class TokenProvider {
	
//	private static final String SECRET_KEY = "aaaaaaaaaaaaaaaa";
	
	private Environment env;
	
	
	public TokenProvider(Environment env) {
		this.env = env;
	}

	public String create(MemberEntity memberEntity) {
		
		String[] arr = {"ROLE_USER", "ROLE_MANAGER", "ROLE_ADMIN"};
		String authority = arr[memberEntity.getRole()];
		
		long now = System.currentTimeMillis();
		
		Date today = new Date(now);
		Date expireDate = new Date(now+1000*1*60*60*24); // 1000*1*60*60*24 == 24시간
		
		return Jwts.builder()
				.signWith(SignatureAlgorithm.HS512, env.getProperty("data.SECRET_KEY"))
				.setSubject(memberEntity.getUsername())
				.setIssuer("member-service")
				.setIssuedAt(today) // 발행일
				.setExpiration(expireDate) // 만료일
				.claim("authority", authority)
//				.setClaims(claims)
				.compact();
	}
	

	
}
