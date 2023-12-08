package com.ctu.marketplace;

import com.ctu.marketplace.entity.ResearchInformation;
import com.ctu.marketplace.entity.Role;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.repository.IResearchInformationRepository;
import com.ctu.marketplace.repository.RoleRepository;
import com.ctu.marketplace.repository.UserProfileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class RoleRepositoryTest {
    @Autowired
    private RoleRepository repo;
    @Autowired
    private UserProfileRepository userProfileRepository;
    @Autowired
    private IResearchInformationRepository researchInformationRepository;
    @Test
    public void testFindAll() {
        List<Role> listRole = repo.findAll();
        for (Role t : listRole) {
            System.out.println(t.getName());
        }
    }

    @Test
    public void insertAllResearchInformationTool() {
        userProfileRepository.findAll().forEach(userProfile -> {
            ResearchInformation researchInformation = new ResearchInformation();
            researchInformation.setPosition("Chưa có thông tin");
            researchInformation.setInstitution("Chưa có thông tin");
            researchInformation.setDegree("Chưa có thông tin");
            researchInformation.setDepartment("Chưa có thông tin");
            researchInformation.setUserProfile(userProfile);
            researchInformationRepository.save(researchInformation);
        });
    }
}
