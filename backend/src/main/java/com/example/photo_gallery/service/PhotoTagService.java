package com.example.photo_gallery.service;
import com.example.photo_gallery.DTO.PhotoTagDTO;
import com.example.photo_gallery.DTO.PhotoTagAddDTO;
 
import java.util.List;
 
public interface PhotoTagService {
    List<String> addPhotoTags(List<PhotoTagAddDTO> photoTagAddDTOList);
 
    List<PhotoTagDTO> getAllPhotoTags(int id);
 
    List<String> deletePhotoTags(List<PhotoTagDTO> photoTagDTOList);
}