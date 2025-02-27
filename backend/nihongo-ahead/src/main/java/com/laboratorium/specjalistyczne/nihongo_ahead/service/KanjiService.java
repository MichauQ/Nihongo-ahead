package com.laboratorium.specjalistyczne.nihongo_ahead.service;

import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ChooseOneQuizDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ImageDataDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.KanjiFullDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.entity.Kanji;

import java.util.List;

public interface KanjiService {

    List<KanjiFullDTO> downloadAllImagesAndNames();
    List<ImageDataDTO> downloadAndShuffleKanji(List<Integer> number);

    boolean validateAnswer(int id, String answerInput);

    List<KanjiFullDTO> downloadAllNames();

    List<ChooseOneQuizDTO> downloadDataForQuiz(List<Integer> number);

    List<Kanji> downloadAllKanjiData();

//    void refreshKanjiData(); // Nowa metoda

//    List<Kanji> findAll();
//    Kanji save(Kanji theKanji);
//
//    void deleteById(int theId);
//
//    Kanji findById(int kanjiId);
}
