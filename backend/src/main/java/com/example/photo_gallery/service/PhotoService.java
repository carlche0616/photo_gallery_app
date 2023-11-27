package com.example.photo_gallery.service;
import com.example.photo_gallery.DTO.PhotoDTO;
import com.example.photo_gallery.DTO.PhotoAddDTO;
import com.example.photo_gallery.DTO.PhotoUpdateDTO;
 
import java.util.List;
 
public interface PhotoService {
    String addPhoto(PhotoAddDTO photoAddDTO);
 
    List<PhotoDTO> getAllPhotos();
 
    List<PhotoDTO> getFavoritePhotos();

    String updatePhotos(PhotoUpdateDTO photoUpdateDTO);
 
    boolean deletePhoto(int id);

    List<PhotoDTO> getPhotosByTag(String tag);

    
}