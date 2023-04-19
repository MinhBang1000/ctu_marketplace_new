package com.ctu.marketplace.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ctu.marketplace.entity.UserProfile;

@Repository
public interface UserProfileRepository extends PagingAndSortingRepository<UserProfile, Long> {
      List<UserProfile> findAllByIsDeleted(boolean isDeleted);

      @Query(value = "SELECT u FROM UserProfile AS u WHERE u.domain.id = :domainId AND u.role.id != 101 AND u.isDeleted = false")
      List<UserProfile> findAllByDomainId(@Param("domainId") Long domainId);

      @Query(value = "SELECT u FROM UserProfile AS u WHERE u.role.id = :roleId")
      List<UserProfile> findAllByRoleId(@Param("roleId") Long roleId);

      @Query(value = "SELECT u FROM UserProfile AS u WHERE u.domain.id = :domainId AND u.role.id = 102")
      List<UserProfile> findAllUserAdminByDomainId(@Param("domainId") Long domainId);

      @Query(value = "UPDATE UserProfile SET isEnabled = :isEnabled WHERE id = :userId")
      @Modifying
      void enableAccount(@Param("userId") Long userId, @Param("isEnabled") Boolean isEnabled);

      @Query(value = "UPDATE UserProfile SET isLocked = :isLocked WHERE id = :userId")
      @Modifying
      void lockAccount(@Param("userId") Long userId, @Param("isLocked") Boolean isLocked);

      @Query(value = "SELECT u FROM UserProfile AS u WHERE u.role.id = 103 AND u.isDeleted = false")
      List<UserProfile> findAllResearcher();

      Optional<UserProfile> findByIdAndIsDeletedAndIsEnabledAndIsLocked(Long userId, boolean isDeleted, boolean isEnabled,
                  boolean isLocked);

      Optional<UserProfile> findByUsernameAndIsDeletedAndIsEnabledAndIsLocked(String username, boolean isDeleted,
                  boolean isEnabled, boolean isLocked);

      Optional<UserProfile> findByUsernameAndProviderAndIsDeletedAndIsEnabledAndIsLocked(String username,
                  String provider, Boolean isDeleted, Boolean isEnabled,
                  Boolean isLocked);

      Optional<UserProfile> findByUsernameAndPasswordAndIsDeleted(String username, String password, Boolean isDeleted);

      Optional<UserProfile> findByUsername(String username);

      Optional<UserProfile> findByIdAndIsDeleted(Long userId, Boolean isDeleted);

      @Query("SELECT u FROM UserFunction uf LEFT JOIN UserProfile u ON uf.id.userProfileId = u.id WHERE u.role.id = :roleId")
      List<UserProfile> findAllWithUserFunctionByAndRoleId(Long roleId);

}
