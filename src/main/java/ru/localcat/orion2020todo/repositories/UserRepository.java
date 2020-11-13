package ru.localcat.orion2020todo.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.localcat.orion2020todo.models.User;

public interface UserRepository extends CrudRepository<User, Long>{
}
