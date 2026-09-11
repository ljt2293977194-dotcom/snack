package com.snack.backend.domain;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 分数记录实体，对应数据库表 score。
 */
@Data
public class Score {

    /** 主键，自增 */
    private Long id;

    /** 玩家昵称 */
    private String playerName;

    /** 分数 */
    private Integer score;

    /** 创建时间 */
    private LocalDateTime createdAt;
}