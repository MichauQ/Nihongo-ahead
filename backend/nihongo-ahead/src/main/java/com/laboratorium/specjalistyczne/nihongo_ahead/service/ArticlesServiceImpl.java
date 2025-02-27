package com.laboratorium.specjalistyczne.nihongo_ahead.service;

import com.laboratorium.specjalistyczne.nihongo_ahead.dao.ArticlesRepository;
import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ArticlesSummaryDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.entity.Articles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticlesServiceImpl implements ArticlesService{

    private final ArticlesRepository articlesRepository;

    @Autowired
    public ArticlesServiceImpl(ArticlesRepository articlesRepository) {
        this.articlesRepository = articlesRepository;
    }

    public List<ArticlesSummaryDTO> getAllArticleSummaries() {
        return articlesRepository.findAll()
                .stream()
                .map(article -> new ArticlesSummaryDTO(
                        article.getId(),
                        article.getTitle(),
                        article.getTitleImagePath()
                ))
                .collect(Collectors.toList());
    }

        public Articles getArticleById(int id) {
            // Pobierz szczegóły artykułu na podstawie ID
            return articlesRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Artykuł o ID " + id + " nie został znaleziony"));
        }
    }
