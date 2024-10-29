package com.emretoprak.eticaret.services.customer.profile;

import com.emretoprak.eticaret.entity.User;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {
    User getUserByEmail(String email);
    User updateUser(String email, String name, MultipartFile profilePicture) throws Exception;
}
