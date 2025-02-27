package com.laboratorium.specjalistyczne.nihongo_ahead.dto;

import jakarta.persistence.*;

public class KanjiFullDTO {


    // define variables
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name="onyomi")
    private String onyomi;
    @Column(name="kunyomi")
    private String kunyomi;
    @Column(name="imageUrl")
    private String imageUrl;

    // define constructors
    public KanjiFullDTO() {

    }

    public KanjiFullDTO(int id, String onyomi, String kunyomi, String imageUrl) {
        this.id = id;
        this.onyomi = onyomi;
        this.kunyomi = kunyomi;
        this.imageUrl = imageUrl;
    }

    public KanjiFullDTO(int id, String onyomi) {
        this.id = id;
        this.onyomi = onyomi;
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

    public String getImageUrl() {
        return imageUrl;
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

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    // define toString


    @Override
    public String toString() {
        return "Kanji{" +
                "id=" + id +
                ", onyomi='" + onyomi + '\'' +
                ", kunyomi='" + kunyomi + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}


