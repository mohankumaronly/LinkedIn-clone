package com.rockranger.media.profile.dto.response;

import com.rockranger.media.profile.entity.Gender;
import com.rockranger.media.profile.entity.Profile;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ProfileResponse {

    private Long id;
    private Long userId;
    private String username;
    private String displayName;
    private String bio;
    private String profileImageUrl;
    private LocalDate dateOfBirth;
    private Gender gender;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ProfileResponse() {
    }

    public static ProfileResponse fromEntity(Profile profile) {
        if (profile == null) {
            return null;
        }

        ProfileResponse response = new ProfileResponse();
        response.setId(profile.getId());
        if (profile.getUser() != null) {
            response.setUserId(profile.getUser().getId());
        }
        response.setUsername(profile.getUsername());
        response.setDisplayName(profile.getDisplayName());
        response.setBio(profile.getBio());
        response.setProfileImageUrl(profile.getProfileImageUrl());
        response.setDateOfBirth(profile.getDateOfBirth());
        response.setGender(profile.getGender());
        response.setCreatedAt(profile.getCreatedAt());
        response.setUpdatedAt(profile.getUpdatedAt());
        return response;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
