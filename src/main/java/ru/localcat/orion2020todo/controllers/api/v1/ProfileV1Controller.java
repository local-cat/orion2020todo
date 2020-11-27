package ru.localcat.orion2020todo.controllers.api.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.localcat.orion2020todo.constants.ApiConstants;
import ru.localcat.orion2020todo.models.User;
import ru.localcat.orion2020todo.repositories.UserRepository;
import ru.localcat.orion2020todo.services.AuthUserContextService;
import ru.localcat.orion2020todo.services.UserService;

@RestController
@RequestMapping(ApiConstants.VERSION1_PATH + "/profile")
public class ProfileV1Controller {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthUserContextService authUserContextService;

    @GetMapping
    public User getMyProfile() {
        return userService.getUserById(authUserContextService.getId());
    }

    //TODO сделать редакирование пользователя самого себя
}
