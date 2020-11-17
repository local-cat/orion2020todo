package ru.localcat.orion2020todo.security.models;

public enum Permission {
    USERS_READ("users:read"),
    USERS_CREATE("users:create"),
    USERS_EDIT("users:edit"),
    USERs_DELETE("users:delete");

    private String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
