package com.orgkgi.service;

import com.orgkgi.entity.Role;
import com.orgkgi.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    // Create Role
    public Role addRole(Role role) {
        return roleRepository.save(role);
    }

    // Get All Roles
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    // Get Role By ID
    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }

    // Update Role
    public Role updateRole(Long id, Role updatedRole) {

        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        role.setRoleName(updatedRole.getRoleName());
        role.setDescription(updatedRole.getDescription());

        return roleRepository.save(role);
    }

    // Delete Role
    public void deleteRole(Long id) {

        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        roleRepository.delete(role);
    }
}