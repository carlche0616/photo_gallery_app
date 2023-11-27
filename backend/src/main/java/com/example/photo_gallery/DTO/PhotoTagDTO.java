package com.example.photo_gallery.DTO;
 
public class PhotoTagDTO {
 
 
    private int photoID;
    private String tag;
 
    public PhotoTagDTO(int photoID, String tag) {
        this.photoID = photoID;
        this.tag = tag;
    }
 
    public PhotoTagDTO() {
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
        return "PhotoTagDTO{" +
                "photoID=" + photoID +
                ", tag='" + tag + '\'' +
                '}';
    }
}