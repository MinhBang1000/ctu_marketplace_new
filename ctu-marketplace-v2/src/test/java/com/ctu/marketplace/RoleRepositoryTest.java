package com.ctu.marketplace;

import com.ctu.marketplace.entity.Role;
import com.ctu.marketplace.repository.RoleRepository;
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
    @Test
    public void testFindAll() {
        List<Role> listRole = repo.findAll();
        for (Role t : listRole) {
            System.out.println(t.getName());
        }
    }
}
