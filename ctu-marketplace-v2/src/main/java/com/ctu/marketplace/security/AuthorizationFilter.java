// package com.ctu.marketplace.security;

// import java.io.IOException;

// import javax.servlet.FilterChain;
// import javax.servlet.ServletException;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;

// import com.ctu.marketplace.SpringApplicationContext;
// import com.ctu.marketplace.service.UserProfileService;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

// import io.jsonwebtoken.Jwts;

// public class AuthorizationFilter extends BasicAuthenticationFilter {

// 	public AuthorizationFilter(AuthenticationManager auth) {
// 		super(auth);
// 	}

// 	@Override
// 	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
// 			throws IOException, ServletException {

// 		String header = request.getHeader(SecurityConstants.HEADER_STRING);
// 		if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {
// 			chain.doFilter(request, response);
// 			return;
// 		}
// 		UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(request);
// 		SecurityContextHolder.getContext().setAuthentication(authenticationToken);
// 		chain.doFilter(request, response);
// 	}

// 	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
// 		String token = request.getHeader(SecurityConstants.HEADER_STRING);
// 		if (token != null) {
// 			token = token.replace(SecurityConstants.TOKEN_PREFIX, "");
// 			String user = Jwts.parser()
// 					.setSigningKey(SecurityConstants.TOKEN_SECRET)
// 					.parseClaimsJws(token)
// 					.getBody()
// 					.getSubject();
// 			if (user != null) {
// 				UserProfileService userProfileService = (UserProfileService) SpringApplicationContext
// 						.getBean("userProfileServiceImpl");
// 				UserDetails userDetails = userProfileService.loadUserByUsername(user);
// 				return new UsernamePasswordAuthenticationToken(user, null, userDetails.getAuthorities());
// 			}
// 		}
// 		return null;
// 	}

// }
