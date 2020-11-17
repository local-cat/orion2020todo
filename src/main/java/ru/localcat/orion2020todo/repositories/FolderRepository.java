package ru.localcat.orion2020todo.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.localcat.orion2020todo.models.Folder;

public interface FolderRepository extends CrudRepository<Folder, Long> {
}
