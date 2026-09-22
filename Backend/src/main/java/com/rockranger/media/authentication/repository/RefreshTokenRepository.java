package com.rockranger.media.authentication.repository;

import com.rockranger.media.authentication.entity.RefreshToken;
import com.rockranger.media.authentication.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByTokenHashAndRevokedFalse(String tokenHash);
    List<RefreshToken> findByUserAndRevokedFalse(User user);
    void deleteByUser(User user);
}
