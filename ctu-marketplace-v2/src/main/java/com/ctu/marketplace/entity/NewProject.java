package com.ctu.marketplace.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.catalina.User;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@NoArgsConstructor
@Data
@Table(name = "new_project")
public class NewProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "new_project_field",
            joinColumns = @JoinColumn(name  = "new_project_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "field_id", referencedColumnName = "id")
    )
    private Set<NewField> fields = new HashSet<>();
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserProfile user;
    @ManyToOne
    @JoinColumn(name = "approver_id")
    private UserProfile approver;
    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;
    @Column(name = "created_at")
    @CreationTimestamp
    private Date createdAt;
    @Column(name = "author")
    private String author;
    @Column(name = "image")
    private String image;
    @Column(name = "introduction")
    private String introduction;
    @Column(name = "is_template")
    private boolean isTemplate;
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FkeyValue> keyValues = new LinkedList<>();
    public void addKeyValue(FkeyValue newInstance) {
        this.keyValues.add(newInstance);
    }

    public void addField(NewField field) {
        this.fields.add(field);
    }

    public void removeField(NewField field) {
        this.setFields(this.fields.stream().filter((item) -> {
            return item.getId() != field.getId();
        }).collect(Collectors.toSet()));
    }

    @Override
    public String toString() {
        return "NewProject{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", user=" + user +
                ", approver=" + approver +
                ", status=" + status +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NewProject that = (NewProject) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
