package ru.localcat.orion2020todo.controllers.api.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.localcat.orion2020todo.constants.ApiConstants;
import ru.localcat.orion2020todo.helpers.PassworrHelper;
import ru.localcat.orion2020todo.models.User;
import ru.localcat.orion2020todo.repositories.UserRepository;

import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping(ApiConstants.VERSION1_PATH + "/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //Получить список всех пользователй, пока без пагинации
    @GetMapping
    public List getUsersList() {
        return (List) userRepository.findAll();
    }

    // Получить пользователя по id
    @GetMapping("/{id}")
    public User getUserById(@PathVariable(value = "id") Long userId) {
        //TODO Create UserNMotDound Exception
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Создать пользователя
    @PostMapping
    public User createUser(@Valid @RequestBody User user) throws NoSuchAlgorithmException {
        //todo check login in base
        //User userInDb = userRepository.findByLogin
        user.setPassword(PassworrHelper.md5(user.getPassword()));
        return userRepository.save(user);
    }

    // Обновить данные пользователя
    @PutMapping("/{id}")
    public User updateUser(@PathVariable(value = "id") Long userId,
                           @Valid @RequestBody User userDetails) throws NoSuchAlgorithmException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(PassworrHelper.md5(userDetails.getPassword()));
        user.setLogin(userDetails.getLogin());

        return userRepository.save(user);
    }

    //Удалить пользователя по айди
    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable(value = "id") Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.delete(user);
        return ResponseEntity.ok().build();
    }
}
