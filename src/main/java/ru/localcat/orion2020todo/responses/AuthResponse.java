package ru.localcat.orion2020todo.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    @Getter
    private String token;
    @Getter
    private Integer code;
}
