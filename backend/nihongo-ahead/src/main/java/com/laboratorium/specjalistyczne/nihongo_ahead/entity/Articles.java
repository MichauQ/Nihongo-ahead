package com.laboratorium.specjalistyczne.nihongo_ahead.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;

import java.util.List;

@Entity
@Table(name = "articles")
@Builder
public class Articles{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title" )
    private String title;

    @Column(name = "title_image_path")
    private String titleImagePath;

    @Column(columnDefinition = "TEXT", name = "content")
    private String content;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ArticleImages> images;

    public Articles(){
    }
    public Articles(int id, String title, String titleImagePath, String content, List<ArticleImages> images) {
        this.id = id;
        this.title = title;
        this.titleImagePath = titleImagePath;
        this.content = content;
        this.images = images;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitleImagePath() {
        return titleImagePath;
    }

    public void setTitleImagePath(String titleImagePath) {
        this.titleImagePath = titleImagePath;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<ArticleImages> getImages() {
        return images;
    }

    public void setImages(List<ArticleImages> images) {
        this.images = images;
    }

    @Override
    public String toString() {
        return "Articles{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", titleImagePath='" + titleImagePath + '\'' +
                ", content='" + content + '\'' +
                ", images=" + images +
                '}';
    }
}
