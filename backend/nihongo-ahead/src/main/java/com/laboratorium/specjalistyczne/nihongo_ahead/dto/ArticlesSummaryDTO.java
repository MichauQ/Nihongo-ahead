package com.laboratorium.specjalistyczne.nihongo_ahead.dto;

public class ArticlesSummaryDTO {
    private int id;
    private String title;
    private String titleImagePath;
    public ArticlesSummaryDTO(){

    }
    public ArticlesSummaryDTO(int id, String title, String titleImagePath) {
        this.id = id;
        this.title = title;
        this.titleImagePath = titleImagePath;
    }

    // Gettery i settery
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

    @Override
    public String toString() {
        return "ArticlesSummaryDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", titleImagePath='" + titleImagePath + '\'' +
                '}';
    }
}
