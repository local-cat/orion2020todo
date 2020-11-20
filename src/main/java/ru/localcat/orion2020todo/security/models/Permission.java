package ru.localcat.orion2020todo.security.models;

import javax.print.DocFlavor;

public enum Permission {
    USERS_READ("users:read", "Смотреть пользователя"),
    USERS_ALL_READ("users:all:read", "Смотреть всех пользователей"),
    USERS_CREATE("users:create", "Создавать пользователя"),
    USERS_EDIT("users:edit", "Редактировать пользователя"),
    USERS_DELETE("users:delete", "Удалять пользователя");

    private String permission;
    private String permissionDescription;

    Permission(String permission, String pDescrition) {
        this.permission = permission;
        this.permissionDescription = pDescrition;
    }

    public String getPermission() {
        return permission;
    }

    public String getPermissionDescription() {
        return permissionDescription;
    }
}
