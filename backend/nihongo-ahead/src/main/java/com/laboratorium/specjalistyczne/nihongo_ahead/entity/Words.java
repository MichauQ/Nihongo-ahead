package com.laboratorium.specjalistyczne.nihongo_ahead.entity;

import jakarta.persistence.*;
import lombok.Builder;
@Entity
@Table(name="words")
@Builder
public class Words {

    // define variables
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name="hiragana")
    private String hiragana;
    @Column(name="reading")
    private String reading;
    @Column(name="meaning")
    private String meaning;
    @Column(name="type")
    private String type;
    @Column(name="is_daily")
    private Boolean is_daily;

    // define constructors
    public Words() {

    }

    public Words(int id, String hiragana, String reading, String meaning, String type, Boolean is_daily) {
        this.id = id;
        this.hiragana = hiragana;
        this.reading = reading;
        this.meaning = meaning;
        this.type = type;
        this.is_daily=is_daily;
    }
    public Words(int id, String hiragana, String reading, String meaning, String type) {
        this.id = id;
        this.hiragana = hiragana;
        this.reading = reading;
        this.meaning = meaning;
        this.type = type;
    }


    // define getters

    public int getId() {
        return id;
    }

    public String getHiragana() {
        return hiragana;
    }

    public String getReading() {
        return reading;
    }

    public String getMeaning() {
        return meaning;
    }

    public String getType() {
        return type;
    }

    public Boolean getIs_daily() {
        return is_daily;
    }

    // define setters

    public void setId(int id) {
        this.id = id;
    }

    public void setHiragana(String hiragana) {
        this.hiragana = hiragana;
    }

    public void setReading(String reading) {
        this.reading = reading;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setIs_daily(Boolean is_daily) {
        this.is_daily= is_daily;
    }


    // define toString
    @Override
    public String toString() {
        return "Words{" +
                "id=" + id +
                ", hiragana='" + hiragana + '\'' +
                ", reading='" + reading + '\'' +
                ", meaning='" + meaning + '\'' +
                ", type='" + type + '\'' +
                ", is_daily=" + is_daily +
                '}';
    }
}


