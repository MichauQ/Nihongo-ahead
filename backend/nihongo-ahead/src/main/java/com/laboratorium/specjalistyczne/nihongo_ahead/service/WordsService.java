package com.laboratorium.specjalistyczne.nihongo_ahead.service;

import com.laboratorium.specjalistyczne.nihongo_ahead.entity.Words;

import java.util.List;

public interface WordsService {
    List<Words> downloadAllData();
    List<Words> downloadAllDataAndShuffle(List<Integer> number);
    Words getDailyWord();
    void changeDailyWord();
}
