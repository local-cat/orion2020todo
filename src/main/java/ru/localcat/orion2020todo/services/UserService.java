package ru.localcat.orion2020todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.localcat.orion2020todo.exceptions.UserException;
import ru.localcat.orion2020todo.helpers.PasswordHelper;
import ru.localcat.orion2020todo.models.User;
import ru.localcat.orion2020todo.repositories.UserRepository;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;

public class UserService {
    @Autowired
    UserRepository userRepository;

    public User createUser(User user) throws NoSuchAlgorithmException {
        User userInDb = userRepository.findByLogin(user.getLogin());

        if (userInDb != null) {
            throw new UsernameNotFoundException("User is exists");
        }

        user.setPassword(PasswordHelper.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(Long userId, User userDetails) throws NoSuchAlgorithmException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException("User not found!"));
        user.setPassword(PasswordHelper.encode(userDetails.getPassword()));
        user.setLogin(userDetails.getLogin());
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException("User not found!"));
        userRepository.delete(user);
    }

}
