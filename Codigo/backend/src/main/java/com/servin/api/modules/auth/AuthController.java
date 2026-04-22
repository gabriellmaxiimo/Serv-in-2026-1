package com.servin.api.modules.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servin.api.modules.auth.dto.LoginDto;
import com.servin.api.modules.auth.dto.TokenResponseDto;
import com.servin.api.modules.auth.services.FirstAccess;
import com.servin.api.modules.auth.services.LoginService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    LoginService loginService;

    @Autowired
    FirstAccess firstAccessService;

    @PostMapping("/login")
    public ResponseEntity<TokenResponseDto> login(@RequestBody @Valid LoginDto data) {
        var token = loginService.login(data);
        if (token != null) {
            return ResponseEntity.ok(new TokenResponseDto(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/first-access")
    public ResponseEntity<TokenResponseDto> firstAccess(@RequestBody @Valid LoginDto data) {
        try {
            var token = firstAccessService.firstAccess(data);
            if (token != null) {
                return ResponseEntity.ok(new TokenResponseDto(token));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new TokenResponseDto(e.getMessage()));
        }
    }

}
