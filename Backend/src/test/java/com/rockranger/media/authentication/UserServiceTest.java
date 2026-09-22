package com.rockranger.media.authentication;

import com.rockranger.media.authentication.dto.response.UserResponse;
import com.rockranger.media.authentication.entity.AccountStatus;
import com.rockranger.media.authentication.entity.User;
import com.rockranger.media.authentication.repository.RefreshTokenRepository;
import com.rockranger.media.authentication.repository.UserRepository;
import com.rockranger.media.authentication.service.impl.UserServiceImpl;
import com.rockranger.media.profile.entity.Profile;
import com.rockranger.media.profile.repository.ProfileRepository;
import com.rockranger.media.profile.service.CloudinaryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RefreshTokenRepository refreshTokenRepository;

    @Mock
    private ProfileRepository profileRepository;

    @Mock
    private CloudinaryService cloudinaryService;

    @InjectMocks
    private UserServiceImpl userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setFullName("Mohan Kumar");
        testUser.setEmail("mohan@example.com");
        testUser.setAccountStatus(AccountStatus.ACTIVE);
    }

    @Test
    @DisplayName("deactivateAccount sets status to DEACTIVATED, sets timestamp and revokes tokens")
    void testDeactivateAccount() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        UserResponse response = userService.deactivateAccount(testUser);

        assertNotNull(response);
        assertEquals(AccountStatus.DEACTIVATED, response.getAccountStatus());
        assertNotNull(response.getDeactivatedAt());
        assertNull(response.getScheduledDeletionAt());

        verify(refreshTokenRepository).deleteByUser(testUser);
        verify(userRepository).save(testUser);
    }

    @Test
    @DisplayName("reactivateAccount restores status to ACTIVE and clears deactivation timestamp")
    void testReactivateAccount() {
        testUser.setAccountStatus(AccountStatus.DEACTIVATED);
        testUser.setDeactivatedAt(Instant.now());

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        UserResponse response = userService.reactivateAccount(testUser);

        assertNotNull(response);
        assertEquals(AccountStatus.ACTIVE, response.getAccountStatus());
        assertNull(response.getDeactivatedAt());
        assertNull(response.getScheduledDeletionAt());

        verify(userRepository).save(testUser);
    }

    @Test
    @DisplayName("scheduleAccountDeletion sets status to PENDING_DELETION and sets 30-day grace period")
    void testScheduleAccountDeletion() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        UserResponse response = userService.scheduleAccountDeletion(testUser);

        assertNotNull(response);
        assertEquals(AccountStatus.PENDING_DELETION, response.getAccountStatus());
        assertNotNull(response.getScheduledDeletionAt());
        assertTrue(response.getScheduledDeletionAt().isAfter(Instant.now()));

        verify(refreshTokenRepository).deleteByUser(testUser);
        verify(userRepository).save(testUser);
    }

    @Test
    @DisplayName("deleteAccountPermanently cleans up Cloudinary avatar and deletes user with cascade")
    void testDeleteAccountPermanently() {
        Profile profile = new Profile();
        profile.setProfileImageUrl("https://cloudinary.com/avatar.jpg");

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(profileRepository.findByUserId(1L)).thenReturn(Optional.of(profile));

        userService.deleteAccountPermanently(testUser);

        verify(cloudinaryService).deleteImageByUrl("https://cloudinary.com/avatar.jpg");
        verify(userRepository).delete(testUser);
    }
}
