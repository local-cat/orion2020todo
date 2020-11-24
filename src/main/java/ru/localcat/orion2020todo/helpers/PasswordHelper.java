package ru.localcat.orion2020todo.helpers;

import lombok.Getter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordHelper {

    @Getter
    private static PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    public static String encode(String password) {
        return passwordEncoder.encode(password);
    }

}
