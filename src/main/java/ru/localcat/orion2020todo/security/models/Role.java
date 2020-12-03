package ru.localcat.orion2020todo.security.models;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public enum Role {
    //Не использую Set.of, подразумевая, что проект должен иметь поддрежку Java 8;
    USER("Пользователь", new HashSet<Permission>() {
        {
            add(Permission.SELF_TODO_READ);
            add(Permission.SELF_TODO_CREATE);
            add(Permission.SELF_TODO_EDIT);
            add(Permission.SELF_TODO_DELETE);
        }
    }),
    MODERATOR("Модератор",
            new HashSet<Permission>() {
                {
                    add(Permission.SELF_TODO_READ);
                    add(Permission.SELF_TODO_CREATE);
                    add(Permission.SELF_TODO_EDIT);
                    add(Permission.SELF_TODO_DELETE);

                    add(Permission.USERS_READ);
                    add(Permission.USERS_ALL_READ);
                }
            }
    ),
    ADMIN("Администратор",
            new HashSet<Permission>() {
                {
                    add(Permission.SELF_TODO_READ);
                    add(Permission.SELF_TODO_CREATE);
                    add(Permission.SELF_TODO_EDIT);
                    add(Permission.SELF_TODO_DELETE);

                    add(Permission.USERS_READ);
                    add(Permission.USERS_ALL_READ);
                    add(Permission.USERS_CREATE);
                    add(Permission.USERS_EDIT);
                    add(Permission.USERS_DELETE);

                    add(Permission.TODO_FILES_UPLOAD);
                }
            }
    );

    private final Set<Permission> permissions;
    private final String roleDescription;

    Role(String roleDescription, Set<Permission> permissions) {
        this.roleDescription = roleDescription;
        this.permissions = permissions;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

    public String getRoleDescription() {
        return roleDescription;
    }

    public Set<SimpleGrantedAuthority> getAuthorities() {
        return getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
    }
}
