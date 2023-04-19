package com.ctu.marketplace.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.dto.request.FaqDto;
import com.ctu.marketplace.entity.Faq;
import com.ctu.marketplace.repository.FaqRepository;
import com.ctu.marketplace.service.FaqService;

@Service
public class FaqServiceImpl implements FaqService {
    @Autowired
    private FaqRepository faqRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<Faq> getAll() {
        return faqRepository.findAll();
    }

    @Override
    public Faq getById(Long faqId) {
        return faqRepository.findById(faqId).orElse(null);
    }

    @Override
    public Faq create(FaqDto faqDto) {
        try {
            Faq faq = new Faq();
            mapper.map(faqDto, faq);
            return faqRepository.save(faq);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Faq update(Long id, FaqDto faqDto) {
        try {
            Faq faq = faqRepository.findById(id).orElse(null);
            if (faq == null)
                return null;
            faq.setQuestion(faqDto.getQuestion());
            faq.setAnswer(faqDto.getAnswer());
            return faqRepository.save(faq);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deleteById(Long id) {
        try {
            faqRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
