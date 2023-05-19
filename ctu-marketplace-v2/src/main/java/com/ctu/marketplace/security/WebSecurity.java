package com.ctu.marketplace.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ctu.marketplace.security.oauth2.CustomOAuth2UserService;
import com.ctu.marketplace.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.ctu.marketplace.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.ctu.marketplace.security.oauth2.OAuth2AuthenticationSuccessHandler;
import com.ctu.marketplace.service.UserProfileService;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class WebSecurity extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

	@Autowired
	private CustomOAuth2UserService customOAuth2UserService;

	@Autowired
	private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

	@Autowired
	private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

	@Autowired
	private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

	@Autowired
	private UserProfileService userProfileService;

	@Bean
	public TokenAuthenticationFilter tokenAuthenticationFilter() {
		return new TokenAuthenticationFilter();
	}

	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
		return new HttpCookieOAuth2AuthorizationRequestRepository();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userProfileService).passwordEncoder(passwordEncoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.cors()
				.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.csrf()
				.disable()
				.formLogin()
				.disable()
				.httpBasic()
				.disable()
				.exceptionHandling()
				.authenticationEntryPoint(new RestAuthenticationEntryPoint())
				.and()
				.authorizeRequests()
				.antMatchers("/auth/**", "/oauth2/**", "/api/v2/auth/**",
						"/v3/api-docs/**", "/swagger-ui/**", "/api/v2/public/**", "/api/v2/upload-file/**")
				.permitAll()
				.antMatchers("/auth/**", "/oauth2/**", "/api/v2/auth/**")
				.permitAll()
				.antMatchers("/api/v2/public/**").permitAll()
				.antMatchers("/api/v2/guest/**").hasAuthority("KCH")
				.antMatchers("/api/v2/researcher/**").hasAuthority("NNC")
//				.antMatchers(HttpMethod.PUT, "api/v2/researcher/users/update-password/**").permitAll()
				// .antMatchers("/api/v2/upload-file/**").hasAnyAuthority("NNC", "SAD")
				// .antMatchers("/api/v2/upload-file/download/**").permitAll()
				.antMatchers(HttpMethod.GET,"/api/v2/admin/status-management").permitAll()
				.antMatchers("/api/v2/admin/**").hasAnyAuthority("SAD", "AD")
				.antMatchers("/api/v2/auth/login").permitAll()
				.antMatchers(HttpMethod.POST, "/api/v3/projects").hasAuthority("NNC")
				.antMatchers(HttpMethod.PUT, "/api/v3/projects/approve/**").hasAnyAuthority("SAD","AD")
				.antMatchers(HttpMethod.PUT, "/api/v3/projects/**").hasAuthority("NNC")
				.antMatchers(HttpMethod.DELETE, "/api/v3/projects/**").hasAnyAuthority("NNC","SAD","AD")
				.antMatchers(HttpMethod.PUT, "/api/v3/users/**").authenticated()
				.antMatchers("/api/v3/**").permitAll()
				.anyRequest()
				// .permitAll()
				.authenticated()
				.and()
				.oauth2Login()
				.authorizationEndpoint()
				.baseUri("/oauth2/authorize")
				.authorizationRequestRepository(cookieAuthorizationRequestRepository())
				.and()
				.redirectionEndpoint()
				.baseUri("/oauth2/callback/*")
				.and()
				.userInfoEndpoint()
				.userService(customOAuth2UserService)
				.and()
				.successHandler(oAuth2AuthenticationSuccessHandler)
				.failureHandler(oAuth2AuthenticationFailureHandler);

		// Add our custom Token based authentication filter
		http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

	}

}
