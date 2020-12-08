package ru.localcat.orion2020todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.localcat.orion2020todo.exceptions.AccessDeniedException;
import ru.localcat.orion2020todo.exceptions.FolderException;
import ru.localcat.orion2020todo.exceptions.ToDoItemException;
import ru.localcat.orion2020todo.helpers.DateTimeHelper;
import ru.localcat.orion2020todo.models.Folder;
import ru.localcat.orion2020todo.repositories.FolderRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class FolderService {

    public static final Long SUPER_PARENT_FOLDER_ID = 0L;

    @Autowired
    private FolderRepository folderRepository;
    @Autowired
    private AuthUserContextService authUserContextService;
    @Autowired
    private ToDoItemService toDoItemService;

    public List<Folder> getFoldersList(Long parentFolderId) {
         return folderRepository.findByParentIdAndOwnerId(parentFolderId, authUserContextService.getId());
    }

    public Folder createFolder(Folder folder) {
        folder.setOwnerId(authUserContextService.getId());
        folder.setCreateAt(DateTimeHelper.getNowInEpocSeconds());
        if(folder.getColorId() == null) {
            folder.setColorId(0L);
        }
        if (folder.getParentId() != null) {
            if (!isAccess(folder.getParentId())) {
                throw new AccessDeniedException("You don have permission for this Folder");
            }
        }
        else
        {
            folder.setParentId(SUPER_PARENT_FOLDER_ID);
        }
        return folderRepository.save(folder);
    }

    public Folder updateFolder(Long folderId, Folder folder) {
        Folder folderInDb = folderRepository.findById(folderId)
                .orElseThrow(() -> new FolderException("Folder not found!"));

        if (!isAccess(folderInDb.getParentId())) {
            throw new AccessDeniedException("You don have permission for this Folder");
        }

        if (!isAccess(folderId)) {
            throw new AccessDeniedException("You don have permission for this Folder");
        }

        if (folder.getName() != null) {
            folderInDb.setName(folder.getName());
        }

        if(folder.getColorId() != null) {
            folderInDb.setColorId(folder.getColorId());
        }

        folderInDb.setUpdateAt(DateTimeHelper.getNowInEpocSeconds());
        return folderRepository.save(folderInDb);
    }

    public void deleteFolder(Long id) {
        Folder folder = folderRepository.findById(id)
                .orElseThrow(() -> new ToDoItemException("Folder not found!"));
        if (!isAccess(id)) {
            throw new AccessDeniedException("You don have permission for this Folder");
        }
        //Пошел по самому простмоу пути, чтобы не обходить рекурсивно папки и не менять паренты папкам и замтеткам
        //Проверяим нет ли дочерних папок
        if(getFoldersList(id) != null && getFoldersList(id).size() > 0) {
            throw new FolderException("Не возможно удалить, пока существуют дочерние папки, удалите сначала их.");
        }
        //Проверим, есть ли заметки в папке
        List<Long> folderIds = new ArrayList<>();
        folderIds.add(id);
        if(toDoItemService.getMyTodoList(folderIds) != null && toDoItemService.getMyTodoList(folderIds).size() > 0) {
            throw new ToDoItemException("Не возможно удалить, пока существуют заметки в папке, удалите сначала их.");
        }
        folderRepository.delete(folder);
    }

    public boolean isAccess(Long folderId) {
        if(folderId != FolderService.SUPER_PARENT_FOLDER_ID) {
            Folder folderInDb = folderRepository.findById(folderId)
                    .orElseThrow(() -> new FolderException("Folder not found!"));

            return folderInDb.getOwnerId() == authUserContextService.getId();
        }

        return true;
    }

}

