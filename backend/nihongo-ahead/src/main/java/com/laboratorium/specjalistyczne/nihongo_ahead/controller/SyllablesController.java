package com.laboratorium.specjalistyczne.nihongo_ahead.controller;

import com.laboratorium.specjalistyczne.nihongo_ahead.dto.AnswerDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ChooseOneQuizDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ImageDataDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.SyllableFullDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.entity.ResourceType;
import com.laboratorium.specjalistyczne.nihongo_ahead.service.SyllablesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/syl")
public class SyllablesController {


    private final SyllablesService syllablesService;

    @Autowired
    public SyllablesController(SyllablesService theSyllablesService){
       syllablesService=theSyllablesService;
    }

    @GetMapping("/{name}/{type}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> downloadImage(@PathVariable(name="name") String name, @PathVariable(name="type") String typeStr){
        String upperCaseType = typeStr.toUpperCase();

        ResourceType resourceType;
        try {
            resourceType = ResourceType.valueOf(upperCaseType);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid resource type: " + typeStr);
        }

        byte[] syllablesImage= syllablesService.downloadImage(name,resourceType);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(syllablesImage);
    }

    @GetMapping(value = "/shuffled/{seriesNumbers}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<ImageDataDTO>> downloadShuffledSyllablesBySeriesNumbers(@PathVariable List<Integer> seriesNumbers) {
        List<ImageDataDTO> images = syllablesService.downloadAndShuffleImages(seriesNumbers);
        return ResponseEntity.ok().body(images);
    }

    @GetMapping(value = "/allsyllabledata")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<SyllableFullDTO>> downloadAllSyllableData(){
        List<SyllableFullDTO> allSyllableData = syllablesService.downloadAllImagesAndNames();
        return  ResponseEntity.ok().body(allSyllableData);
    }

    @PostMapping( value = "/checkData")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> checkIfDataIsValid(@RequestBody AnswerDTO answer) {
        boolean isAnswerCorrect = syllablesService.validateAnswer(answer.getId(), answer.getAnswerInput());
        if (isAnswerCorrect) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
    @GetMapping(value = "/allnames")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<SyllableFullDTO>> downloadAllNames() {
        List<SyllableFullDTO> allNames = syllablesService.downloadAllNames();
        return ResponseEntity.ok().body(allNames);
    }
    @GetMapping(value = "/ChooseOneQuiz/{seriesNumbers}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<ChooseOneQuizDTO>> downloadDataForQuiz(@PathVariable List<Integer> seriesNumbers) {
        List<ChooseOneQuizDTO> allSyllableDataForQuiz = syllablesService.downloadDataForQuiz(seriesNumbers);
        return ResponseEntity.ok().body(allSyllableDataForQuiz);
    }
}

/*    @PostMapping
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> uploadImage(@RequestParam("id") int id,@RequestParam("image") MultipartFile file, @RequestParam("name")String name, @RequestParam("type")ResourceType type,@RequestParam("seriesNumber") int seriesNumber) throws IOException {
        String uploadImage = syllablesService.uploadImage(id,file,name,type, seriesNumber);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);

    } // upload image endpoint*/


/*@PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("image")MultipartFile file, @RequestParam("name")String name, @RequestParam("type")ResourceType type) throws IOException {
        String uploadImage = syllablesService.uploadImage(file,name,type);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);

    }*/ // upload image endpoint

   /*@GetMapping(value = "/allimages")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<String>> downloadAllImages(){
        List<String> allImages = syllablesService.downloadAllImages();
        return  ResponseEntity.ok().body(allImages);
    }
    @GetMapping(value = "/allnames")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<String>> downloadAllNames(){
        List<String> allNames = syllablesService.downloadAllNames();
        return ResponseEntity.ok().body(allNames);*/