package com.example.photo_gallery.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.photo_gallery.DTO.PhotoTagAddDTO;
import com.example.photo_gallery.DTO.PhotoTagDTO;
import com.example.photo_gallery.PhotoGalleryRepo.PhotoTagRepo;
import com.example.photo_gallery.entity.PhotoTag;
import org.springframework.stereotype.Service;

@Service
public class PhotoTagServiceIMPL implements PhotoTagService {
    @Autowired
    private PhotoTagRepo photoTagRepo;

    @Override
    public String addPhotoTag(PhotoTagAddDTO photoTagAddDTO) {
        PhotoTag photoTag = new PhotoTag(

                photoTagAddDTO.getPhotoID(),
                photoTagAddDTO.getTag());
        photoTagRepo.save(photoTag);
        return photoTag.getTag();
    }

    @Override
    public List<PhotoTagDTO> getAllPhotoTags(int id) {

        List<PhotoTag> photoTags = photoTagRepo.getPhotoTags(id);
        List<PhotoTagDTO> photoTagDTOList = new ArrayList<>();
        for (PhotoTag pt : photoTags) {
            PhotoTagDTO photoTagDTO = new PhotoTagDTO(

                    pt.getPhotoID(),
                    pt.getTag());
            photoTagDTOList.add(photoTagDTO);
        }
        return photoTagDTOList;
    }

    @Override
    public boolean deletePhotoTag(int photoID, String tag) {
        List<PhotoTag> photoTag = photoTagRepo.getPhotoTag(photoID, tag);
        if (photoTag.size() != 0) {
            photoTagRepo.deleteAll(photoTag);
            ;
            return true;
        } else {
            System.out.println("Tag not found");
            return false;
        }
    }
}
