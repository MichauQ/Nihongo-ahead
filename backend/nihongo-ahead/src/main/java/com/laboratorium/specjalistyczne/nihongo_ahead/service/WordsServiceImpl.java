package com.laboratorium.specjalistyczne.nihongo_ahead.service;

import com.laboratorium.specjalistyczne.nihongo_ahead.dao.WordsRepository;
import com.laboratorium.specjalistyczne.nihongo_ahead.entity.Words;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WordsServiceImpl implements WordsService {
    private final WordsRepository wordsRepository;

    @Autowired
    public WordsServiceImpl(WordsRepository wordsRepository) {
        this.wordsRepository = wordsRepository;
    }

    @Override
    public List<Words> downloadAllData(){
        List<Words> wordsList = wordsRepository.findAll();
        return wordsList.stream().map(words -> {
            return new Words(words.getId(), words.getHiragana(), words.getReading(), words.getMeaning(), words.getType() );
        }).collect(Collectors.toList());
    }
    @Override
    public List<Words> downloadAllDataAndShuffle(List<Integer> number){
        Integer start = number.get(0);
        Integer end = number.get(1);
        List<Words> wordsList = wordsRepository.findAllWordsInRange(start+1,end);
        Collections.shuffle(wordsList);
        return wordsList.stream().map(words -> {
            return new Words(words.getId(), words.getHiragana(), words.getReading(), words.getMeaning(), words.getType());
        }).collect(Collectors.toList());
    }
    @Override
    public Words getDailyWord() {
        // Pobierz słowo, które ma flagę 'is_daily' ustawioną na 1
        return wordsRepository.findByIsDaily(true);
    }

    // Zmiana słowa dnia
    @Override
    @Transactional
    public void changeDailyWord() {
        Words randomWord = wordsRepository.findRandomWord();
        wordsRepository.setAllWordsAsNotDaily();
        randomWord.setIs_daily(true);
        wordsRepository.save(randomWord);
    }
    @Scheduled(cron = "0 0 0 * * *", zone = "Europe/Warsaw")
    public void scheduleDailyWordChange() {
        System.out.println("Zmiana słowa dnia o północy...");
        changeDailyWord();
    }
}
