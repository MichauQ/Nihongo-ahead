package com.laboratorium.specjalistyczne.nihongo_ahead.entity;

import jakarta.persistence.*;
import lombok.Builder;

import java.util.Arrays;

@Entity
@Table(name = "syllables")
@Builder
public class Syllables {

    //define variables

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String syllableName;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ResourceType syllableType;
    @Column(name = "file_name")
    private String syllableFileName;
    @Lob
    @Column(name = "image")
    private byte[] syllableImage;
    @Column(name= "series_number")
    private int seriesNumber;
    // define constructors
    public Syllables() {

    }

    public Syllables(int id, String syllableName, ResourceType syllableType,String syllableFileName, byte[] syllableImage, int seriesNumber) {
        this.id = id;
        this.syllableName = syllableName;
        this.syllableType = syllableType;
        this.syllableFileName = syllableFileName;
        this.syllableImage = syllableImage;
        this.seriesNumber = seriesNumber;
    }


    //define getters
    public int getId() {
        return id;
    }

    public String getSyllableName() {
        return syllableName;
    }

    public ResourceType getSyllableType() {
        return syllableType;
    }
    public String getSyllableFileName() {
        return syllableFileName;
    }

    public byte[] getSyllableImage() {
        return syllableImage;
    }
    public int getSeriesNumber() {
        return seriesNumber;
    }

    //define setters
    public void setId(int id) {
        this.id = id;
    }

    public void setSyllableName(String syllableName) {
        this.syllableName = syllableName;
    }

    public void setSyllableType(ResourceType syllableType) {
        this.syllableType = syllableType;
    }
    public void setSyllableFileName(String syllableFileName) {
        this.syllableFileName = syllableFileName;
    }

    public void setSyllableImage(byte[] syllableImage) {
        this.syllableImage = syllableImage;
    }

    public void setSeriesNumber(int seriesNumber) {
        this.seriesNumber = seriesNumber;
    }
    // define toString


    @Override
    public String toString() {
        return "Syllables{" +
                "id=" + id +
                ", syllableName='" + syllableName + '\'' +
                ", syllableType=" + syllableType +
                ", syllableFileName='" + syllableFileName + '\'' +
                ", syllableImage=" + Arrays.toString(syllableImage) +
                ", seriesNumber=" + seriesNumber +
                '}';
    }
}
