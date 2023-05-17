package com.ctu.marketplace.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name = "new_field")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewField {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @ManyToOne
    @JoinColumn(name = "parent_id")
    @JsonBackReference
    private NewField parent;
    @OneToMany(mappedBy = "parent")
    @JsonManagedReference
    private List<NewField> childs = new LinkedList<>();
}
