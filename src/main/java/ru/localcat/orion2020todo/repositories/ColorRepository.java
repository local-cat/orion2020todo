package ru.localcat.orion2020todo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.localcat.orion2020todo.models.Color;

@Repository
@Transactional
public interface ColorRepository extends CrudRepository<Color, Long> {

}
