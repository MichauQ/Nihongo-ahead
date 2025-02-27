package com.laboratorium.specjalistyczne.nihongo_ahead.dao;

import com.laboratorium.specjalistyczne.nihongo_ahead.entity.Kanji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KanjiRepository extends JpaRepository<Kanji, Integer> {
    @Query(value = "SELECT * FROM kanji WHERE id between :start and :end", nativeQuery = true)
    List<Kanji> findAllKanjiInRange(@Param("start") Integer start, @Param("end") Integer end);

    @Query(value = "SELECT * FROM kanji WHERE id <> :correctId ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Kanji> findRandomKanjiExcludingId(@Param("correctId") int correctId, @Param("limit") int limit);



}
