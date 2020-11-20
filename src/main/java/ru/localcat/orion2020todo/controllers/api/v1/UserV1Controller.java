package ru.localcat.orion2020todo.controllers.api.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.localcat.orion2020todo.constants.ApiConstants;
import ru.localcat.orion2020todo.models.User;
import ru.localcat.orion2020todo.repositories.UserRepository;
import ru.localcat.orion2020todo.services.UserService;

import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping(ApiConstants.VERSION1_PATH + "/users")
public class UserV1Controller {

    @Autowired
    private UserRepository userRepository;
    //TODO не надо так???
    //ЛУчше создать интерфейс типа UserServiceIterface  и автоваредить его тут, а его реализоввать уже
    // в UserService?
    @Autowired
    private UserService userService;

    //Получить список всех пользователй, пока без пагинации
    @GetMapping
    @PreAuthorize("hasAuthority('users:read')")
    public List<User> getUsersList() {
        return (List<User>) userRepository.findAll();
    }

    // Получить пользователя по id
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('users:read')")
    public User getUserById(@PathVariable(value = "id") Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "User not found!"));
    }

    // Создать пользователя
    @PostMapping
    @PreAuthorize("hasAuthority('users:create')")
    public User createUser(@Valid @RequestBody User user) throws NoSuchAlgorithmException {
        try {
            return userService.createUser(user);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, exception.getMessage());
        }
    }

    // Обновить данные пользователя
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('users:edit')")
    public User updateUser(@PathVariable(value = "id") Long userId,
                           @Valid @RequestBody User userDetails) throws NoSuchAlgorithmException {
        try {
            return userService.updateUser(userId, userDetails);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, exception.getMessage());
        }
    }

    //Удалить пользователя по айди
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('users:delete')")
    public ResponseEntity deleteUser(@PathVariable(value = "id") Long userId) {
        try {
            userService.deleteUser(userId);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, exception.getMessage());
        }
        return ResponseEntity.ok().build();
    }
}
