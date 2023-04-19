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
@Table(name = "home_page_video")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HomePageVideo implements Serializable {
    @Id
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String url;

}
