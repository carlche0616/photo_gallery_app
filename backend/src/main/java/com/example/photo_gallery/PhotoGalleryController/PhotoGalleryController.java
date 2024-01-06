package com.example.photo_gallery.PhotoGalleryController;

import com.example.photo_gallery.DTO.PhotoDTO;
import com.example.photo_gallery.DTO.PhotoTagAddDTO;
import com.example.photo_gallery.DTO.PhotoTagDTO;
import com.example.photo_gallery.DTO.PhotoAddDTO;
import com.example.photo_gallery.DTO.PhotoUpdateDTO;
import com.example.photo_gallery.service.PhotoService;
import com.example.photo_gallery.service.PhotoTagService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/gallery")
public class PhotoGalleryController {   
    @Autowired
    private PhotoService photoService;

    @Autowired
    private PhotoTagService photoTagService;

    @PostMapping(path = "/addPhoto")
    public int addPhoto(@RequestBody PhotoAddDTO photoAddDTO) {
        int id = photoService.addPhoto(photoAddDTO);
        return id;
    }

    @GetMapping(path = "/getAllPhotos")
    public List<PhotoDTO> getAllPhotos() {
        List<PhotoDTO> allPhotos = photoService.getAllPhotos();
        return allPhotos;
    }

    @GetMapping(path = "/getFavoritePhotos")
    public List<PhotoDTO> getFavoritePhotos() {
        List<PhotoDTO> favoritePhotos = photoService.getFavoritePhotos();
        return favoritePhotos;
    }

    @PutMapping(path = "/updatePhoto")
    public String updatePhotos(@RequestBody PhotoUpdateDTO photoUpdateDTO) {
        String id = photoService.updatePhotos(photoUpdateDTO);
        return id;
    }

    @DeleteMapping(path = "/deletePhoto/{id}")
    public Boolean deletePhoto(@PathVariable(value = "id") int id) {
        return photoService.deletePhoto(id);
    }

    @PostMapping("/uploadPhoto")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file) {

        String fileName = file.getOriginalFilename();
        try {
            File f = new File("/Users/carl/Desktop/projects/photo_gallery_app/frontend/public/images/" + fileName);
            file.transferTo(f);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok("File uploaded successfully.");
    }

    @PostMapping(path = "/addPhotoTags")
    public List<String> addPhotoTags(@RequestBody List<PhotoTagAddDTO> photoTagAddDTOList) {
        List<String> ids = photoTagService.addPhotoTags(photoTagAddDTOList);
        return ids;
    }

    @GetMapping(path = "/getAllPhotoTags/{id}")
    public List<PhotoTagDTO> getAllPhotoTags(@PathVariable(value = "id") int id) {
        List<PhotoTagDTO> allPhotoTags = photoTagService.getAllPhotoTags(id);
        return allPhotoTags;
    }

    @DeleteMapping(path = "/deletePhotoTags")
    public List<String> deletePhotoTags(@RequestBody List<PhotoTagDTO> photoTagDTOList) {
        return photoTagService.deletePhotoTags(photoTagDTOList);
    }

    @GetMapping(path = "/getPhotosByTag/{tag}")
    public List<PhotoDTO> getPhotosByTag(@PathVariable(value = "tag") String tag) {
        List<PhotoDTO> allPhotoTags = photoService.getPhotosByTag(tag);
        return allPhotoTags;
    }
    
}