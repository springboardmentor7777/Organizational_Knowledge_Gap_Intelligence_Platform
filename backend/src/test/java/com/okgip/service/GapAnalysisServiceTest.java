package com.okgip.service;

import com.okgip.dto.GapResponse;
import com.okgip.model.*;
import com.okgip.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class GapAnalysisServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRequirementRepository roleRequirementRepository;

    @Mock
    private EmployeeSkillRepository employeeSkillRepository;

    @InjectMocks
    private GapAnalysisService gapAnalysisService;

    private User testUser;
    private Skill javaSkill;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .username("test_emp")
                .role(Role.EMPLOYEE)
                .department("Engineering")
                .fullName("Test Employee")
                .build();

        javaSkill = new Skill(10L, "Java", "Backend", "Core Java Programming");
    }

    @Test
    @DisplayName("Should detect high severity gap when gap score is 3 or more")
    void testCalculateUserGaps_HighSeverity() {
        RoleRequirement req = new RoleRequirement(1L, "EMPLOYEE", "Engineering", javaSkill, 4);
        EmployeeSkill empSkill = new EmployeeSkill(1L, testUser, javaSkill, 1, Source.SELF, null);

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(roleRequirementRepository.findByRoleAndDepartment("EMPLOYEE", "Engineering"))
                .thenReturn(List.of(req));
        when(employeeSkillRepository.findByUserId(1L))
                .thenReturn(List.of(empSkill));

        List<GapResponse> gaps = gapAnalysisService.calculateUserGaps(1L);

        assertNotNull(gaps);
        assertEquals(1, gaps.size());
        GapResponse gap = gaps.get(0);
        assertEquals("Java", gap.getSkill().getName());
        assertEquals(4, gap.getRequiredLevel());
        assertEquals(1, gap.getCurrentLevel());
        assertEquals(3, gap.getGapScore());
        assertEquals("HIGH", gap.getSeverity());
    }

    @Test
    @DisplayName("Should return no gaps when current level satisfies required level")
    void testCalculateUserGaps_NoGaps() {
        RoleRequirement req = new RoleRequirement(1L, "EMPLOYEE", "Engineering", javaSkill, 3);
        EmployeeSkill empSkill = new EmployeeSkill(1L, testUser, javaSkill, 3, Source.SELF, null);

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(roleRequirementRepository.findByRoleAndDepartment("EMPLOYEE", "Engineering"))
                .thenReturn(List.of(req));
        when(employeeSkillRepository.findByUserId(1L))
                .thenReturn(List.of(empSkill));

        List<GapResponse> gaps = gapAnalysisService.calculateUserGaps(1L);

        assertNotNull(gaps);
        assertTrue(gaps.isEmpty());
    }
}
