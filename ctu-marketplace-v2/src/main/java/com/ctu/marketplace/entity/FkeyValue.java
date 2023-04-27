package com.ctu.marketplace.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@Table(name = "fkey_value")
public class FkeyValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "fkey")
    private String key;
    @Column(name = "fvalue")
    private String value;
    @ManyToOne
    @JoinColumn(name = "new_project_id")
    @JsonIgnore
    private NewProject project;

    @Override
    public String toString() {
        return "FkeyValue{" +
                "key='" + key + '\'' +
                ", value='" + value + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FkeyValue fkeyValue = (FkeyValue) o;
        return id.equals(fkeyValue.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
