package com.sumoc.sumochampionship.api.controller.v1;

import com.sumoc.sumochampionship.api.dto.websiteuser.LoginDto;
import com.sumoc.sumochampionship.api.dto.websiteuser.WebsiteUserResponse;
import com.sumoc.sumochampionship.auth.AuthenticationRequest;
import com.sumoc.sumochampionship.auth.AuthenticationResponse;
import com.sumoc.sumochampionship.auth.AuthenticationService;
import com.sumoc.sumochampionship.auth.RegisterRequest;
import com.sumoc.sumochampionship.repository.WebsiteUserRepository;
import com.sumoc.sumochampionship.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

//    private final AuthenticationManager authenticationManager;

//    private final CustomUserDetailsService userDetailsService;

//    @PostMapping("/login")
//    public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto) {
//        WebsiteUserResponse response = userDetailsService.getWebsiteUser(loginDto.getEmail());
//        if (response == null) {
//            return new ResponseEntity<>("User not found", HttpStatus.FORBIDDEN);
//        }
//
//        try {
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
//            );
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        } catch (AuthenticationException e) {
//            return new ResponseEntity<>("Invalid credentials", HttpStatus.FORBIDDEN);
//        }
//
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

    @GetMapping("/logout")
    public String logoutPage() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            SecurityContextHolder.getContext().setAuthentication(null);
        }
        return "redirect:/login?logout";
    }

    @PostMapping("/register/jwt")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate/jwt")
    public ResponseEntity<AuthenticationResponse> authenticate (@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @GetMapping("/ping")
    public ResponseEntity<String> pingAuth(){
        return ResponseEntity.ok("Ping. No i gitara");
    }

}
