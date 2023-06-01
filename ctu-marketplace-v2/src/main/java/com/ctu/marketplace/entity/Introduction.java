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
@Table(name = "introduction")
public class Introduction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "domain_id")
    private Domain domain;
    @OneToMany(mappedBy = "introduction", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IntroductionInfo> introductionInfos = new LinkedList<>();

    public void addIntroductionInfo(IntroductionInfo introductionInfo) {
        this.introductionInfos.add(introductionInfo);
    }

    public void removeIntroductionInfo(IntroductionInfo introductionInfo) {
        this.introductionInfos = this.introductionInfos.stream().filter((introInfo) -> {
            return introInfo.getId() != introductionInfo.getId();
        }).collect(Collectors.toList());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Introduction that = (Introduction) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Introduction{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
