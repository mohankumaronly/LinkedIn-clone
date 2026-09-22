package com.rockranger.media.profile;

import com.rockranger.media.authentication.entity.AccountStatus;
import com.rockranger.media.authentication.entity.User;
import com.rockranger.media.profile.dto.request.CreateProfileRequest;
import com.rockranger.media.profile.dto.request.UpdateProfileRequest;
import com.rockranger.media.profile.dto.response.ProfileResponse;
import com.rockranger.media.profile.entity.Gender;
import com.rockranger.media.profile.entity.Profile;
import com.rockranger.media.profile.exception.ProfileAlreadyExistsException;
import com.rockranger.media.profile.exception.ProfileNotFoundException;
import com.rockranger.media.profile.exception.UsernameAlreadyTakenException;
import com.rockranger.media.profile.repository.ProfileRepository;
import com.rockranger.media.profile.service.CloudinaryService;
import com.rockranger.media.profile.service.impl.ProfileServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProfileServiceTest {

    @Mock
    private ProfileRepository profileRepository;

    @Mock
    private CloudinaryService cloudinaryService;

    @InjectMocks
    private ProfileServiceImpl profileService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setFullName("John Doe");
        testUser.setEmail("john@example.com");
        testUser.setAccountStatus(AccountStatus.ACTIVE);
    }

    @Test
    @DisplayName("createProfile creates profile successfully using pure JSON fields")
    void testCreateProfile_Success() {
        CreateProfileRequest request = new CreateProfileRequest(
                "johndoe",
                "John D.",
                "Engineer & creator",
                LocalDate.of(1995, 5, 20),
                Gender.MALE
        );

        when(profileRepository.existsByUserId(1L)).thenReturn(false);
        when(profileRepository.existsByUsername("johndoe")).thenReturn(false);
        when(profileRepository.save(any(Profile.class))).thenAnswer(invocation -> {
            Profile p = invocation.getArgument(0);
            p.setId(10L);
            return p;
        });

        ProfileResponse response = profileService.createProfile(testUser, request);

        assertNotNull(response);
        assertEquals("johndoe", response.getUsername());
        assertEquals("John D.", response.getDisplayName());
        assertEquals("Engineer & creator", response.getBio());
        assertEquals(Gender.MALE, response.getGender());
        assertNull(response.getProfileImageUrl()); // Initially null; uploaded via avatar API

        verify(profileRepository).save(any(Profile.class));
    }

    @Test
    @DisplayName("createProfile throws exception if profile already exists")
    void testCreateProfile_AlreadyExists() {
        CreateProfileRequest request = new CreateProfileRequest(
                "johndoe", "John", "Bio", null, Gender.MALE
        );

        when(profileRepository.existsByUserId(1L)).thenReturn(true);

        assertThrows(ProfileAlreadyExistsException.class, () ->
                profileService.createProfile(testUser, request)
        );
        verify(profileRepository, never()).save(any(Profile.class));
    }

    @Test
    @DisplayName("createProfile throws exception if username taken")
    void testCreateProfile_UsernameTaken() {
        CreateProfileRequest request = new CreateProfileRequest(
                "johndoe", "John", "Bio", null, Gender.MALE
        );

        when(profileRepository.existsByUserId(1L)).thenReturn(false);
        when(profileRepository.existsByUsername("johndoe")).thenReturn(true);

        assertThrows(UsernameAlreadyTakenException.class, () ->
                profileService.createProfile(testUser, request)
        );
    }

    @Test
    @DisplayName("updateProfile allows updating profile details anytime via pure JSON and preserves avatar")
    void testUpdateProfile_Success() {
        Profile existingProfile = new Profile(
                testUser, "johndoe", "John Old", "Old Bio", "https://cloudinary.com/avatar.jpg",
                LocalDate.of(1995, 5, 20), Gender.MALE
        );
        existingProfile.setId(10L);

        when(profileRepository.findByUserId(1L)).thenReturn(Optional.of(existingProfile));
        when(profileRepository.save(any(Profile.class))).thenAnswer(i -> i.getArgument(0));

        UpdateProfileRequest updateRequest = new UpdateProfileRequest(
                "johndoe_new",
                "John Updated",
                "New Bio Updated Anytime",
                LocalDate.of(1996, 6, 21),
                Gender.OTHER
        );
        when(profileRepository.existsByUsernameAndIdNot("johndoe_new", 10L)).thenReturn(false);

        ProfileResponse response = profileService.updateProfile(testUser, updateRequest);

        assertEquals("johndoe_new", response.getUsername());
        assertEquals("John Updated", response.getDisplayName());
        assertEquals("New Bio Updated Anytime", response.getBio());
        assertEquals(Gender.OTHER, response.getGender());
        assertEquals("https://cloudinary.com/avatar.jpg", response.getProfileImageUrl()); // Preserved!
    }

    @Test
    @DisplayName("updateProfile partial update: only updates non-null fields")
    void testUpdateProfile_PartialUpdate() {
        Profile existingProfile = new Profile(
                testUser, "johndoe", "John Original", "Original Bio", "https://cloudinary.com/avatar.jpg",
                LocalDate.of(1995, 5, 20), Gender.MALE
        );
        existingProfile.setId(10L);

        when(profileRepository.findByUserId(1L)).thenReturn(Optional.of(existingProfile));
        when(profileRepository.save(any(Profile.class))).thenAnswer(i -> i.getArgument(0));

        // Only updating bio
        UpdateProfileRequest updateRequest = new UpdateProfileRequest(
                null, null, "Updated Bio Only", null, null
        );

        ProfileResponse response = profileService.updateProfile(testUser, updateRequest);

        assertEquals("johndoe", response.getUsername());
        assertEquals("John Original", response.getDisplayName());
        assertEquals("Updated Bio Only", response.getBio());
        assertEquals("https://cloudinary.com/avatar.jpg", response.getProfileImageUrl());
    }

    @Test
    @DisplayName("uploadAvatar uploads File type image and replaces old avatar on Cloudinary")
    void testUploadAvatar_Success() {
        Profile existingProfile = new Profile(
                testUser, "johndoe", "John", "Bio", "https://cloudinary.com/old_avatar.jpg",
                LocalDate.of(1995, 5, 20), Gender.MALE
        );
        when(profileRepository.findByUserId(1L)).thenReturn(Optional.of(existingProfile));

        MockMultipartFile file = new MockMultipartFile(
                "avatar", "test.jpg", "image/jpeg", new byte[]{1, 2, 3, 4}
        );
        when(cloudinaryService.uploadImage(eq(file), anyString()))
                .thenReturn("https://cloudinary.com/new_avatar.jpg");
        when(profileRepository.save(any(Profile.class))).thenAnswer(i -> i.getArgument(0));

        ProfileResponse response = profileService.uploadAvatar(testUser, file);

        verify(cloudinaryService).deleteImageByUrl("https://cloudinary.com/old_avatar.jpg");
        verify(cloudinaryService).uploadImage(eq(file), eq("social_media/avatars"));
        assertEquals("https://cloudinary.com/new_avatar.jpg", response.getProfileImageUrl());
    }

    @Test
    @DisplayName("deleteAvatar removes avatar from Cloudinary and sets profileImageUrl to null")
    void testDeleteAvatar_Success() {
        Profile existingProfile = new Profile(
                testUser, "johndoe", "John", "Bio", "https://cloudinary.com/avatar_to_delete.jpg",
                LocalDate.of(1995, 5, 20), Gender.MALE
        );
        when(profileRepository.findByUserId(1L)).thenReturn(Optional.of(existingProfile));
        when(profileRepository.save(any(Profile.class))).thenAnswer(i -> i.getArgument(0));

        ProfileResponse response = profileService.deleteAvatar(testUser);

        verify(cloudinaryService).deleteImageByUrl("https://cloudinary.com/avatar_to_delete.jpg");
        assertNull(response.getProfileImageUrl());
    }

    @Test
    @DisplayName("getProfileByUsername returns profile when user account is ACTIVE")
    void testGetProfileByUsername_ActiveUser() {
        testUser.setAccountStatus(AccountStatus.ACTIVE);
        Profile existingProfile = new Profile(
                testUser, "johndoe", "John", "Bio", "https://cloudinary.com/avatar.jpg",
                LocalDate.of(1995, 5, 20), Gender.MALE
        );
        when(profileRepository.findByUsername("johndoe")).thenReturn(Optional.of(existingProfile));

        ProfileResponse response = profileService.getProfileByUsername("johndoe");

        assertNotNull(response);
        assertEquals("johndoe", response.getUsername());
    }

    @Test
    @DisplayName("getProfileByUsername hides profile when user account is DEACTIVATED")
    void testGetProfileByUsername_DeactivatedUser() {
        User deactivatedUser = new User();
        deactivatedUser.setId(2L);
        deactivatedUser.setAccountStatus(AccountStatus.DEACTIVATED);

        Profile existingProfile = new Profile(
                deactivatedUser, "deactivated_user", "Deactivated", "Bio", null,
                null, Gender.OTHER
        );
        when(profileRepository.findByUsername("deactivated_user")).thenReturn(Optional.of(existingProfile));

        assertThrows(ProfileNotFoundException.class, () ->
                profileService.getProfileByUsername("deactivated_user")
        );
    }
}
