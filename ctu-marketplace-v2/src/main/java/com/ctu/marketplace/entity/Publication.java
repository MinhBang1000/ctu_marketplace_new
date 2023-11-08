package com.ctu.marketplace.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "year_of_publication")
    private Integer yearOfPublication;

    @Column(name = "journal_name")
    private String journalName;

    @Column(name = "volume_number")
    private String volumeNumber;

    @Column(name = "issue_number")
    private String issueNumber;

    @Column(name = "page_number")
    private String pageNumber;

    @Column(name = "doi")
    private String doi;

    @ManyToOne
    private ResearchInformation researchInformation;
}
