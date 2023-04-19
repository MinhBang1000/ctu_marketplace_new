package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.FaqDto;
import com.ctu.marketplace.entity.Faq;

public interface FaqService {
    List<Faq> getAll();

    Faq getById(Long faqId);

    Faq create(FaqDto faqDto);

    Faq update(Long faqId, FaqDto faqDto);

    boolean deleteById(Long faqId);
}
