package ru.localcat.orion2020todo.security.models;

public enum Permission {
    SELF_TODO_READ("selftodo:read", "Смотреть свои заметки"),
    SELF_TODO_CREATE("selftodo:create", "Создавать заметку"),
    SELF_TODO_EDIT("selftodo:edit", "Редактировать свои заметки"),
    SELF_TODO_DELETE("selftodo:delete", "Удалять свои заметки"),

    USERS_READ("users:read", "Смотреть пользователя"),
    USERS_ALL_READ("users:all:read", "Смотреть всех пользователей"),
    USERS_CREATE("users:create", "Создавать пользователя"),
    USERS_EDIT("users:edit", "Редактировать пользователя"),
    USERS_DELETE("users:delete", "Удалять пользователя"),

    TODO_FILES_UPLOAD("todofiles:upload", "Смотреть пользователя");

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
