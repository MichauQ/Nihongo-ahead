package com.laboratorium.specjalistyczne.nihongo_ahead.entity;

import jakarta.persistence.*;
import lombok.Builder;

@Entity
@Table(name="kanji")
@Builder
public class Kanji {

    // define variables
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name="onyomi")
    private String onyomi;
    @Column(name="kunyomi")
    private String kunyomi;
    @Column(name="translation")
    private String translation;
    @Column(name="imageurl")
    private String imageUrl;
    @Column(name="association")
    private String association;
    @Column(name="example")
    private String example;
    // define constructors
    public Kanji() {

    }

    public Kanji(int id, String onyomi, String kunyomi, String translation, String imageUrl) {
        this.id = id;
        this.onyomi = onyomi;
        this.kunyomi = kunyomi;
        this.translation = translation;
        this.imageUrl = imageUrl;
    }
    public Kanji(int id, String onyomi, String kunyomi, String translation, String imageUrl,String association,String example ) {
        this.id = id;
        this.onyomi = onyomi;
        this.kunyomi = kunyomi;
        this.translation = translation;
        this.imageUrl = imageUrl;
        this.association=association;
        this.example=example;
    }


    // define getters

    public int getId() {
        return id;
    }

    public String getOnyomi() {
        return onyomi;
    }

    public String getKunyomi() {
        return kunyomi;
    }

    public String getTranslation() {
        return translation;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getAssociation() {
        return association;
    }

    public String getExample() {
        return example;
    }

    // define setters

    public void setId(int id) {
        this.id = id;
    }

    public void setOnyomi(String onyomi) {
        this.onyomi = onyomi;
    }

    public void setKunyomi(String kunyomi) {
        this.kunyomi = kunyomi;
    }

    public void setTranslation(String translation) {
        this.translation = translation;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setAssociation(String association) {
        this.association = association;
    }

    public void setExample(String example) {
        this.example = example;
    }

    // define toString


    @Override
    public String toString() {
        return "Kanji{" +
                "id=" + id +
                ", onyomi='" + onyomi + '\'' +
                ", kunyomi='" + kunyomi + '\'' +
                ", translation='" + translation + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", association='" + association + '\'' +
                ", example='" + example + '\'' +
                '}';
    }
}
