package com.ctu.marketplace.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "new_footer")
public class NewFooter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "domain_id")
    private Domain domain;
    @OneToMany(mappedBy = "footer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NewFooterInfo> newFooterInfos = new LinkedList<>();

    public void addNewFooterInfo(NewFooterInfo newFooterInfo) {
        this.newFooterInfos.add(newFooterInfo);
    }

    public void removeNewFooterInfo(NewFooterInfo newFooterInfo) {
        this.newFooterInfos = this.newFooterInfos.stream().filter(item -> {
            return item.getId() != newFooterInfo.getId();
        }).collect(Collectors.toList());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NewFooter newFooter = (NewFooter) o;
        return Objects.equals(id, newFooter.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
