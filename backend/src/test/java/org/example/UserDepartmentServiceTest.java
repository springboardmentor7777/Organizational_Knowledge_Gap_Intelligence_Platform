package org.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.example.dto.CreateUserRequest;
import org.example.model.Department;
import org.example.model.User;
import org.example.repository.DepartmentRepository;
import org.example.repository.UserRepository;
import org.example.service.DepartmentService;
import org.example.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserDepartmentServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private DepartmentRepository departmentRepository;

    @InjectMocks
    private UserService userService;

    @InjectMocks
    private DepartmentService departmentService;

    @Test
    void shouldCreateUserFromAdminRequest() {
        CreateUserRequest request = new CreateUserRequest();
        request.setName("Aisha Khan");
        request.setEmail("aisha@company.com");
        request.setPassword("Password123");
        request.setRole("Manager");
        request.setDepartment("Engineering");
        request.setTitle("Engineering Manager");
        request.setEmployeeId("EMP1001");
        request.setStatus("Active");

        when(userRepository.findByEmail("aisha@company.com")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User user = userService.createUserFromAdmin(request);

        assertNotNull(user);
        assertEquals("Aisha Khan", user.getName());
        assertEquals("Manager", user.getRole());
        assertEquals("Engineering", user.getDepartment());
    }

    @Test
    void shouldCreateDepartment() {
        Department department = new Department();
        department.setName("Finance");
        department.setDescription("Finance and accounting");

        when(departmentRepository.save(any(Department.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Department savedDepartment = departmentService.createDepartment(department);

        assertNotNull(savedDepartment);
        assertEquals("Finance", savedDepartment.getName());
    }
}
