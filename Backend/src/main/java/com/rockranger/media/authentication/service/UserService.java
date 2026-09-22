package com.rockranger.media.authentication.service;

import com.rockranger.media.authentication.dto.response.UserResponse;
import com.rockranger.media.authentication.entity.User;

public interface UserService {

    UserResponse getMyAccount(User user);

    UserResponse deactivateAccount(User user);

    UserResponse reactivateAccount(User user);

    UserResponse scheduleAccountDeletion(User user);

    void deleteAccountPermanently(User user);
}
