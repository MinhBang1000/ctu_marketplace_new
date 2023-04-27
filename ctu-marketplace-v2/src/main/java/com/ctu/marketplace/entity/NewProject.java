package com.ctu.marketplace.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.catalina.User;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

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
    @ManyToOne
    @JoinColumn(name = "field_id")
    private Field field;
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
    @Column(name = "is_template")
    private boolean isTemplate;
    @Column(name = "is_active")
    private boolean isActive;
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private Set<FkeyValue> keyValues = new HashSet<>();
    public void addKeyValue(FkeyValue newInstance) {
        this.keyValues.add(newInstance);
    }

    @Override
    public String toString() {
        return "NewProject{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", field=" + field +
                ", user=" + user +
                ", approver=" + approver +
                ", createdAt=" + createdAt +
                ", author='" + author + '\'' +
                ", isTemplate=" + isTemplate +
                ", isActive=" + isActive +
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
