package com.laboratorium.specjalistyczne.nihongo_ahead.controller;

import com.laboratorium.specjalistyczne.nihongo_ahead.dto.AnswerDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ChooseOneQuizDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ImageDataDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.KanjiFullDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.entity.Kanji;
import com.laboratorium.specjalistyczne.nihongo_ahead.service.KanjiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/kan")
public class KanjiController {
    private final KanjiService kanjiService;

    @Autowired
    public KanjiController(KanjiService theKanjiService){
        kanjiService=theKanjiService;
    }

    @GetMapping(value = "/allkanjidata")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<KanjiFullDTO>> downloadAllKanjiData() {
        List<KanjiFullDTO> allKanjiData = kanjiService.downloadAllImagesAndNames();
        return ResponseEntity.ok().body(allKanjiData);
    }
    @GetMapping(value = "/shuffledkanji/{number}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<ImageDataDTO>> downloadShuffledKanji(@PathVariable List<Integer> number) {
        List<ImageDataDTO> images = kanjiService.downloadAndShuffleKanji(number);
        return ResponseEntity.ok().body(images);
    }
    @GetMapping(value = "/allkanjinames")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<KanjiFullDTO>> downloadAllKanjiNames() {
        List<KanjiFullDTO> allKanjiData = kanjiService.downloadAllNames();
        return ResponseEntity.ok().body(allKanjiData);
    }

    @PostMapping( value = "/checkData")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> checkIfDataIsValid(@RequestBody AnswerDTO answer) {
        boolean isAnswerCorrect = kanjiService.validateAnswer(answer.getId(), answer.getAnswerInput());
        if (isAnswerCorrect) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
    @GetMapping(value = "/ChooseOneQuiz/{number}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<ChooseOneQuizDTO>> downloadDataForQuiz(@PathVariable List<Integer> number) {
        List<ChooseOneQuizDTO> allKanjiDataForQuiz = kanjiService.downloadDataForQuiz(number);
        return ResponseEntity.ok().body(allKanjiDataForQuiz);
    }
    @GetMapping(value = "/fullkanjidata")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<Kanji>> downloadFullKanjiData() {
        List<Kanji> allKanjiDataForQuiz = kanjiService.downloadAllKanjiData();
        return ResponseEntity.ok().body(allKanjiDataForQuiz);
    }
}

/*@GetMapping(value = "/refreshKanji")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<String> refreshKanji() {
        kanjiService.refreshKanjiData();
        return ResponseEntity.ok().body("Kanji data refreshed!");
    }*/

    /*@GetMapping("/kanji")
    public List<Kanji> findAll(){
        return kanjiService.findAll();
    }

    @PostMapping("/kanji")
    public Kanji addKanji(@RequestBody Kanji theKanji){
        theKanji.setId(0);
        return kanjiService.save(theKanji);
    }
    @DeleteMapping("/kanji/{kanjiId}")
    public String deleteKanji(@PathVariable int kanjiId){
        Kanji tempKanji = kanjiService.findById(kanjiId);
        if(tempKanji == null){
            throw new RuntimeException(("Kanji id not found - ") + kanjiId);
        }
        kanjiService.deleteById((kanjiId));
        return  "Deleted kanji id - " + kanjiId;
    }*/