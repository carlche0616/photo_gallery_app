package com.example.photo_gallery.DTO;
 
public class PhotoUpdateDTO {
 
 
    private int photoID;
    private String photoName;
    private Boolean isFavorite;
 
    public PhotoUpdateDTO(int photoID, String photoName, Boolean isFavorite) {
        this.photoID = photoID;
        this.photoName = photoName;
        this.isFavorite = isFavorite;
    }
 
    public PhotoUpdateDTO() {
    }
 
    public int getPhotoID() {
        return photoID;
    }
 
    public void setPhotoID(int photoID) {
        this.photoID = photoID;
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
        return "PhotoUpdateDTO{" +
                "photoID=" + photoID +
                ", photoName='" + photoName + '\'' +
                ", isFavorite='" + isFavorite + '\'' +
                '}';
    }
}