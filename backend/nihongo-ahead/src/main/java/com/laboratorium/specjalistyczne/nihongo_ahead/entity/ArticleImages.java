package com.laboratorium.specjalistyczne.nihongo_ahead.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Builder;

@Entity
@Table(name = "article_images")
@Builder
public class ArticleImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "image_path")
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "article_id", nullable = false) // Powiązanie z tabelą articles
    @JsonBackReference
    private Articles article;

    public ArticleImages(){

    }

    public ArticleImages(int id, String imagePath, Articles article) {
        this.id = id;
        this.imagePath = imagePath;
        this.article = article;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Articles getArticle() {
        return article;
    }

    public void setArticle(Articles article) {
        this.article = article;
    }

    @Override
    public String toString() {
        return "ArticleImages{" +
                "id=" + id +
                ", imagePath='" + imagePath + '\'' +
                ", article=" + article +
                '}';
    }
}
