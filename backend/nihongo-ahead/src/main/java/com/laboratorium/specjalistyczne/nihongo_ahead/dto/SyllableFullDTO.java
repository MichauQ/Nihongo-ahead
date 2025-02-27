package com.laboratorium.specjalistyczne.nihongo_ahead.dto;

public class SyllableFullDTO {
    private int id;
    private String imageUrl;
    private String syllableName;
    public SyllableFullDTO(){

    }
    public SyllableFullDTO(int id, String imageUrl, String syllableName){
        this.id = id;
        this.imageUrl = imageUrl;
        this.syllableName = syllableName;

    }

    public SyllableFullDTO(int id, String syllableName) {
        this.id = id;
        this.syllableName = syllableName;
    }


    public int getId() {
        return id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getSyllableName() {
        return syllableName;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setSyllableName(String syllableName) {
        this.syllableName = syllableName;
    }

    @Override
    public String toString() {
        return "SyllableFullDTO{" +
                "id=" + id +
                ", imageUrl='" + imageUrl + '\'' +
                ", syllableName='" + syllableName + '\'' +
                '}';
    }
}
