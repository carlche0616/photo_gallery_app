package com.example.photo_gallery.DTO;

public class PhotoAddDTO {
 

    private String photoName;
    private Boolean isFavorite;
 
    public PhotoAddDTO(String photoName, Boolean isFavorite) {
        this.photoName = photoName;
        this.isFavorite = isFavorite;
    }
 
    public PhotoAddDTO() {
    }
 
    public String getPhotoName() {
        return photoName;
    }
 
    public void setPhotoName(String photoName) {
        this.photoName = photoName;
    }
 
    public Boolean getIsFavorite() {
        return isFavorite;
    }
 
    public void setIsFavorite(Boolean isFavorite) {
        this.isFavorite = isFavorite;
    }
    
    @Override
    public String toString() {
        return "PhotoAddDTO{" +
                ", photoName='" + photoName + '\'' +
                ", isFavorite='" + isFavorite + '\'' +
                '}';
    }
}