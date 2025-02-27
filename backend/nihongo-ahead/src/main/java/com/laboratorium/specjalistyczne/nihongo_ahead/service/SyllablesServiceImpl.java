package com.laboratorium.specjalistyczne.nihongo_ahead.service;

import com.laboratorium.specjalistyczne.nihongo_ahead.Util.ImageUtil;
import com.laboratorium.specjalistyczne.nihongo_ahead.dao.SyllablesRepository;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ChooseOneQuizDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ImageDataDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.SyllableFullDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.entity.ResourceType;
import com.laboratorium.specjalistyczne.nihongo_ahead.entity.Syllables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SyllablesServiceImpl implements SyllablesService {

    private final SyllablesRepository syllablesRepository;

    @Autowired
    public SyllablesServiceImpl(SyllablesRepository theSyllablesRepository){
        syllablesRepository=theSyllablesRepository;
    }
    public List<Syllables> getImageAnswersForSyllables(int correctId) {
        // Pobierz 3 losowe znaki Kanji (z wykluczeniem poprawnego)
        List<Syllables> randomSyllables = syllablesRepository.findRandomSyllableExcludingId(correctId, 3);

        // Pobierz poprawny znak Kanji
        Syllables correctSyllable = syllablesRepository.findById(correctId)
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono Kanji o ID: " + correctId));

        // Dodaj poprawny znak do listy
        randomSyllables.add(correctSyllable);

        // Wymieszaj losowo kolejność w liście
        Collections.shuffle(randomSyllables);

        return randomSyllables;
    }
    // metoda wewnętrzna konwertująca obrazy na base64
    private List<String> convertImagesToBase64(List<byte[]> images) {
        List<String> imageUrls = new ArrayList<>();
        for (byte[] image : images) {
            String imageUrl = Base64.getEncoder().encodeToString(image);
            imageUrls.add(imageUrl);
        }
        return imageUrls;
    }

    private String modifySyllableName(Syllables syllables, Set<Integer> idsToModify) {
        String originalName = syllables.getSyllableName();
        return idsToModify.contains(syllables.getId())
                ? originalName.substring(0, 2)
                : originalName;
    }

    @Override // Pobieranie pojedynczego obrazu po nazwie i typie (np. a, hiragana)
    public byte[] downloadImage(String name,ResourceType type){
        Optional<Syllables> dbSyllables = syllablesRepository.findBySyllableNameAndSyllableType(name,type);
        byte[] images = ImageUtil.decompressImage((dbSyllables.get().getSyllableImage()));
        return images;
    }

//    @Override // Pobieranie wszystkich obrazów
//    public  List<String> downloadAllImages(){
//        List<byte[]> images = new ArrayList<>();
//        List<Syllables> syllables = syllablesRepository.findAll();
//        for(Syllables syllable: syllables){
//            images.add(ImageUtil.decompressImage(syllable.getSyllableImage()));
//        }
//        return convertImagesToBase64(images);
//    }

    @Override // metoda która pobiera obrazy o danym numerze serii, miesza je i konwertuje na format base64
    public List<ImageDataDTO> downloadAndShuffleImages(List<Integer> seriesNumbers) {
        List<Syllables> syllablesList = new ArrayList<>();
        for (int seriesNumber : seriesNumbers) {
            List<Integer> ids = syllablesRepository.findAllIdsBySeriesNumber(seriesNumber);
            for (int id : ids) {
                Syllables syllables = syllablesRepository.findById(id).orElse(null);
                if (syllables != null) {
                    syllablesList.add(syllables);
                }
            }
        }
        Collections.shuffle(syllablesList);
        return syllablesList.stream().map(syllables -> {
            byte[] image = ImageUtil.decompressImage(syllables.getSyllableImage());
            String imageUrl = Base64.getEncoder().encodeToString(image);
            return new ImageDataDTO(syllables.getId(), imageUrl);
        }).collect(Collectors.toList());
    }
    @Override // metoda która pobiera wszystkie nazwy znaków z bazy danych
    public List<SyllableFullDTO> downloadAllImagesAndNames() {

        List<Syllables> syllablesList = syllablesRepository.findAll();
        Set<Integer> idsToModify = new HashSet<>(Arrays.asList(53, 58, 59, 96, 97, 98, 99, 100, 101, 160, 165, 166, 203, 204, 205, 206, 207, 208));
        return syllablesList.stream().map(syllables -> {
            // Pobieranie i dekompresja obrazu
            byte[] image = ImageUtil.decompressImage(syllables.getSyllableImage());
            String imageUrl = Base64.getEncoder().encodeToString(image);

            // Pobieranie i ewentualna modyfikacja nazwy
            String originalName = syllables.getSyllableName();
            String modifiedName = idsToModify.contains(syllables.getId())
                    ? originalName.substring(0, 2)
                    : originalName;

            // Tworzenie DTO z ID, obrazem i nazwą
            return new SyllableFullDTO(syllables.getId(), imageUrl, modifiedName);
        }).collect(Collectors.toList());
    }
    @Override
    public boolean validateAnswer(int id, String answerInput){
        Syllables syllable = syllablesRepository.findById(id).orElse(null);
        return syllable !=null && syllable.getSyllableName().toUpperCase().equals(answerInput.toUpperCase());
    }
      @Override
    public String uploadImage(int id,MultipartFile file, String name, ResourceType type, int seriesNumber) throws IOException {
        Syllables syllables = syllablesRepository.save(Syllables.builder()
                .id(id)
                .syllableName(name)
                .seriesNumber(seriesNumber)
                .syllableFileName(file.getOriginalFilename())
                .syllableType(type)
                .syllableImage(ImageUtil.compressImage(file.getBytes())).build());
        if(syllables!= null){
            return "file uploaded succesfully : " + file.getOriginalFilename();
        }
        return null;
    }

    @Override // metoda która pobiera wszystkie nazwy znaków z bazy danych
    public List<SyllableFullDTO> downloadAllNames() {

        List<Syllables> syllablesList = syllablesRepository.findAll();
        Set<Integer> idsToModify = new HashSet<>(Arrays.asList(53, 58, 59, 96, 97, 98, 99, 100, 101, 160, 165, 166, 203, 204, 205, 206, 207, 208));
        return syllablesList.stream().map(syllables -> {
            // Pobieranie i ewentualna modyfikacja nazwy
            String originalName = syllables.getSyllableName();
            String modifiedName = idsToModify.contains(syllables.getId())
                    ? originalName.substring(0, 2)
                    : originalName;

            // Tworzenie DTO z ID, obrazem i nazwą
            return new SyllableFullDTO(syllables.getId(), modifiedName);
        }).collect(Collectors.toList());
    }
    @Override
    public List<ChooseOneQuizDTO> downloadDataForQuiz(List<Integer> seriesNumbers) {
        List<ChooseOneQuizDTO> quizList = new ArrayList<>();
        Set<Integer> idsToModify = new HashSet<>(Arrays.asList(53, 58, 59, 96, 97, 98, 99, 100, 101, 160, 165, 166, 203, 204, 205, 206, 207, 208));

        for (int seriesNumber : seriesNumbers) {
            List<Integer> syllableIds = syllablesRepository.findAllIdsBySeriesNumber(seriesNumber);
            List<ChooseOneQuizDTO> questionGroups = new ArrayList<>();

            for (int syllableId : syllableIds) {
                Syllables syllables = syllablesRepository.findById(syllableId)
                        .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono sylaby o ID: " + syllableId));

                // Modyfikacja nazwy sylaby, jeśli jest na liście
                String modifiedName = modifySyllableName(syllables, idsToModify);

                List<Syllables> answers = getImageAnswersForSyllables(syllables.getId());
                List<ImageDataDTO> answerDTOs = answers.stream()
                        .map(answer -> {
                            byte[] image = ImageUtil.decompressImage(answer.getSyllableImage());
                            String imageUrl = "data:image/png;base64," + Base64.getEncoder().encodeToString(image);
                            return new ImageDataDTO(answer.getId(), imageUrl);
                        })
                        .collect(Collectors.toList());

                ChooseOneQuizDTO quizDTO = new ChooseOneQuizDTO();
                quizDTO.setId(syllables.getId());
                quizDTO.setName(modifiedName);
                quizDTO.setImageAnswers(answerDTOs);

                questionGroups.add(quizDTO);
            }

            Collections.shuffle(questionGroups);
            quizList.addAll(questionGroups);
        }

        return quizList;
    }



}
// upload images
    /*@Override
    public List<Syllables> findAll(){
        return syllablesRepository.findAll();

    }*/ // find all
    /*@Override
    public  Syllables findById(int theId){
        Optional<Syllables> result = syllablesRepository.findById(theId);
        Syllables theSyllables = null;
        if(result.isPresent()){
            theSyllables = result.get();
        }
        else{
            throw new RuntimeException("Did not find Syllable id - " + theId);
        }
        return theSyllables;

    }*/ // find by id
    /*@Override
    public Syllables save(Syllables theSyllables){
        return syllablesRepository.save(theSyllables);

    }*/ // save
    /*@Override
    public void deleteById(int theId){
        syllablesRepository.deleteById(theId);

    }*/ // delete by id
    /*@Override
    public String uploadImage(MultipartFile file, String name, ResourceType type) throws IOException {
        Syllables syllables = syllablesRepository.save(Syllables.builder()
                .syllableName(name)
                .syllableFileName(file.getOriginalFilename())
                .syllableType(type)
                .syllableImage(ImageUtil.compressImage(file.getBytes())).build());
        if(syllables!= null){
            return "file uploaded succesfully : " + file.getOriginalFilename();
        }
        return null;

    } // upload images*/
    /* private List<byte[]> downloadImagesBySeriesNumber(int seriesNumber) {
        int[] ids = syllablesRepository.findAllIdsBySeriesNumber(seriesNumber);
        List<byte[]> syllables = new ArrayList<>();
        for (int id : ids) {
            syllables.add(ImageUtil.decompressImage(Objects.requireNonNull(syllablesRepository.findById(id).orElse(null)).getSyllableImage()));
        }
        return syllables;
    }*/ // metoda wewnętrzna pobierania obrazów po numerze serii


    /*@Override // Pobieranie wszystkich obrazów
    public  List<String> downloadAllImages(){
        List<byte[]> images = new ArrayList<>();
        List<Syllables> syllables = syllablesRepository.findAll();
        for(Syllables syllable: syllables){
            images.add(ImageUtil.decompressImage(syllable.getSyllableImage()));
        }
        return convertImagesToBase64(images);
    }*/