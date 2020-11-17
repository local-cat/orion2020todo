package ru.localcat.orion2020todo.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.localcat.orion2020todo.models.ToDoItem;

public interface ToDoItemRepository extends CrudRepository<ToDoItem, Long> {
}
