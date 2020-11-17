package ru.localcat.orion2020todo.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.localcat.orion2020todo.security.models.Role;
import ru.localcat.orion2020todo.security.models.Status;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    private long id;
    @Getter
    @Setter
    private String login;
    @Getter
    @Setter
    //TODO Как скрывать из парсе рестового контролеа, кторый респонсит?
    //@JsonIgnore
    private String password;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private String email;
    //Для поля роли неплохо бы хранить список ролей, в случае если стурткра будет более сложной.. или роль должна быть только одна?
    @Getter
    @Setter
    @Enumerated(value = EnumType.STRING)
    private Role role;
    @Getter
    @Setter
    @Enumerated(value = EnumType.STRING)
    private Status status;
}
