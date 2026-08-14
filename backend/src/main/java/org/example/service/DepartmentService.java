package org.example.service;

import java.util.List;
import java.util.Optional;

import org.example.model.Department;
import org.example.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public Department createDepartment(Department department) {
        if (department == null) {
            throw new RuntimeException("Department data is required");
        }

        String name = department.getName() == null ? "" : department.getName().trim();
        if (name.isBlank()) {
            throw new RuntimeException("Department name is required");
        }

        if (departmentRepository.existsByName(name)) {
            throw new RuntimeException("Department already exists");
        }

        department.setName(name);
        return departmentRepository.save(department);
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Optional<Department> getDepartmentById(Long id) {
        return departmentRepository.findById(id);
    }

    public Department updateDepartment(Long id, Department updatedDepartment) {
        Department existing = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        String name = updatedDepartment.getName() == null ? "" : updatedDepartment.getName().trim();
        if (name.isBlank()) {
            throw new RuntimeException("Department name is required");
        }

        if (!existing.getName().equalsIgnoreCase(name)
                && departmentRepository.existsByName(name)) {
            throw new RuntimeException("Department already exists");
        }

        existing.setName(name);
        existing.setDescription(updatedDepartment.getDescription());
        return departmentRepository.save(existing);
    }

    public void deleteDepartment(Long id) {
        if (!departmentRepository.existsById(id)) {
            throw new RuntimeException("Department not found");
        }
        departmentRepository.deleteById(id);
    }
}
