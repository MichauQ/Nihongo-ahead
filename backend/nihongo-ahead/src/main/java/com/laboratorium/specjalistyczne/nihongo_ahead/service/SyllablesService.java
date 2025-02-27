package com.laboratorium.specjalistyczne.nihongo_ahead.service;

import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ChooseOneQuizDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ImageDataDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.SyllableFullDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.entity.ResourceType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface SyllablesService {

    byte[] downloadImage(String name, ResourceType type);
    List<ImageDataDTO> downloadAndShuffleImages(List<Integer> seriesNumbers);

    //List<String> downloadAllImages();
    List<SyllableFullDTO> downloadAllImagesAndNames();
    boolean validateAnswer(int id, String answerInput);

    String uploadImage(int id, MultipartFile file, String name, ResourceType resourceType,int seriesNumber) throws IOException; // inne metody
    List<SyllableFullDTO> downloadAllNames();
    List<ChooseOneQuizDTO> downloadDataForQuiz(List<Integer> seriesNumbers);

}

/*List<Syllables> findAll();

    Syllables findById(int theId);

    /*Syllables save(Syllables theSyllables);

    void deleteById(int theId);

    String uploadImage(MultipartFile file, String name, ResourceType resourceType) throws IOException;*/ // inne metody


    /*List<String> downloadAllImages();*/