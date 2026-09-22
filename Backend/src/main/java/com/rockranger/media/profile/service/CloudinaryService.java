package com.rockranger.media.profile.service;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {

    String uploadImage(MultipartFile file, String folder);

    void deleteImageByUrl(String imageUrl);
}
