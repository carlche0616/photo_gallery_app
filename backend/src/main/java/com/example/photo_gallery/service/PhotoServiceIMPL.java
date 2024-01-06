package com.example.photo_gallery.service;

import com.example.photo_gallery.PhotoGalleryRepo.PhotoRepo;
import com.example.photo_gallery.DTO.PhotoDTO;
import com.example.photo_gallery.DTO.PhotoAddDTO;
import com.example.photo_gallery.DTO.PhotoUpdateDTO;
import com.example.photo_gallery.entity.Photo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PhotoServiceIMPL implements PhotoService {
    @Autowired
    private PhotoRepo photoRepo;

    @Override
    public int addPhoto(PhotoAddDTO photoAddDTO) {
        Photo photo = new Photo(
            photoAddDTO.getPhotoName(),
            photoAddDTO.getIsFavorite()
        );
        photoRepo.save(photo);
        return photo.getPhotoID();
    }

    @Override
    public List<PhotoDTO> getAllPhotos() {
        List<Photo> getPhotos = photoRepo.findAll();
        List<PhotoDTO> photoDTOList = new ArrayList<>();
        for (Photo a : getPhotos) {
            PhotoDTO photoDTO = new PhotoDTO(
                    a.getPhotoID(),
                    a.getPhotoName(),
                    a.getIsFavorite());
            photoDTOList.add(photoDTO);
        }

        return photoDTOList;
    }

    @Override
    public List<PhotoDTO> getFavoritePhotos() {
        List<Photo> getPhotos = photoRepo.getFavoritePhotos();
        List<PhotoDTO> photoDTOList = new ArrayList<>();
        for (Photo a : getPhotos) {
            PhotoDTO photoDTO = new PhotoDTO(
                    a.getPhotoID(),
                    a.getPhotoName(),
                    a.getIsFavorite());
            photoDTOList.add(photoDTO);
        }

        return photoDTOList;
    }

    @Override
    public String updatePhotos(PhotoUpdateDTO photoUpdateDTO) {
        if (photoRepo.existsById(photoUpdateDTO.getPhotoID())) {
            Photo photo = photoRepo.getReferenceById(photoUpdateDTO.getPhotoID());

            photo.setPhotoName(photoUpdateDTO.getPhotoName());
            photo.setIsFavorite(photoUpdateDTO.getIsFavorite());
            photoRepo.save(photo);
        } else {
            System.out.println("Photo ID do not Exist");
        }

        return null;
    }

    @Override
    public boolean deletePhoto(int id) {

        if (photoRepo.existsById(id)) {
            photoRepo.deleteById(id);
            return true;
        } else {
            System.out.println("Photo id not found");
            return false;
        }
    }

    @Override
    public List<PhotoDTO> getPhotosByTag(String tag) {
        List<Photo> getPhotosByTag = photoRepo.getPhotoIDsByTag(tag);
        List<PhotoDTO> photoDTOList = new ArrayList<>();
        for (Photo a : getPhotosByTag) {
            PhotoDTO photoDTO = new PhotoDTO(
                    a.getPhotoID(),
                    a.getPhotoName(),
                    a.getIsFavorite());
            photoDTOList.add(photoDTO);
        }

        return photoDTOList;
    }
}