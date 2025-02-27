package com.laboratorium.specjalistyczne.nihongo_ahead.dto;

public class AnswerDTO {
    private int id;
    private String answerInput;

    public AnswerDTO(){

    }
    public AnswerDTO(int id, String answerInput){
        this.id=id;
        this.answerInput=answerInput;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setAnswerInput(String answerInput) {
        this.answerInput = answerInput;
    }

    public int getId() {
        return id;
    }
    public String getAnswerInput() {
        return answerInput;
    }

    @Override
    public String toString() {
        return "AnswerDTO{" +
                "id=" + id +
                ", answerInput='" + answerInput + '\'' +
                '}';
    }
}
