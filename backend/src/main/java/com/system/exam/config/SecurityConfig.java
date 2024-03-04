package com.system.exam.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    @Value("${spring.mvc.cors.allowed-origins}")
    private String reactUrl;



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> {
                    auth.anyRequest().authenticated();
                })
                .oauth2Login(oauth2Login ->
                                oauth2Login
                                .defaultSuccessUrl(reactUrl+"/home", true))
//                .oauth2Login(Customizer.withDefaults())

                .build();

//        httpSecurity
//                .cors(Customizer.withDefaults())
////                .cors(corsConfigurationSource())
//                .csrf(AbstractHttpConfigurer::disable)
//                .authorizeHttpRequests(authorizeRequests ->
//                        authorizeRequests
//                                .requestMatchers("/", "/login**", "/error**").permitAll() // Adjust the patterns accordingly
//                                .anyRequest().authenticated()
//                )
//                .oauth2Login(oauth2Login ->
//                                oauth2Login
////                                .defaultSuccessUrl("http://localhost:3000/home", true)
//                                        .authorizationEndpoint(e ->
//                                                e.baseUri("/api/oauth2/authorization"))
//                                        .redirectionEndpoint(e ->
//                                                e.baseUri("/login/oauth2/code/google"))
//                )
//                .build();
////                                                .authorizationRequestResolver())
////                                .authorizationRequestResolver(new CustomAuthorizationRequestResolver())
//

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(reactUrl));  // Replace with your React app's URL
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
