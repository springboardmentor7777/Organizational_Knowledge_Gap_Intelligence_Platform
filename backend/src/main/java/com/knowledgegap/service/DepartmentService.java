package com.knowledgegap.service;

import com.knowledgegap.entity.Department;

import java.util.List;
import java.util.Optional;

public interface DepartmentService {

    Department saveDepartment(Department department);

    List<Department> getAllDepartments();

    Optional<Department> getDepartmentById(Integer id);

    void deleteDepartment(Integer id);
}