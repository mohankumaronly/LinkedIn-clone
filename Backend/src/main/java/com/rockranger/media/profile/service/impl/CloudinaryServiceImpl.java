package com.rockranger.media.profile.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.rockranger.media.profile.exception.ImageUploadException;
import com.rockranger.media.profile.exception.InvalidImageException;
import com.rockranger.media.profile.service.CloudinaryService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    private static final String MAX_FILE_SIZE_LABEL = "5MB";

    private static final List<String> ALLOWED_CONTENT_TYPES = Arrays.asList(
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/gif"
    );

    private final Cloudinary cloudinary;

    public CloudinaryServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public String uploadImage(MultipartFile file, String folder) {
        validateImageFile(file);

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", folder,
                            "resource_type", "image"
                    )
            );

            Object secureUrl = uploadResult.get("secure_url");
            if (secureUrl == null) {
                throw new ImageUploadException("Failed to retrieve uploaded image URL from Cloudinary.");
            }
            return secureUrl.toString();
        } catch (IOException e) {
            throw new ImageUploadException("Failed to read image file data: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new ImageUploadException("Failed to upload image to Cloudinary: " + e.getMessage(), e);
        }
    }

    @Override
    public void deleteImageByUrl(String imageUrl) {
        if (imageUrl == null || imageUrl.isBlank()) {
            return;
        }

        String publicId = extractPublicId(imageUrl);
        if (publicId == null || publicId.isBlank()) {
            return;
        }

        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            // Log or ignore deletion failure so main workflow is not disrupted
        }
    }

    private void validateImageFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidImageException("Image file must not be empty.");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new InvalidImageException(
                    "Image size exceeds the maximum limit of " + MAX_FILE_SIZE_LABEL + "."
            );
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
            throw new InvalidImageException("Invalid file format. Allowed formats are JPEG, PNG, WEBP, and GIF.");
        }
    }

    private String extractPublicId(String imageUrl) {
        try {
            int uploadIndex = imageUrl.indexOf("/upload/");
            if (uploadIndex == -1) {
                return null;
            }

            String pathAfterUpload = imageUrl.substring(uploadIndex + "/upload/".length());

            // Remove version tag (e.g., v172702345/)
            if (pathAfterUpload.startsWith("v") && pathAfterUpload.indexOf('/') != -1) {
                int firstSlash = pathAfterUpload.indexOf('/');
                String potentialVersion = pathAfterUpload.substring(1, firstSlash);
                if (potentialVersion.chars().allMatch(Character::isDigit)) {
                    pathAfterUpload = pathAfterUpload.substring(firstSlash + 1);
                }
            }

            // Remove file extension
            int lastDotIndex = pathAfterUpload.lastIndexOf('.');
            if (lastDotIndex != -1) {
                pathAfterUpload = pathAfterUpload.substring(0, lastDotIndex);
            }

            return pathAfterUpload;
        } catch (Exception e) {
            return null;
        }
    }
}