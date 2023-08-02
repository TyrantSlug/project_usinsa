package kr.co.tj.apigatewayservice.filter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import reactor.core.publisher.Mono;

@Component
public class AuthorizationFilter extends AbstractGatewayFilterFactory<AuthorizationFilter.Config> {
	
	//private static final String SECRET_KEY = "aaaaaaaaaaaaaaaa";
	
	private Environment env;
	
	@Autowired
	public AuthorizationFilter(Environment env) {
		super(Config.class);
		
		this.env = env;
	}
	
	public AuthorizationFilter() {
		super(Config.class);
	}
	
//	@Data
	public static class Config{
//		private Integer num1;
//		private Integer num2;
	}

	@Override
	public GatewayFilter apply(Config config) {
		
//		System.out.println(config.num1);
		// TODO Auto-generated method stub
		return (exchange, chain) ->{
			ServerHttpRequest request = exchange.getRequest(); // reactive 패키지명 확인
			
			if(!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
				return onError(exchange, "authorization 키가 없습니다.", HttpStatus.UNAUTHORIZED);
			}
			
			String bearertoken = request.getHeaders().get(org.springframework.http.HttpHeaders.AUTHORIZATION).get(0);
			String token = bearertoken.replace("Bearer ", "");
			//String token = bearertoken.split(" ")[1];
			
			if(!isJwtValid(token)) {
				return onError(exchange, "토큰이 유효하지 않습니다.", HttpStatus.UNAUTHORIZED);
			}
			
			return chain.filter(exchange);
			
		};
	}

	private boolean isJwtValid(String token) {
		boolean isValid = true;
		String subject = null;
		
		try {
			subject = Jwts.parser().setSigningKey(env.getProperty("data.SECRET_KEY"))
			.parseClaimsJws(token).getBody().getSubject();
			
		} catch (Exception e) {
			e.printStackTrace();
			isValid = false;
		}
		
		if(subject == null || subject.isEmpty()) {
			isValid = false;
		}
		
		return isValid;
	}

	
	public String validateAndAuthority(String token) {

		Claims claims = Jwts.parser()
		.setSigningKey(env.getProperty("data.SECRET_KEY"))
		.parseClaimsJws(token)
		.getBody(); // 유효성 검사
		
		return (String)claims.get("authority");
	}
	
	private Mono<Void> onError(ServerWebExchange exchange, String string, HttpStatus status) {
		ServerHttpResponse response = exchange.getResponse();
		response.setStatusCode(status);
		
		return response.setComplete();
	}

}
