package com.laboratorium.specjalistyczne.nihongo_ahead.service;

import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ArticlesSummaryDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.entity.Articles;

import java.util.List;

public interface ArticlesService {
    List<ArticlesSummaryDTO> getAllArticleSummaries();
    Articles getArticleById(int id);
}
