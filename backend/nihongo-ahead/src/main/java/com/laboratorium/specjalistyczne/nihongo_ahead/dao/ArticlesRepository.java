package com.laboratorium.specjalistyczne.nihongo_ahead.dao;

import com.laboratorium.specjalistyczne.nihongo_ahead.entity.Articles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticlesRepository extends JpaRepository<Articles, Integer> {
}
