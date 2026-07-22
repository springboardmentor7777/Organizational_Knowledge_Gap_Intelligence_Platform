package org.example.controller;

import jakarta.validation.Valid;
import org.example.model.Employee;
import org.example.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Create Employee
    @PostMapping
    public ResponseEntity<?> createEmployee(@Valid @RequestBody Employee employee,
                                            BindingResult result) {

        if (result.hasErrors()) {

            Map<String, String> errors = new HashMap<>();

            result.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));

            return ResponseEntity.badRequest().body(errors);
        }

        Employee savedEmployee = employeeService.saveEmployee(employee);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
    }

    // Get All Employees
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {

        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    // Get Employee By ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {

        return employeeService.getEmployeeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update Employee
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,
                                                   @Valid @RequestBody Employee employee,
                                                   BindingResult result) {

        if (result.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }

        Employee updatedEmployee = employeeService.updateEmployee(id, employee);

        return ResponseEntity.ok(updatedEmployee);
    }

    // Delete Employee
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {

        employeeService.deleteEmployee(id);

        return ResponseEntity.ok("Employee deleted successfully.");
    }
}