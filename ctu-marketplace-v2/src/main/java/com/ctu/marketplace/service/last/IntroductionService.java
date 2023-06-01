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
        Introduction introduction = this.introductionRepository.save(
                Introduction.builder()
                        .name(introductionRequestDTO.getName())
                        .domain(this.domainRepository.findById(introductionRequestDTO.getDomainId()).get())
                        .build()
        );
        List<IntroductionInfo> introductionInfos = introductionRequestDTO.getIntroductionInfoRequestDTOS().stream()
                .map((item) -> {
                    return this.introductionInfoRepository.save(
                      IntroductionInfo.builder()
                              .introduction(introduction)
                              .introductionKey(item.getIntroductionKey())
                              .introductionValue(item.getIntroductionValue())
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
            existIntro.setDomain(this.domainRepository.findById(introductionRequestDTO.getDomainId()).get());
        }
        existIntro.getIntroductionInfos().removeIf(c -> {
            return true;
        });
        introductionRequestDTO.getIntroductionInfoRequestDTOS().stream().forEach(item -> {
            IntroductionInfo introductionInfo = this.introductionInfoRepository.save(
                    IntroductionInfo.builder()
                            .introduction(existIntro)
                            .introductionKey(item.getIntroductionKey())
                            .introductionValue(item.getIntroductionValue())
                            .build()
            );
            existIntro.addIntroductionInfo(introductionInfo);
        });
        return this.introductionRepository.save(existIntro);
    }

    public void delete(Long id) throws Exception {
        Introduction existIntro = this.introductionRepository.findById(id).get();
        existIntro.getIntroductionInfos().removeIf(c -> true);
        this.introductionRepository.deleteById(id);
    }
}
