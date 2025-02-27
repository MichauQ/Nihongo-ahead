package com.laboratorium.specjalistyczne.nihongo_ahead.dto;

public class ImageDataDTO {
    private int id;
    private String imageUrl;
    public ImageDataDTO(){

    }
    public ImageDataDTO(int id, String imageUrl){
        this.id = id;
        this.imageUrl = imageUrl;
    }


    public int getId() {
        return id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    @Override
    public String toString(){
        return "ImageDataDTO{" +
                "id=" + id +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
