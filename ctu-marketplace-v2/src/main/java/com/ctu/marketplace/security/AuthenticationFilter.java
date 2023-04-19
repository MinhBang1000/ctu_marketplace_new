// package com.ctu.marketplace.security;

// import java.io.IOException;
// import java.util.ArrayList;
// import java.util.Date;

// import javax.servlet.FilterChain;
// import javax.servlet.ServletException;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;

// import com.ctu.marketplace.dto.request.LoginDto;
// import com.ctu.marketplace.dto.response.LoginResponseDto;
// import com.ctu.marketplace.dto.response.Response;
// import com.fasterxml.jackson.databind.ObjectMapper;

// import org.json.JSONObject;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;

// public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {
// 	private final AuthenticationManager authenticationManager;

// 	public AuthenticationFilter(AuthenticationManager authenticationManager) {
// 		this.authenticationManager = authenticationManager;
// 	}

// 	@Override
// 	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
// 			throws AuthenticationException {
// 		try {
// 			LoginDto creds = new ObjectMapper()
// 					.readValue(request.getInputStream(), LoginDto.class);
// 			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(creds.getUsername(),
// 					creds.getPassword(), new ArrayList<>()));
// 		} catch (IOException e) {
// 			throw new RuntimeException();
// 		}
// 	}

// 	@Override
// 	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
// 			Authentication authResult) throws IOException, ServletException {
// 		String username = ((User) authResult.getPrincipal()).getUsername();
// 		String token = Jwts.builder()
// 				.setSubject(username)
// 				.setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
// 				.signWith(SignatureAlgorithm.HS512, SecurityConstants.TOKEN_SECRET)
// 				.compact();
// 		//UserProfileService userProfileService = (UserProfileService) SpringApplicationContext
// 				//.getBean("userProfileServiceImpl");
// 		// UserProfileDto userProfileDTO = userProfileService.loadUserByUsername(username);
		
// 		LoginResponseDto loginResponseDto = new LoginResponseDto(SecurityConstants.TOKEN_PREFIX + token);
// 		Response<LoginResponseDto> responseDto = new Response<LoginResponseDto>(200, loginResponseDto, "Đăng nhập thành công!!!");
//  		response.setContentType("application/json");
// 				response.setCharacterEncoding("UTF-8");
// 				JSONObject object = new JSONObject(responseDto);
// 		response.getWriter().write(object.toString());
// 	}
// }
