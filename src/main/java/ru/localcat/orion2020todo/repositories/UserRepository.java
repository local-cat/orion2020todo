package ru.localcat.orion2020todo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.localcat.orion2020todo.models.User;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    //@Query(value = "SELECT u FROM User u WHERE u.login = ?1")
    Optional<User> findByLogin(String login);
}
