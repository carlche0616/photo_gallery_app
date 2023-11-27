package com.example.photo_gallery.PhotoGalleryRepo;

import com.example.photo_gallery.entity.Photo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface PhotoRepo extends JpaRepository<Photo, Integer> {
    @Query(value = "SELECT p.photo_id, p.photo_name, p.is_favorite " + 
    "FROM PhotoGallery.photos p INNER JOIN PhotoGallery.photo_tags pt " +
    "ON p.photo_id = pt.photo_id " + 
    "WHERE pt.tag = :tag", nativeQuery = true)
    List<Photo> getPhotoIDsByTag(@Param("tag") String tag);

    @Query(value = "SELECT * FROM PhotoGallery.photos p WHERE p.is_favorite = true", nativeQuery = true)
    List<Photo> getFavoritePhotos();
}