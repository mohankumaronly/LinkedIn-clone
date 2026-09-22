package com.rockranger.media.profile.service;

import com.rockranger.media.authentication.entity.User;
import com.rockranger.media.profile.dto.request.CreateProfileRequest;
import com.rockranger.media.profile.dto.request.UpdateProfileRequest;
import com.rockranger.media.profile.dto.response.ProfileResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {

    ProfileResponse createProfile(User user, CreateProfileRequest request);

    ProfileResponse getMyProfile(User user);

    ProfileResponse getProfileByUsername(String username);

    ProfileResponse updateProfile(User user, UpdateProfileRequest request);

    ProfileResponse uploadAvatar(User user, MultipartFile avatar);

    ProfileResponse deleteAvatar(User user);
}
