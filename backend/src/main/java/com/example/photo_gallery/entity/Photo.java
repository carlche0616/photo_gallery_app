package com.example.photo_gallery.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "photos")
public class Photo {
    @Id
    @Column(name = "photo_id", length = 50)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int photoID;
 
    @Column(name = "photo_name", length = 50)
    private String photoName;

    @Column(name = "is_favorite", length = 50)
    private Boolean isFavorite;

 
    public Photo(int photoID, String photoName, Boolean isFavorite) {
        this.photoID = photoID;
        this.photoName = photoName;
        this.isFavorite = isFavorite;
    }
 
    public Photo() {
    }

    public Photo(String photoName, Boolean isFavorite) {
        this.photoName = photoName;
        this.isFavorite = isFavorite;
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
        return "Photo{" +
                "photoID=" + photoID +
                ", photoName='" + photoName + '\'' +
                ", isFavorite='" + isFavorite + '\'' +
                '}';
    }
}