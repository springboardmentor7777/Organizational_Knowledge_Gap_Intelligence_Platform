package org.example.service;

import org.example.model.Employee;
import org.example.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Create Employee
    public Employee saveEmployee(Employee employee) {

        if (employeeRepository.existsByEmployeeId(employee.getEmployeeId())) {
            throw new RuntimeException("Employee ID already exists");
        }

        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new RuntimeException("Employee email already exists");
        }

        return employeeRepository.save(employee);
    }

    // Get All Employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get Employee By ID
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    // Update Employee
    public Employee updateEmployee(Long id, Employee employee) {

        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        existingEmployee.setEmployeeId(employee.getEmployeeId());
        existingEmployee.setName(employee.getName());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setDepartment(employee.getDepartment());
        existingEmployee.setRole(employee.getRole());
        existingEmployee.setExperience(employee.getExperience());

        return employeeRepository.save(existingEmployee);
    }

    // Delete Employee
    public void deleteEmployee(Long id) {

        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found");
        }

        employeeRepository.deleteById(id);
    }
}