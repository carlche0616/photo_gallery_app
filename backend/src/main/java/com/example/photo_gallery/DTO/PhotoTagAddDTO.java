package com.example.photo_gallery.DTO;
 
public class PhotoTagAddDTO {
 
 
    private int photoID;
    private String tag;
 
    public PhotoTagAddDTO(int photoID, String tag) {
        this.photoID = photoID;
        this.tag = tag;
    }
 
    public PhotoTagAddDTO() {
    }
 
    public int getPhotoID() {
        return photoID;
    }
 
    public void setPhotoID(int photoID) {
        this.photoID = photoID;
    }
 
    public String getTag() {
        return tag;
    }
 
    public void setTag(String tag) {
        this.tag = tag;
    }
 
    @Override
    public String toString() {
        return "PhotoTagAddDTO{" +
                "photoID=" + photoID +
                ", tag='" + tag + '\'' +
                '}';
    }
}