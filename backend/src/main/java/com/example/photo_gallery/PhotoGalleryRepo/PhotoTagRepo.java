package com.example.photo_gallery.PhotoGalleryRepo;
import com.example.photo_gallery.entity.PhotoTag;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
 
@EnableJpaRepositories
@Repository
public interface PhotoTagRepo extends JpaRepository<PhotoTag,Integer> {
    @Query(value = "SELECT * FROM PhotoGallery.photo_tags pt WHERE pt.photo_id = :photo_id", nativeQuery = true)
    List<PhotoTag> getPhotoTags(@Param("photo_id") int id);

    @Query(value = "SELECT * FROM PhotoGallery.photo_tags pt WHERE pt.photo_id = :photo_id AND pt.tag = :tag", nativeQuery = true)
    List<PhotoTag> getPhotoTag(@Param("photo_id") int id, @Param("tag") String tag);

}