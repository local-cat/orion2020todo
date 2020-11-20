package ru.localcat.orion2020todo.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.localcat.orion2020todo.models.ToDoItem;

import java.util.List;

@Repository
@Transactional
public interface ToDoItemRepository extends CrudRepository<ToDoItem, Long> {
    List<ToDoItem> findByOwnerId(Long OwnerId);
    @Query(value = "SELECT todo FROM ToDoItem todo WHERE todo.ownerId = :ownerId and todo.folderId in (:folderIds)")
    List<ToDoItem> findByOwnerIdAndFolderIdIn(@Param("ownerId") Long ownerId, @Param("folderIds") List<Long> folderIds);
}
