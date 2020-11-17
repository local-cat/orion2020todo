package ru.localcat.orion2020todo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Deprecated
public class AuthTokenResponseDTO {
    @Getter
    private String login;
    @Getter
    private String token;
}
