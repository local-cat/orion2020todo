package ru.localcat.orion2020todo.dto;

import lombok.Data;

@Data
public class AuthenticationRequestDTO {
    private String login;
    private String password;
}
