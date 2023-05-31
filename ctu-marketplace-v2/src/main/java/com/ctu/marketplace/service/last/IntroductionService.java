package com.ctu.marketplace.service.last;

import com.ctu.marketplace.dto.last.request.IntroductionRequestDTO;
import com.ctu.marketplace.entity.Introduction;
import com.ctu.marketplace.entity.IntroductionInfo;
import com.ctu.marketplace.repository.DomainRepository;
import com.ctu.marketplace.repository.IntroductionInfoRepository;
import com.ctu.marketplace.repository.IntroductionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IntroductionService {
    private final DomainRepository domainRepository;
    private final IntroductionInfoRepository introductionInfoRepository;
    private final IntroductionRepository introductionRepository;

    public List<Introduction> list() {
        return this.introductionRepository.findAll();
    }

    public Introduction retrieve(Long id) throws Exception {
        return this.introductionRepository.findById(id).get();
    }

    public Introduction create(IntroductionRequestDTO introductionRequestDTO) throws Exception {
        Introduction introduction = Introduction.builder()
                .name(introductionRequestDTO.getName())
                .domain(this.domainRepository.findById(introductionRequestDTO.getDomainId()).get())
                .build();
        List<IntroductionInfo> introductionInfos = introductionRequestDTO.getIntroductionInfoRequestDTOS().stream()
                .map((item) -> {
                    return this.introductionInfoRepository.save(
                      IntroductionInfo.builder()
                              .introduction(introduction)
                              .key(item.getIntroductionKey())
                              .value(item.getIntroductionValue())
                              .build()
                    );
                }).collect(Collectors.toList());
        introduction.setIntroductionInfos(introductionInfos);
        return this.introductionRepository.save(introduction);
    }

    public Introduction update(Long id, IntroductionRequestDTO introductionRequestDTO) throws Exception {
        Introduction existIntro = this.introductionRepository.findById(id).get();
        existIntro.setName(introductionRequestDTO.getName() != null || !introductionRequestDTO.getName().equals("") ? introductionRequestDTO.getName() : existIntro.getName());
        if (introductionRequestDTO.getDomainId() != null || !introductionRequestDTO.getDomainId().equals("")) {
            existIntro.setDomain(this.domainRepository.findById(id).get());
        }
        this.introductionInfoRepository.findAll().removeIf(c -> {
            return c.getIntroduction().getId() == id;
        });
        List<IntroductionInfo> introductionInfos = introductionRequestDTO.getIntroductionInfoRequestDTOS().stream().map(item -> {
            return this.introductionInfoRepository.save(
                    IntroductionInfo.builder()
                            .introduction(existIntro)
                            .key(item.getIntroductionKey())
                            .value(item.getIntroductionValue())
                            .build()
            );
        }).collect(Collectors.toList());
        existIntro.setIntroductionInfos(introductionInfos);
        return this.introductionRepository.save(existIntro);
    }

    public void delete(Long id) throws Exception {
        this.introductionInfoRepository.findAll().removeIf(c -> {
            return c.getIntroduction().getId() == id;
        });
        this.introductionRepository.deleteById(id);
    }
}
