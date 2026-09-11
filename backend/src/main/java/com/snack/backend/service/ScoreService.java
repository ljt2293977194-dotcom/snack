package com.snack.backend.service;

import com.snack.backend.domain.Score;

import java.util.List;

/**
 * 分数业务逻辑接口。
 */
public interface ScoreService {

    /**
     * 保存一条分数记录。
     * @return 保存后的记录（含生成的 id 和 created_at）
     */
    Score save(String playerName, int score);

    /**
     * 查询排行榜。
     */
    List<Score> getTop(int limit);
}