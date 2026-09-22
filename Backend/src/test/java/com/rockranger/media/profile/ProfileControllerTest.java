package com.rockranger.media.profile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.rockranger.media.authentication.entity.User;
import com.rockranger.media.profile.controller.ProfileController;
import com.rockranger.media.profile.dto.request.CreateProfileRequest;
import com.rockranger.media.profile.dto.request.UpdateProfileRequest;
import com.rockranger.media.profile.dto.response.ProfileResponse;
import com.rockranger.media.profile.entity.Gender;
import com.rockranger.media.profile.service.ProfileService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ProfileControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ProfileService profileService;

    @InjectMocks
    private ProfileController profileController;

    private ObjectMapper objectMapper;
    private User testUser;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        testUser = new User();
        testUser.setId(1L);
        testUser.setFullName("Mohan Kumar");
        testUser.setEmail("mohan@example.com");
        testUser.setAccountStatus(com.rockranger.media.authentication.entity.AccountStatus.ACTIVE);

        HandlerMethodArgumentResolver authPrincipalResolver = new HandlerMethodArgumentResolver() {
            @Override
            public boolean supportsParameter(MethodParameter parameter) {
                return parameter.hasParameterAnnotation(AuthenticationPrincipal.class);
            }

            @Override
            public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                          NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
                return testUser;
            }
        };

        mockMvc = MockMvcBuilders.standaloneSetup(profileController)
                .setCustomArgumentResolvers(authPrincipalResolver)
                .build();
    }

    @Test
    @DisplayName("POST /api/v1/profiles creates profile using pure JSON only")
    void testCreateProfile_JsonOnly() throws Exception {
        CreateProfileRequest request = new CreateProfileRequest(
                "mohankumar",
                "Mohan Kumar",
                "Software Engineer",
                LocalDate.of(2000, 1, 15),
                Gender.MALE
        );

        ProfileResponse response = new ProfileResponse(
                10L, 1L, "mohankumar", "Mohan Kumar", "Software Engineer",
                null, LocalDate.of(2000, 1, 15), Gender.MALE,
                LocalDateTime.now(), LocalDateTime.now()
        );

        when(profileService.createProfile(any(User.class), any(CreateProfileRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/v1/profiles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username").value("mohankumar"))
                .andExpect(jsonPath("$.displayName").value("Mohan Kumar"))
                .andExpect(jsonPath("$.profileImageUrl").isEmpty());

        verify(profileService).createProfile(any(User.class), any(CreateProfileRequest.class));
    }

    @Test
    @DisplayName("PUT /api/v1/profiles/me updates profile anytime using pure JSON")
    void testUpdateProfile_JsonOnly() throws Exception {
        UpdateProfileRequest request = new UpdateProfileRequest(
                "mohankumar_dev",
                "Mohan K.",
                "Updated bio anytime",
                LocalDate.of(2000, 1, 15),
                Gender.MALE
        );

        ProfileResponse response = new ProfileResponse(
                10L, 1L, "mohankumar_dev", "Mohan K.", "Updated bio anytime",
                "https://cloudinary.com/avatar.jpg", LocalDate.of(2000, 1, 15), Gender.MALE,
                LocalDateTime.now(), LocalDateTime.now()
        );

        when(profileService.updateProfile(any(User.class), any(UpdateProfileRequest.class)))
                .thenReturn(response);

        mockMvc.perform(put("/api/v1/profiles/me")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("mohankumar_dev"))
                .andExpect(jsonPath("$.displayName").value("Mohan K."))
                .andExpect(jsonPath("$.bio").value("Updated bio anytime"))
                .andExpect(jsonPath("$.profileImageUrl").value("https://cloudinary.com/avatar.jpg"));

        verify(profileService).updateProfile(any(User.class), any(UpdateProfileRequest.class));
    }

    @Test
    @DisplayName("POST /api/v1/profiles/avatar uploads File type image")
    void testUploadAvatar_File() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "avatar", "avatar.png", "image/png", new byte[]{1, 2, 3, 4}
        );

        ProfileResponse response = new ProfileResponse(
                10L, 1L, "mohankumar", "Mohan Kumar", "Bio",
                "https://cloudinary.com/new_avatar.jpg", LocalDate.of(2000, 1, 15), Gender.MALE,
                LocalDateTime.now(), LocalDateTime.now()
        );

        when(profileService.uploadAvatar(any(User.class), any()))
                .thenReturn(response);

        mockMvc.perform(multipart("/api/v1/profiles/avatar")
                        .file(file))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.profileImageUrl").value("https://cloudinary.com/new_avatar.jpg"));

        verify(profileService).uploadAvatar(any(User.class), any());
    }

    @Test
    @DisplayName("DELETE /api/v1/profiles/avatar deletes avatar anytime")
    void testDeleteAvatar() throws Exception {
        ProfileResponse response = new ProfileResponse(
                10L, 1L, "mohankumar", "Mohan Kumar", "Bio",
                null, LocalDate.of(2000, 1, 15), Gender.MALE,
                LocalDateTime.now(), LocalDateTime.now()
        );

        when(profileService.deleteAvatar(any(User.class)))
                .thenReturn(response);

        mockMvc.perform(delete("/api/v1/profiles/avatar"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.profileImageUrl").isEmpty());

        verify(profileService).deleteAvatar(any(User.class));
    }
}
