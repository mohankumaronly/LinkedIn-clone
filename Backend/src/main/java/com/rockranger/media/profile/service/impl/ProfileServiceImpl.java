package com.rockranger.media.profile.service.impl;

import com.rockranger.media.authentication.entity.AccountStatus;
import com.rockranger.media.authentication.entity.User;
import com.rockranger.media.profile.dto.request.CreateProfileRequest;
import com.rockranger.media.profile.dto.request.UpdateProfileRequest;
import com.rockranger.media.profile.dto.response.ProfileResponse;
import com.rockranger.media.profile.entity.Profile;
import com.rockranger.media.profile.exception.ProfileAlreadyExistsException;
import com.rockranger.media.profile.exception.ProfileNotFoundException;
import com.rockranger.media.profile.exception.UsernameAlreadyTakenException;
import com.rockranger.media.profile.repository.ProfileRepository;
import com.rockranger.media.profile.service.CloudinaryService;
import com.rockranger.media.profile.service.ProfileService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Locale;

@Service
@Transactional
public class ProfileServiceImpl implements ProfileService {

    private static final String AVATARS_FOLDER = "social_media/avatars";

    private final ProfileRepository profileRepository;
    private final CloudinaryService cloudinaryService;

    public ProfileServiceImpl(ProfileRepository profileRepository, CloudinaryService cloudinaryService) {
        this.profileRepository = profileRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    public ProfileResponse createProfile(User user, CreateProfileRequest request) {
        if (profileRepository.existsByUserId(user.getId())) {
            throw new ProfileAlreadyExistsException("A profile already exists for this user account.");
        }

        String normalizedUsername = normalizeUsername(request.getUsername());
        if (profileRepository.existsByUsername(normalizedUsername)) {
            throw new UsernameAlreadyTakenException("The username '" + normalizedUsername + "' is already taken. Please choose another.");
        }

        String displayName = (request.getDisplayName() != null && !request.getDisplayName().isBlank())
                ? request.getDisplayName().trim()
                : user.getFullName();

        Profile profile = new Profile();
        profile.setUser(user);
        profile.setUsername(normalizedUsername);
        profile.setDisplayName(displayName);
        profile.setBio(request.getBio());
        profile.setDateOfBirth(request.getDateOfBirth());
        profile.setGender(request.getGender());

        Profile savedProfile = profileRepository.save(profile);
        return ProfileResponse.fromEntity(savedProfile);
    }

    @Override
    @Transactional(readOnly = true)
    public ProfileResponse getMyProfile(User user) {
        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found for current user. Please create one."));
        return ProfileResponse.fromEntity(profile);
    }

    @Override
    @Transactional(readOnly = true)
    public ProfileResponse getProfileByUsername(String username) {
        String normalizedUsername = normalizeUsername(username);
        Profile profile = profileRepository.findByUsername(normalizedUsername)
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found for username: " + username));

        // Hide profile if account is deactivated, suspended, or pending deletion
        if (profile.getUser() != null && profile.getUser().getAccountStatus() != AccountStatus.ACTIVE) {
            throw new ProfileNotFoundException("Profile not found for username: " + username);
        }

        return ProfileResponse.fromEntity(profile);
    }

    @Override
    public ProfileResponse updateProfile(User user, UpdateProfileRequest request) {
        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found for current user. Please create one first."));

        if (request.getUsername() != null && !request.getUsername().isBlank()) {
            String normalizedUsername = normalizeUsername(request.getUsername());
            if (!normalizedUsername.equals(profile.getUsername())) {
                if (profileRepository.existsByUsernameAndIdNot(normalizedUsername, profile.getId())) {
                    throw new UsernameAlreadyTakenException("The username '" + normalizedUsername + "' is already taken. Please choose another.");
                }
                profile.setUsername(normalizedUsername);
            }
        }

        if (request.getDisplayName() != null) {
            profile.setDisplayName(request.getDisplayName().trim());
        }

        if (request.getBio() != null) {
            profile.setBio(request.getBio());
        }

        if (request.getDateOfBirth() != null) {
            profile.setDateOfBirth(request.getDateOfBirth());
        }

        if (request.getGender() != null) {
            profile.setGender(request.getGender());
        }

        Profile updatedProfile = profileRepository.save(profile);
        return ProfileResponse.fromEntity(updatedProfile);
    }

    @Override
    public ProfileResponse uploadAvatar(User user, MultipartFile avatar) {
        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found. Please create your profile before uploading an avatar."));

        // Remove old avatar from Cloudinary if present
        if (profile.getProfileImageUrl() != null && !profile.getProfileImageUrl().isBlank()) {
            cloudinaryService.deleteImageByUrl(profile.getProfileImageUrl());
        }

        String newImageUrl = cloudinaryService.uploadImage(avatar, AVATARS_FOLDER);
        profile.setProfileImageUrl(newImageUrl);

        Profile updatedProfile = profileRepository.save(profile);
        return ProfileResponse.fromEntity(updatedProfile);
    }

    @Override
    public ProfileResponse deleteAvatar(User user) {
        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found for current user."));

        if (profile.getProfileImageUrl() != null && !profile.getProfileImageUrl().isBlank()) {
            cloudinaryService.deleteImageByUrl(profile.getProfileImageUrl());
            profile.setProfileImageUrl(null);
            profile = profileRepository.save(profile);
        }

        return ProfileResponse.fromEntity(profile);
    }

    private String normalizeUsername(String username) {
        if (username == null) {
            return null;
        }
        return username.trim().toLowerCase(Locale.ROOT);
    }
}
