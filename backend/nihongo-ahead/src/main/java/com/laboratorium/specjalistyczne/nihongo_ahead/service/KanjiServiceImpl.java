package com.laboratorium.specjalistyczne.nihongo_ahead.service;

import com.laboratorium.specjalistyczne.nihongo_ahead.dao.KanjiRepository;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ChooseOneQuizDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ImageDataDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.KanjiFullDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.entity.Kanji;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class KanjiServiceImpl implements KanjiService{

    private final KanjiRepository kanjiRepository;

    @Autowired
    public KanjiServiceImpl(KanjiRepository theKanjiRepository) {
        kanjiRepository = theKanjiRepository;
    }

    public List<Kanji> getImageAnswersForKanji(int correctId) {
        // Pobierz 3 losowe znaki Kanji (z wykluczeniem poprawnego)
        List<Kanji> randomKanji = kanjiRepository.findRandomKanjiExcludingId(correctId, 3);

        // Pobierz poprawny znak Kanji
        Kanji correctKanji = kanjiRepository.findById(correctId)
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono Kanji o ID: " + correctId));

        // Dodaj poprawny znak do listy
        randomKanji.add(correctKanji);

        // Wymieszaj losowo kolejność w liście
        Collections.shuffle(randomKanji);

        return randomKanji;
    }


    @Override // metoda która pobiera wszystkie obrazy i czytania znaków kanji z bazy danych
    public List<KanjiFullDTO> downloadAllImagesAndNames() {                        // nazwa metody
        List<Kanji> kanjiList = kanjiRepository.findAll();
        return kanjiList.stream().map(kanjis -> {
            return new KanjiFullDTO(kanjis.getId(), kanjis.getOnyomi(), kanjis.getKunyomi(), kanjis.getImageUrl());
        }).collect(Collectors.toList());
    }
    @Override
    public List<ImageDataDTO> downloadAndShuffleKanji(List<Integer> number){
        Integer start = number.get(0);
        Integer end = number.get(1);
        List<Kanji> kanjiList= kanjiRepository.findAllKanjiInRange(start, end);
        Collections.shuffle(kanjiList);
        return kanjiList.stream().map(kanjis ->{
            return new ImageDataDTO(kanjis.getId(), kanjis.getImageUrl());
        }).collect(Collectors.toList());
    }
    @Override
    public boolean validateAnswer(int id, String answerInput){
        Kanji kanji = kanjiRepository.findById(id).orElse(null);
        if(kanji == null){
            return false;
        }
        return Arrays.stream(kanji.getOnyomi().toUpperCase().split("/"))
                .anyMatch(correctAnswer -> correctAnswer.equals(answerInput.toUpperCase()));
    }
    @Override // metoda która pobiera wszystkie obrazy i czytania znaków kanji z bazy danych
    public List<KanjiFullDTO> downloadAllNames() {                        // nazwa metody
        List<Kanji> kanjiList = kanjiRepository.findAll();
        return kanjiList.stream().map(kanjis -> {
            return new KanjiFullDTO(kanjis.getId(), kanjis.getOnyomi());
        }).collect(Collectors.toList());
    }
    @Override
    public List<ChooseOneQuizDTO> downloadDataForQuiz(List<Integer> number) {
        Integer start = number.get(0);
        Integer end = number.get(1);
        List<ChooseOneQuizDTO> quizList = new ArrayList<>();

        // Pobierz listę Kanji w wybranym zakresie
        List<Kanji> kanjiList = kanjiRepository.findAllKanjiInRange(start, end);

        for (Kanji kanji : kanjiList) {
            // Pobierz losowe odpowiedzi wraz z poprawną
            List<Kanji> answers = getImageAnswersForKanji(kanji.getId());

            // Mapuj Kanji na DTO (ID i URL obrazka)
            List<ImageDataDTO> answerDTOs = answers.stream()
                    .map(k -> new ImageDataDTO(k.getId(), k.getImageUrl()))
                    .collect(Collectors.toList());

            // Dodaj pytanie do listy quizu
            quizList.add(new ChooseOneQuizDTO(kanji.getId(), kanji.getOnyomi(), answerDTOs));
        }
        Collections.shuffle(quizList);
        return quizList;
    }
    public List<Kanji> downloadAllKanjiData(){
        return kanjiRepository.findAll();
    }

}

/*@Override
    public void refreshKanjiData() {
        // Nie potrzebujemy otwierać sesji, użyjemy EntityManager
        List<Kanji> kanjiList = entityManager.createQuery("from Kanji", Kanji.class).getResultList();

        // Wyczyść kontekst
        entityManager.clear();

        // Możesz opcjonalnie ponownie załadować dane
        kanjiList = entityManager.createQuery("from Kanji", Kanji.class).getResultList();
    }*/

    /*@Override
    public List<Kanji> findAll(){
        return kanjiRepository.findAll();
    }

    @Override
    public Kanji save(Kanji theKanji) {
        return kanjiRepository.save(theKanji);
    }

    @Override
    public void deleteById(int theId) {
        kanjiRepository.deleteById(theId);
    }

    @Override
    public Kanji findById(int kanjiId) {
        Optional<Kanji> result = kanjiRepository.findById(kanjiId);
       Kanji theKanji=null;
       if(result.isPresent()){
           theKanji=result.get();
       }
       else {
           throw new RuntimeException("Did not find kanji id - " + kanjiId);
       }
        return theKanji;
    }*/