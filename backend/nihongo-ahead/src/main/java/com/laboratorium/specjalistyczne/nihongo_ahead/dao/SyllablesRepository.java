package com.laboratorium.specjalistyczne.nihongo_ahead.dao;

import com.laboratorium.specjalistyczne.nihongo_ahead.entity.ResourceType;
import com.laboratorium.specjalistyczne.nihongo_ahead.entity.Syllables;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface SyllablesRepository extends JpaRepository<Syllables, Integer> {

    @Transactional(readOnly = true)
    Optional<Syllables> findBySyllableNameAndSyllableType(String syllableName, ResourceType type);
    @Query(value = "SELECT id FROM syllables WHERE series_number = :seriesNumber", nativeQuery = true)
    List<Integer> findAllIdsBySeriesNumber(int seriesNumber);
    @Query(value = "SELECT * FROM syllables WHERE id <> :correctId ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Syllables> findRandomSyllableExcludingId(@Param("correctId") int correctId, @Param("limit") int limit);

}
