package com.snack.backend.service.impl;

import com.snack.backend.domain.Score;
import com.snack.backend.mapper.ScoreMapper;
import com.snack.backend.service.ScoreService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 分数业务逻辑实现。
 */
@Service
public class ScoreServiceImpl implements ScoreService {

    private final ScoreMapper scoreMapper;

    /** 构造器注入 Mapper（推荐方式，字段 final 保证不可变） */
    public ScoreServiceImpl(ScoreMapper scoreMapper) {
        this.scoreMapper = scoreMapper;
    }

    @Override
    public Score save(String playerName, int score) {
        Score entity = new Score();
        entity.setPlayerName(playerName);
        entity.setScore(score);
        scoreMapper.insert(entity);
        return entity;
    }

    @Override
    public List<Score> getTop(int limit) {
        return scoreMapper.findTop(limit);
    }
}