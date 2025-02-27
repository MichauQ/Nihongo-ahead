package com.laboratorium.specjalistyczne.nihongo_ahead.dao;

import com.laboratorium.specjalistyczne.nihongo_ahead.entity.Words;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface WordsRepository extends JpaRepository<Words, Integer> {
    @Query(value = "SELECT * FROM words WHERE id between :start and :end", nativeQuery = true)
    List<Words> findAllWordsInRange(@Param("start") Integer start, @Param("end") Integer end);

    @Query("SELECT w FROM Words w WHERE w.is_daily = :isDaily")
    Words findByIsDaily(@Param("isDaily") Boolean isDaily);


    @Query("SELECT w FROM Words w ORDER BY RAND() LIMIT 1")
    Words findRandomWord();  // Losuje słowo

    @Modifying
    @Transactional
    @Query("UPDATE Words w SET w.is_daily = false")
    void setAllWordsAsNotDaily();
}
