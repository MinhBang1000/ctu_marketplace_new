package com.ctu.marketplace.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "faq")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Faq implements Serializable{
    
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Long id;
     
    @Column(name = "question")
    private String question;

    @Column(name = "answer")
    private String answer;
    
}
