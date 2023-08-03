package com.ctu.marketplace.service.last;

import com.ctu.marketplace.dto.last.request.NewFooterRequestDTO;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.NewFooter;
import com.ctu.marketplace.entity.NewFooterInfo;
import com.ctu.marketplace.repository.DomainRepository;
import com.ctu.marketplace.repository.NewFooterInfoRepository;
import com.ctu.marketplace.repository.NewFooterRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.var;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewFooterService {
    private final NewFooterRepository newFooterRepository;
    private final NewFooterInfoRepository newFooterInfoRepository;
    private final DomainRepository domainRepository;

    public NewFooter create(@NonNull NewFooterRequestDTO newFooterRequestDTO) throws Exception{
        var newFooter = NewFooter.builder()
                .name(newFooterRequestDTO.getName())
                .domain(this.domainRepository.findById(newFooterRequestDTO.getDomainId()).get())
                .build();
        NewFooter finalNewFooter = this.newFooterRepository.save(newFooter);
        newFooterRequestDTO.getNewFooterInfos().stream().forEach(item -> {
            NewFooterInfo newFooterInfo = this.newFooterInfoRepository.save(NewFooterInfo.builder()
                    .footerKey(item.getFooterKey())
                    .footerValue(item.getFooterValue())
                    .footer(finalNewFooter)
                    .build());
        });
        return this.newFooterRepository.save(finalNewFooter);
    }

    public List<NewFooter> list() {
        return this.newFooterRepository.findAll();
    }

    public NewFooter retrieve(@NonNull Long id) throws Exception{
        return this.newFooterRepository.findById(id).get();
    }

    public NewFooter update(@NonNull Long id,@NonNull NewFooterRequestDTO newFooterRequestDTO) throws Exception{
        NewFooter newFooter = this.newFooterRepository.findById(id).get();
        final Long existId = newFooter.getId();
        newFooter.setName(newFooterRequestDTO.getName() != "" || newFooterRequestDTO.getName()!=null ? newFooterRequestDTO.getName() : newFooter.getName());
        if (newFooterRequestDTO.getDomainId() != null || !newFooterRequestDTO.getDomainId().equals("")) {
            newFooter.setDomain(this.domainRepository.findById(newFooterRequestDTO.getDomainId()).get());
        }
        newFooter.getNewFooterInfos().removeIf(c -> {
            return true;
        });
        NewFooter finalNewFooter = newFooter;
        newFooterRequestDTO.getNewFooterInfos().stream().forEach(item -> {
            NewFooterInfo newFooterInfo = NewFooterInfo.builder()
                            .footerKey(item.getFooterKey())
                            .footerValue(item.getFooterValue())
                            .footer(this.newFooterRepository.findById(existId).get())
                            .build();
            this.newFooterInfoRepository.save(newFooterInfo);
        });
        return this.newFooterRepository.save(finalNewFooter);
    }

    public void delete(@NonNull Long id) throws Exception {
        NewFooter newFooter = this.newFooterRepository.findById(id).get();
        final Long existId = newFooter.getId();
        newFooter.getNewFooterInfos().removeIf(c -> c.getFooter().getId() == existId);
        this.newFooterRepository.deleteById(id);
    }
}
