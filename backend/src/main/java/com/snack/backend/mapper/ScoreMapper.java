package com.snack.backend.mapper;

import com.snack.backend.domain.Score;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 分数数据访问接口。
 * 具体 SQL 在 resources/mapper/ScoreMapper.xml 中定义。
 */
@Mapper
public interface ScoreMapper {

    /**
     * 插入一条分数记录。
     * @return 影响行数
     */
    int insert(Score score);

    /**
     * 查询分数排行榜（按分数降序）。
     * @param limit 返回条数
     * @return 分数记录列表
     */
    List<Score> findTop(@Param("limit") int limit);
}