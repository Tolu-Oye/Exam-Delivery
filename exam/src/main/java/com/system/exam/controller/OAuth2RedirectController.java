package com.system.exam.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.logging.Logger;


@RestController
public class OAuth2RedirectController {

    private static final Logger LOGGER = (Logger) LoggerFactory.getLogger(OAuth2RedirectController.class);
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    @Value("${spring.security.oauth2.client.provider.google.token-uri}")
    private String tokenEndpoint;

    @GetMapping("/login/oauth2/code/google")
    public ResponseEntity<String> handleGoogleRedirect(@RequestParam("code") String code,
                                                       @RequestParam("state") String state,
                                                       HttpServletResponse servletResponse) {
        try {
            // Make a POST request to the token endpoint
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
            requestBody.add("code", code);
            requestBody.add("client_id", clientId);
            requestBody.add("client_secret", clientSecret);
            requestBody.add("grant_type", "authorization_code");
            requestBody.add("redirect_uri", redirectUri);

//            LOGGER.info("Request Body: {}", convertMultiValueMapToString(requestBody));
            LOGGER.info(convertMultiValueMapToString(requestBody));
//            System.out.println(requestBody);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestBody, headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.postForEntity(tokenEndpoint, request, String.class);

            // Parse the JSON response
            String responseBody = response.getBody();
            String accessToken = extractField(responseBody, "access_token");
            String refreshToken = extractField(responseBody, "refresh_token");
            Long expiresIn = Long.parseLong(extractField(responseBody, "expires_in"));

            // Set cookies
            setCookie((HttpServletResponse) response, "access_token", accessToken, expiresIn);
            setCookie((HttpServletResponse) response, "refresh_token", refreshToken, -1); // Assuming refresh token is a session cookie

            return ResponseEntity.ok(responseBody);
//            System.out.println("Token response: " + response.getBody());

//            // Extract access token from the response
//            String accessToken = response.getBody();
//
//            // Set the access token in an HTTP-only cookie
//            Cookie cookie = new Cookie("access_token", accessToken);
//            cookie.setHttpOnly(true);
//            cookie.setSecure(true); // Enable secure flag for HTTPS
//            servletResponse.addCookie(cookie);
//
//            Cookie cookie2 = new Cookie("refresh_token", acces);
//            cookie2.setHttpOnly(true);
//            cookie2.setSecure(true); // Enable secure flag for HTTPS
//            servletResponse.addCookie(cookie2);


            // Respond with an OK status
//            return ResponseEntity.ok("Access token set in cookie");
        } catch (Exception e) {
//            LOGGER.error("Error handling Google redirect", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error handling Google redirect");
        }
    }

    private String convertMultiValueMapToString(MultiValueMap<String, String> map) {
        StringBuilder stringBuilder = new StringBuilder();
        map.forEach((key, values) -> {
            stringBuilder.append(key).append(": [");
            stringBuilder.append(StringUtils.collectionToCommaDelimitedString(values));
            stringBuilder.append("]\n");
        });
        return stringBuilder.toString();
    }

    private String extractField(String json, String fieldName) {
        // Implement JSON parsing logic to extract a specific field from the response
        // You may want to use a JSON library like Jackson or Gson for more robust parsing
        // This is a basic example and might need adjustments based on the actual response format
        // For simplicity, this example assumes the field is a string directly in the JSON object

        int startIndex = json.indexOf("\"" + fieldName + "\"") + fieldName.length() + 3; // 3 for the quotes and colon
        int endIndex = json.indexOf("\"", startIndex);

        return json.substring(startIndex, endIndex);
    }
    private void setCookie(HttpServletResponse response, String name, String value, long maxAgeInSeconds) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/");
        cookie.setMaxAge((int) maxAgeInSeconds);
        response.addCookie(cookie);
    }
}
