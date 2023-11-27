package com.example.photo_gallery.entity;

import jakarta.persistence.*;
@Entity
@IdClass(PhotoTagId.class)
@Table(name = "photo_tags")
public class PhotoTag {
    @Id
    @Column(name = "photo_id", length = 50)
    private int photoID;

    @Id
    @Column(name = "tag", length = 50)
    private String tag;

 
    public PhotoTag(int photoID, String tag) {
        this.photoID = photoID;
        this.tag = tag;
    }
 
    public PhotoTag() {
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
        return "PhotoTag{" +
                "photoID=" + photoID +
                ", tag='" + tag + '\'' +
                '}';
    }
}