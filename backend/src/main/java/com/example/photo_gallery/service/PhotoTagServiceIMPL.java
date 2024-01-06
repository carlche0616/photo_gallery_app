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
    public List<String> addPhotoTags(List<PhotoTagAddDTO> photoTagAddDTOList) {
        List<String> ids = new ArrayList<>();
        for (PhotoTagAddDTO photoTagAddDTO : photoTagAddDTOList) {
            PhotoTag photoTag = new PhotoTag(

                    photoTagAddDTO.getPhotoID(),
                    photoTagAddDTO.getTag());
            photoTagRepo.save(photoTag);
            ids.add(photoTag.getTag());
        }
        return ids;
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
    public List<String> deletePhotoTags(List<PhotoTagDTO> photoTagDTOList) {
        List<String> tagsFailedToDelete = new ArrayList<>();
        for (PhotoTagDTO photoTagDTO : photoTagDTOList) {
            List<PhotoTag> photoTag = photoTagRepo.getPhotoTag(photoTagDTO.getPhotoID(), photoTagDTO.getTag());
            if (photoTag.size() != 0) {
                photoTagRepo.deleteAll(photoTag);
            } else {
                tagsFailedToDelete.add(photoTagDTO.getTag());
            }
        }
        return tagsFailedToDelete;
    }
}
