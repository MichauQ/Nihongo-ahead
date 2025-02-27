package com.laboratorium.specjalistyczne.nihongo_ahead.controller;

import com.laboratorium.specjalistyczne.nihongo_ahead.dto.ArticlesSummaryDTO;
import com.laboratorium.specjalistyczne.nihongo_ahead.entity.Articles;
import com.laboratorium.specjalistyczne.nihongo_ahead.service.ArticlesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/art")
public class ArticlesController {

    private final ArticlesService articlesService;

    public ArticlesController(ArticlesService theArticlesService) {
        this.articlesService = theArticlesService;
    }


    @GetMapping(value = "/allarticles")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<ArticlesSummaryDTO>>getAllArticleSummaries() {
        List<ArticlesSummaryDTO> articles = articlesService.getAllArticleSummaries();
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/article/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<Articles> getArticleById(@PathVariable int id) {
        Articles article = articlesService.getArticleById(id);
        return ResponseEntity.ok(article);
    }
}
