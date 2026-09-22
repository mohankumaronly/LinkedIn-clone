package com.rockranger.media.authentication.controller;

import com.rockranger.media.authentication.dto.response.UserResponse;
import com.rockranger.media.authentication.entity.User;
import com.rockranger.media.authentication.service.UserService;
import com.rockranger.media.authentication.util.CookieUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final CookieUtils cookieUtils;

    public UserController(UserService userService, CookieUtils cookieUtils) {
        this.userService = userService;
        this.cookieUtils = cookieUtils;
    }

    /**
     * Get current authenticated user details including lifecycle status.
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        UserResponse response = userService.getMyAccount(user);
        return ResponseEntity.ok(response);
    }

    /**
     * Deactivate account temporarily (Instagram style).
     * Account is marked DEACTIVATED and deactivatedAt is set. Profile becomes hidden.
     * Clears authentication session cookies.
     */
    @PostMapping({"/me/deactivate", "/deactivate"})
    public ResponseEntity<UserResponse> deactivateAccount(@AuthenticationPrincipal User user) {
        UserResponse response = userService.deactivateAccount(user);

        ResponseCookie cleanJwt = cookieUtils.createCleanJwtCookie();
        ResponseCookie cleanRefresh = cookieUtils.createCleanRefreshTokenCookie();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cleanJwt.toString())
                .header(HttpHeaders.SET_COOKIE, cleanRefresh.toString())
                .body(response);
    }

    /**
     * Reactivate account manually if desired (also auto-reactivated on login).
     */
    @PostMapping({"/me/reactivate", "/reactivate"})
    public ResponseEntity<UserResponse> reactivateAccount(@AuthenticationPrincipal User user) {
        UserResponse response = userService.reactivateAccount(user);
        return ResponseEntity.ok(response);
    }

    /**
     * Schedule account deletion (Instagram style 30-day grace period).
     * Account is marked PENDING_DELETION and scheduledDeletionAt is set.
     * Clears authentication session cookies.
     */
    @PostMapping({"/me/schedule-deletion", "/me/delete-request"})
    public ResponseEntity<UserResponse> scheduleAccountDeletion(@AuthenticationPrincipal User user) {
        UserResponse response = userService.scheduleAccountDeletion(user);

        ResponseCookie cleanJwt = cookieUtils.createCleanJwtCookie();
        ResponseCookie cleanRefresh = cookieUtils.createCleanRefreshTokenCookie();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cleanJwt.toString())
                .header(HttpHeaders.SET_COOKIE, cleanRefresh.toString())
                .body(response);
    }

    /**
     * Permanently delete account immediately (Hard Delete).
     * Deletes avatar from Cloudinary, deletes user entity, and cascade-deletes
     * profile, tokens, OTPs, and all user data.
     */
    @DeleteMapping({"/me/permanent", "/permanent"})
    public ResponseEntity<Map<String, String>> deleteAccountPermanently(@AuthenticationPrincipal User user) {
        userService.deleteAccountPermanently(user);

        ResponseCookie cleanJwt = cookieUtils.createCleanJwtCookie();
        ResponseCookie cleanRefresh = cookieUtils.createCleanRefreshTokenCookie();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cleanJwt.toString())
                .header(HttpHeaders.SET_COOKIE, cleanRefresh.toString())
                .body(Map.of(
                        "status", "success",
                        "message", "Account and all associated data permanently deleted successfully."
                ));
    }
}
