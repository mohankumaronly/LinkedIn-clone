package com.rockranger.media.profile.dto.request;

import com.rockranger.media.profile.entity.Gender;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

public class UpdateProfileRequest {

    @Pattern(
            regexp = "^[a-zA-Z0-9._]{3,30}$",
            message = "Username must be between 3 and 30 characters and can only contain letters, numbers, periods, and underscores"
    )
    private String username;

    @Size(max = 100, message = "Display name cannot exceed 100 characters")
    private String displayName;

    @Size(max = 1000, message = "Bio cannot exceed 1000 characters")
    private String bio;

    @Past(message = "Date of birth must be in the past")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateOfBirth;

    private Gender gender;

    public UpdateProfileRequest() {
    }

    public UpdateProfileRequest(String username, String displayName, String bio, LocalDate dateOfBirth, Gender gender) {
        this.username = username;
        this.displayName = displayName;
        this.bio = bio;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
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
}
