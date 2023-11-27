package com.example.photo_gallery.service;
import com.example.photo_gallery.DTO.PhotoTagDTO;
import com.example.photo_gallery.DTO.PhotoTagAddDTO;
 
import java.util.List;
 
public interface PhotoTagService {
    String addPhotoTag(PhotoTagAddDTO photoTagAddDTO);
 
    List<PhotoTagDTO> getAllPhotoTags(int id);
 
    boolean deletePhotoTag(int id, String tag);
}