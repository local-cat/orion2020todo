package ru.localcat.orion2020todo.responses;

public class AuthResponse {
    private final String token;
    private final Integer code;

    public AuthResponse(String status, Integer code) {
        this.token = status;
        this.code = code;
    }

    public String getToken() {
        return token;
    }

    public Integer getCode() {
        return code;
    }
}
