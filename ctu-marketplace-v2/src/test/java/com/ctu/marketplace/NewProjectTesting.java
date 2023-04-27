package com.ctu.marketplace;

import com.ctu.marketplace.entity.Field;
import com.ctu.marketplace.entity.FkeyValue;
import com.ctu.marketplace.entity.NewProject;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.repository.FieldRepository;
import com.ctu.marketplace.repository.FkeyValueRepository;
import com.ctu.marketplace.repository.NewProjectRepository;
import com.ctu.marketplace.repository.UserProfileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class NewProjectTesting {
    @Autowired
    private NewProjectRepository newProjectRepository;
    @Autowired
    private FieldRepository fieldRepository;
    @Autowired
    private UserProfileRepository userProfileRepository;
    @Autowired
    private FkeyValueRepository fkeyValueRepository;
    @Test
    public void testNewProject() {
        NewProject newProject = new NewProject();
        UserProfile userProfile = this.userProfileRepository.findById(1L).get();
        UserProfile approverProfile = this.userProfileRepository.findById(1L).get();
        Field field = this.fieldRepository.findById(403L).get();
        newProject.setName("DỰ ÁN 1");
        newProject.setApprover(approverProfile);
        newProject.setField(field);
        newProject.setUser(userProfile);
        newProject.setAuthor("Lê Minh Bằng");
        NewProject newProject1 = this.newProjectRepository.save(newProject);
        System.out.println(newProject1.getId());
    }

    @Test
    public void testKeyValue() {
        FkeyValue fkeyValue = new FkeyValue();
        NewProject newProject = this.newProjectRepository.findById(4L).get();
        fkeyValue.setValue("Hello this is first project");
        fkeyValue.setKey("Description");
        fkeyValue.setProject(newProject);
        fkeyValue = this.fkeyValueRepository.save(fkeyValue);
        System.out.println(fkeyValue);
    }

}
