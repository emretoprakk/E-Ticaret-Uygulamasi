package com.emretoprak.eticaret.dto;

import com.emretoprak.eticaret.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String email;
    private String name;
    private UserRole userRole;
}
