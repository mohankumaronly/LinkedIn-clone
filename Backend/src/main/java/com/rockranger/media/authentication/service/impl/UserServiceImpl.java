package com.rockranger.media.authentication.service.impl;

import com.rockranger.media.authentication.dto.response.UserResponse;
import com.rockranger.media.authentication.entity.AccountStatus;
import com.rockranger.media.authentication.entity.User;
import com.rockranger.media.authentication.exception.UserNotFoundException;
import com.rockranger.media.authentication.repository.RefreshTokenRepository;
import com.rockranger.media.authentication.repository.UserRepository;
import com.rockranger.media.authentication.service.UserService;
import com.rockranger.media.profile.entity.Profile;
import com.rockranger.media.profile.repository.ProfileRepository;
import com.rockranger.media.profile.service.CloudinaryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final ProfileRepository profileRepository;
    private final CloudinaryService cloudinaryService;

    public UserServiceImpl(
            UserRepository userRepository,
            RefreshTokenRepository refreshTokenRepository,
            ProfileRepository profileRepository,
            CloudinaryService cloudinaryService
    ) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.profileRepository = profileRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getMyAccount(User user) {
        User managedUser = findManagedUser(user);
        return UserResponse.fromEntity(managedUser);
    }

    @Override
    public UserResponse deactivateAccount(User user) {
        User managedUser = findManagedUser(user);
        managedUser.setAccountStatus(AccountStatus.DEACTIVATED);
        managedUser.setDeactivatedAt(Instant.now());
        managedUser.setScheduledDeletionAt(null);

        // Revoke all active refresh tokens
        refreshTokenRepository.deleteByUser(managedUser);

        User savedUser = userRepository.save(managedUser);
        return UserResponse.fromEntity(savedUser);
    }

    @Override
    public UserResponse reactivateAccount(User user) {
        User managedUser = findManagedUser(user);
        managedUser.setAccountStatus(AccountStatus.ACTIVE);
        managedUser.setDeactivatedAt(null);
        managedUser.setScheduledDeletionAt(null);

        User savedUser = userRepository.save(managedUser);
        return UserResponse.fromEntity(savedUser);
    }

    @Override
    public UserResponse scheduleAccountDeletion(User user) {
        User managedUser = findManagedUser(user);
        managedUser.setAccountStatus(AccountStatus.PENDING_DELETION);
        // Instagram-style 30-day grace period
        managedUser.setScheduledDeletionAt(Instant.now().plus(30, ChronoUnit.DAYS));
        managedUser.setDeactivatedAt(null);

        // Revoke all active refresh tokens
        refreshTokenRepository.deleteByUser(managedUser);

        User savedUser = userRepository.save(managedUser);
        return UserResponse.fromEntity(savedUser);
    }

    @Override
    public void deleteAccountPermanently(User user) {
        User managedUser = findManagedUser(user);

        // 1. Delete avatar from Cloudinary if it exists
        Optional<Profile> profileOpt = profileRepository.findByUserId(managedUser.getId());
        if (profileOpt.isPresent()) {
            Profile profile = profileOpt.get();
            if (profile.getProfileImageUrl() != null && !profile.getProfileImageUrl().isBlank()) {
                cloudinaryService.deleteImageByUrl(profile.getProfileImageUrl());
            }
        }

        // 2. Delete user entity from database
        // CascadeType.ALL and orphanRemoval=true automatically removes:
        // - Profile
        // - RefreshTokens
        // - EmailVerificationOtps
        // - PasswordResetOtps
        // and any future user-related tables (followers, following, reels, posts, etc.)
        userRepository.delete(managedUser);
    }

    private User findManagedUser(User user) {
        if (user == null || user.getId() == null) {
            throw new UserNotFoundException("User not authenticated or user id is null.");
        }
        return userRepository.findById(user.getId())
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + user.getId()));
    }
}
