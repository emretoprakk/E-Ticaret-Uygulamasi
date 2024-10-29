package com.emretoprak.eticaret.controller.customer;

import com.emretoprak.eticaret.entity.User;
import com.emretoprak.eticaret.services.customer.profile.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(@RequestParam String email) {
        User user = profileService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("/profile")
    public ResponseEntity<User> updateProfile(
            @RequestParam String email,
            @RequestParam String name,
            @RequestParam(required = false) MultipartFile profilePicture) {
        try {
            User updatedUser = profileService.updateUser(email, name, profilePicture);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
