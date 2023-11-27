package com.example.photo_gallery.entity;

import java.io.Serializable;

public class PhotoTagId implements Serializable{
    private int photoID;

    private String tag;

    public PhotoTagId(int photoID, String tag) {
        this.photoID = photoID;
        this.tag = tag;
    }

    public PhotoTagId() {}
}
