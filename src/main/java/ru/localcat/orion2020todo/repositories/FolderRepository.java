package ru.localcat.orion2020todo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.localcat.orion2020todo.models.Folder;

import java.util.List;

@Repository
@Transactional
public interface FolderRepository extends CrudRepository<Folder, Long> {
    List<Folder> findByParentIdAndOwnerId(Long parentFolderId, Long ownerId);
}
