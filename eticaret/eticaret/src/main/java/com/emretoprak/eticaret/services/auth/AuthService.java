package com.emretoprak.eticaret.services.auth;

import com.emretoprak.eticaret.dto.SignupRequest;
import com.emretoprak.eticaret.dto.UserDto;

public interface AuthService {

    UserDto createUser(SignupRequest signupRequest);

    Boolean hasUserWithEmail(String email);
}
