package ru.localcat.orion2020todo.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.localcat.orion2020todo.models.AccessToken;

public interface AccessTokenRepository extends CrudRepository<AccessToken, Long> {
}
