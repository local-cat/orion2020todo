package ru.localcat.orion2020todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.localcat.orion2020todo.exceptions.AccessDeniedException;
import ru.localcat.orion2020todo.exceptions.ToDoItemException;
import ru.localcat.orion2020todo.helpers.DateTimeHelper;
import ru.localcat.orion2020todo.models.ToDoItem;
import ru.localcat.orion2020todo.repositories.ToDoItemRepository;

import java.util.List;

@Service
public class ToDoItemService {

    @Autowired
    private ToDoItemRepository toDoItemRepository;
    @Autowired
    private AuthUserContextService authUserContextService;
    @Autowired
    private FolderService folderService;

    public List<ToDoItem> getMyTodoList(List<Long> folderIds)
    {
        if(folderIds == null || folderIds.isEmpty()) {
            return toDoItemRepository.findByOwnerId(authUserContextService.getId());
        }
        else
        {
            //String folders = WrapperHelper.implode(folderIds, ",");
            return toDoItemRepository.findByOwnerIdAndFolderIdIn(authUserContextService.getId(), folderIds);
        }
    }

    public ToDoItem createToDoItem(ToDoItem toDoItem) {
        toDoItem.setOwnerId(authUserContextService.getId());
        toDoItem.setCreateAt(DateTimeHelper.getNowInEpocSeconds());
        if (toDoItem.getFolderId() != null) {
            if (!folderService.isAccess(toDoItem.getFolderId())) {
                throw new AccessDeniedException("You don have permission for this Folder");
            }
        }
        return toDoItemRepository.save(toDoItem);
    }

    public ToDoItem updateToDoItem(Long toDoItemId, ToDoItem toDoItem) {
        ToDoItem toDoItemInDb = toDoItemRepository.findById(toDoItemId)
                .orElseThrow(() -> new ToDoItemException("ToDo not found!"));

        if (!isAccess(toDoItemInDb.getOwnerId())) {
            throw new AccessDeniedException("You don have permission for this todoItem");
        }

        if (toDoItem.getContent() != null) {
            toDoItemInDb.setContent(toDoItem.getContent());
        }
        if (toDoItem.getStatus() != null) {
            toDoItemInDb.setStatus(toDoItem.getStatus());
        }
        if (toDoItem.getFolderId() != null) {
            if (!folderService.isAccess(toDoItem.getFolderId())) {
                throw new AccessDeniedException("You don have permission for this Folder");
            }
            toDoItemInDb.setFolderId(toDoItem.getFolderId());
        }

        toDoItemInDb.setUpdateAt(DateTimeHelper.getNowInEpocSeconds());
        return toDoItemRepository.save(toDoItemInDb);
    }

    public void deleteToDoItem(Long id) {
        ToDoItem toDoItem = toDoItemRepository.findById(id)
                .orElseThrow(() -> new ToDoItemException("ToDoItem not found!"));
        if (!isAccess(toDoItem.getOwnerId())) {
            throw new AccessDeniedException("You don have permission for this todoItem");
        }
        toDoItemRepository.delete(toDoItem);
    }


    public boolean isAccess(Long toDoItemId) {
        ToDoItem toDoItemInDb = toDoItemRepository.findById(toDoItemId)
                .orElseThrow(() -> new ToDoItemException("ToDo not found!"));
        return toDoItemInDb.getOwnerId() == authUserContextService.getId();
    }

}
