package com.emretoprak.eticaret.services.customer.profile;


import com.emretoprak.eticaret.entity.User;
import com.emretoprak.eticaret.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{

    private final UserRepository userRepository;

    public User getUserByEmail(String email) {
        return userRepository.findFirstByEmail(email).orElse(null);
    }

    public User updateUser(String email, String name, MultipartFile profilePicture) throws Exception {
        User user = userRepository.findFirstByEmail(email).orElseThrow(() -> new Exception("User not found"));

        user.setName(name);

        if (profilePicture != null && !profilePicture.isEmpty()) {
            try {
                user.setImg(profilePicture.getBytes());
            } catch (IOException e) {
                throw new Exception("Error saving profile picture", e);
            }
        }

        return userRepository.save(user);
    }
}
