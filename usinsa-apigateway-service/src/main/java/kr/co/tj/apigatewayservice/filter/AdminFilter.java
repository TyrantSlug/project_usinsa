package kr.co.tj.apigatewayservice.filter;


import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.cloud.gateway.filter.factory.GatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import kr.co.tj.apigatewayservice.filter.ManagerFilter.Config;
import reactor.core.publisher.Mono;

@Component
public class AdminFilter extends AbstractGatewayFilterFactory<AdminFilter.Config> {
	
	//private static final String SECRET_KEY = "aaaaaaaaaaaaaaaa";
	
	private Environment env;

	public AdminFilter(Environment env) {
		super(Config.class);
		
		this.env = env;
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
			
		
			
			String bearertoken = request.getHeaders().get(org.springframework.http.HttpHeaders.AUTHORIZATION).get(0);
			String token = bearertoken.replace("Bearer ", "");
			//String token = bearertoken.split(" ")[1];
			
			if(!haveAuthority(token)) {
				return onError(exchange, "권한이 없습니다.", HttpStatus.UNAUTHORIZED);
			}
			
			return chain.filter(exchange);
			
		};
	}


	
	private boolean haveAuthority(String token) {
		boolean isValid = false;
		String authority = null;
		
		try {
			Claims claims = Jwts.parser()
					.setSigningKey(env.getProperty("data.SECRET_KEY"))
					.parseClaimsJws(token)
					.getBody();	
			
			authority = (String)claims.get("authority");
		} catch (Exception e) {
			e.printStackTrace();
			isValid = false;
		}
		
		if(authority.equals("ROLE_ADMIN")) {
			isValid = true;
		}
		
		return isValid;
	}

	
	private Mono<Void> onError(ServerWebExchange exchange, String string, HttpStatus status) {
		ServerHttpResponse response = exchange.getResponse();
		response.setStatusCode(status);
		
		return response.setComplete();
	}

}
