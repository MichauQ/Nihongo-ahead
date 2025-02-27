package com.laboratorium.specjalistyczne.nihongo_ahead.controller;

import com.laboratorium.specjalistyczne.nihongo_ahead.entity.Words;
import com.laboratorium.specjalistyczne.nihongo_ahead.service.WordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/word")
public class WordsController {
    private final WordsService wordsService;
    @Autowired
    public WordsController(WordsService theWordsService) {
        this.wordsService = theWordsService;
    }


    @GetMapping(value = "/allwordsdata")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<Words>> downloadAllWordsData() {
        List<Words> allWordsData = wordsService.downloadAllData();
        return ResponseEntity.ok().body(allWordsData);
    }
    @GetMapping(value = "/allwordsdatashuffled/{number}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<Words>> downloadAllWordsDataAndSuffle(@PathVariable List<Integer> number) {
        List<Words> shuffledData = wordsService.downloadAllDataAndShuffle(number);
        return ResponseEntity.ok().body(shuffledData);
    }
    @GetMapping("/daily")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<Words> getDailyWord() {
        Words dailyWord = wordsService.getDailyWord();
        return ResponseEntity.ok(dailyWord);
    }

    // Endpoint do zmiany słowa dnia (do testów)
    @PostMapping("/change-daily")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<String> changeDailyWord() {
        wordsService.changeDailyWord();
        return ResponseEntity.ok("Słowo dnia zostało zmienione!");
    }
}
