package ru.localcat.orion2020todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.localcat.orion2020todo.exceptions.UserException;
import ru.localcat.orion2020todo.models.User;
import ru.localcat.orion2020todo.repositories.UserRepository;

@Service
public class AuthUserContextService {

    @Autowired
    private UserRepository userRepository;

    public long getId() {
        //TODO Можно как то проще получать айди пользователя, а не лазить лишний раз в БД????
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userRepository.findByLogin(userName)
                .orElseThrow(() -> new UserException("User not found!"));
        return user.getId();
    }

    public boolean checkPermission(String permission) {
        //TODO  вынести ьбы куданить эту аунтфикацию
        // TODO  !!!!!!!!!!   и доеделать
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().contains(permission);
    }
}