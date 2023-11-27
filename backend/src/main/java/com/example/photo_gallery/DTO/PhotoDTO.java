package com.example.photo_gallery.DTO;
 
public class PhotoDTO {
 
 
    private int photoID;
    private String photoName;
    private Boolean isFavorite;
 
    public PhotoDTO(int photoID, String photoName, Boolean isFavorite) {
        this.photoID = photoID;
        this.photoName = photoName;
        this.isFavorite = isFavorite;
    }
 
    public PhotoDTO() {
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
        return "PhotoDTO{" +
                "photoID=" + photoID +
                ", photoName='" + photoName + '\'' +
                ", isFavorite='" + isFavorite + '\'' +
                '}';
    }
}