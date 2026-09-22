package com.rockranger.media.authentication.dto.response;

import com.rockranger.media.authentication.entity.AccountStatus;
import com.rockranger.media.authentication.entity.User;

import java.time.Instant;

public class UserResponse {

    private Long id;
    private String fullName;
    private String email;
    private boolean emailVerified;
    private AccountStatus accountStatus;
    private Instant deactivatedAt;
    private Instant scheduledDeletionAt;

    public UserResponse() {
    }

    public static UserResponse fromEntity(User user) {
        if (user == null) {
            return null;
        }
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setEmailVerified(user.isEmailVerified());
        response.setAccountStatus(user.getAccountStatus());
        response.setDeactivatedAt(user.getDeactivatedAt());
        response.setScheduledDeletionAt(user.getScheduledDeletionAt());
        return response;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public AccountStatus getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
    }

    public Instant getDeactivatedAt() {
        return deactivatedAt;
    }

    public void setDeactivatedAt(Instant deactivatedAt) {
        this.deactivatedAt = deactivatedAt;
    }

    public Instant getScheduledDeletionAt() {
        return scheduledDeletionAt;
    }

    public void setScheduledDeletionAt(Instant scheduledDeletionAt) {
        this.scheduledDeletionAt = scheduledDeletionAt;
    }
}
