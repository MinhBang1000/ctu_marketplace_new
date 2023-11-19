package com.ctu.marketplace.tools.mapper;

public interface IMapper<S, D> {
    D mapping(S source);
}
