package com.laboratorium.specjalistyczne.nihongo_ahead.dto;

import java.util.List;

public class ChooseOneQuizDTO {
    private int id;
    private String name; // onyomi or name based on the entity type
    private List<ImageDataDTO> imageAnswers;

    public ChooseOneQuizDTO(int id, String name, List<ImageDataDTO> imageAnswers){
        this.id= id;
        this.name=name;
        this.imageAnswers=imageAnswers;
    }
    public ChooseOneQuizDTO(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ImageDataDTO> getImageAnswers() {
        return imageAnswers;
    }

    public void setImageAnswers(List<ImageDataDTO> imageAnswers) {
        this.imageAnswers = imageAnswers;
    }

    @Override
    public String toString() {
        return "ChooseOneQuizDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", imageAnswers=" + imageAnswers +
                '}';
    }
}
