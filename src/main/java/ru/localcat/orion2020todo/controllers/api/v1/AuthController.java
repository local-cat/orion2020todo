package ru.localcat.orion2020todo.controllers.api.v1;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.localcat.orion2020todo.constants.ApiConstants;
import ru.localcat.orion2020todo.responses.AuthResponse;

@RestController
@RequestMapping(ApiConstants.VERSION1_PATH + "/auth")
public class AuthController {
    @GetMapping
    public AuthResponse getToken() {
        return new AuthResponse("A5B125CC525E4DE680D0798486AA20F2", 200);
    }
}
