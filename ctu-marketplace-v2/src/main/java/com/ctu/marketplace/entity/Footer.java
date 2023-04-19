package com.ctu.marketplace.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "footer")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Footer implements Serializable {
    @Id
    private Long id;

    @Column(name = "content")
    private String content;
    
    @Column(name = "name")
    private String name;
}
