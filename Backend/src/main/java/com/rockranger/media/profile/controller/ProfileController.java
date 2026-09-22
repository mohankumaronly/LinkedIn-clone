package com.rockranger.media.profile.controller;

import com.rockranger.media.authentication.entity.User;
import com.rockranger.media.profile.dto.request.CreateProfileRequest;
import com.rockranger.media.profile.dto.request.UpdateProfileRequest;
import com.rockranger.media.profile.dto.response.ProfileResponse;
import com.rockranger.media.profile.exception.InvalidImageException;
import com.rockranger.media.profile.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/profiles")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    /**
     * Create a profile using pure JSON only.
     */
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProfileResponse> createProfile(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody CreateProfileRequest request
    ) {
        ProfileResponse response = profileService.createProfile(user, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get the authenticated user's profile.
     */
    @GetMapping({"/me", ""})
    public ResponseEntity<ProfileResponse> getMyProfile(
            @AuthenticationPrincipal User user
    ) {
        ProfileResponse response = profileService.getMyProfile(user);
        return ResponseEntity.ok(response);
    }

    /**
     * Get a public profile by unique username.
     */
    @GetMapping("/{username}")
    public ResponseEntity<ProfileResponse> getProfileByUsername(
            @PathVariable("username") String username
    ) {
        ProfileResponse response = profileService.getProfileByUsername(username);
        return ResponseEntity.ok(response);
    }

    /**
     * Update profile details (username, displayName, bio, dateOfBirth, gender) anytime using pure JSON.
     * Supports both PUT and PATCH on /me and /.
     */
    @RequestMapping(
            value = {"/me", ""},
            method = {RequestMethod.PUT, RequestMethod.PATCH},
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ProfileResponse> updateProfile(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        ProfileResponse response = profileService.updateProfile(user, request);
        return ResponseEntity.ok(response);
    }

    /**
     * Upload or update profile avatar image anytime using binary File upload (multipart/form-data).
     * Accepts file under parameter name 'avatar', 'file', or 'image'.
     * Uploads file to Cloudinary and updates profile_image_url.
     */
    @RequestMapping(
            value = {"/avatar", "/me/avatar"},
            method = {RequestMethod.POST, RequestMethod.PUT},
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ProfileResponse> uploadAvatar(
            @AuthenticationPrincipal User user,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        MultipartFile uploadFile = avatar != null ? avatar : (file != null ? file : image);
        if (uploadFile == null || uploadFile.isEmpty()) {
            throw new InvalidImageException("Image file must not be empty. Please upload an image using field 'avatar', 'file', or 'image'.");
        }
        ProfileResponse response = profileService.uploadAvatar(user, uploadFile);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete profile avatar image anytime.
     */
    @DeleteMapping({"/avatar", "/me/avatar"})
    public ResponseEntity<ProfileResponse> deleteAvatar(
            @AuthenticationPrincipal User user
    ) {
        ProfileResponse response = profileService.deleteAvatar(user);
        return ResponseEntity.ok(response);
    }
}
