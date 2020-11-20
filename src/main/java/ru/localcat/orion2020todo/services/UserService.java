package ru.localcat.orion2020todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.localcat.orion2020todo.exceptions.UserException;
import ru.localcat.orion2020todo.helpers.PasswordHelper;
import ru.localcat.orion2020todo.models.User;
import ru.localcat.orion2020todo.repositories.UserRepository;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) throws NoSuchAlgorithmException {
        Optional<User> userInDb = userRepository.findByLogin(user.getLogin());

        if (userInDb.isPresent()) {
            throw new UsernameNotFoundException("User is exists");
        }

        user.setPassword(PasswordHelper.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(Long userId, User userDetails) throws NoSuchAlgorithmException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException("User not found!"));

        //MB denied edit login???
        if (userDetails.getLogin() != null) {
            user.setLogin(userDetails.getLogin());
        }
        if (userDetails.getPassword() != null) {
            user.setPassword(PasswordHelper.encode(userDetails.getPassword()));
        }
        if (userDetails.getName() != null) {
            user.setName(userDetails.getName());
        }
        if (userDetails.getRole() != null) {
            user.setRole(userDetails.getRole());
        }
        if (userDetails.getStatus() != null) {
            user.setStatus(userDetails.getStatus());
        }

        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException("User not found!"));
        userRepository.delete(user);
    }

}
