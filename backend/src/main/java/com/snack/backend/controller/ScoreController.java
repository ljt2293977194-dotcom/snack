package com.snack.backend.controller;

import com.snack.backend.common.R;
import com.snack.backend.domain.Score;
import com.snack.backend.dto.ScoreRequest;
import com.snack.backend.service.ScoreService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 分数相关接口。
 */
@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    private final ScoreService scoreService;

    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    /**
     * 上传分数。
     * POST /api/scores
     */
    @PostMapping
    public R<Score> save(@Valid @RequestBody ScoreRequest request) {
        Score saved = scoreService.save(request.getPlayerName(), request.getScore());
        return R.ok(saved);
    }

    /**
     * 查询排行榜。
     * GET /api/scores/top?limit=10
     */
    @GetMapping("/top")
    public R<List<Score>> top(@RequestParam(defaultValue = "10") int limit) {
        // 限制范围，防止前端乱传
        if (limit < 1) limit = 1;
        if (limit > 100) limit = 100;
        return R.ok(scoreService.getTop(limit));
    }
}