package ru.localcat.orion2020todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.localcat.orion2020todo.exceptions.AccessDeniedException;
import ru.localcat.orion2020todo.exceptions.FolderException;
import ru.localcat.orion2020todo.exceptions.ToDoItemException;
import ru.localcat.orion2020todo.helpers.DateTimeHelper;
import ru.localcat.orion2020todo.models.Folder;
import ru.localcat.orion2020todo.repositories.FolderRepository;

@Service
public class FolderService {

    public static final Long SUPER_PARENT_FOLDER_ID = 0L;

    @Autowired
    private FolderRepository folderRepository;
    @Autowired
    private AuthUserContextService authUserContextService;

    public Folder createFolder(Folder folder) {
        folder.setOwnerId(authUserContextService.getId());
        folder.setCreateAt(DateTimeHelper.getNowInEpocSeconds());
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

        if (!isAccess(folder.getOwnerId())) {
            throw new AccessDeniedException("You don have permission for this Folder");
        }

        if (!isAccess(folder.getParentId())) {
            throw new AccessDeniedException("You don have permission for this Folder");
        }

        if (folder.getName() != null) {
            folderInDb.setName(folder.getName());
        }

        folderInDb.setUpdateAt(DateTimeHelper.getNowInEpocSeconds());
        return folderRepository.save(folderInDb);
    }

    public void deleteFolder(Long id) {
        //TODO надо мутануть какуюнть тему, если у папки есть дочки, не тру сносить будет, можно всех найти перебрать и выставить в НУЛЛ конечно
        Folder folder = folderRepository.findById(id)
                .orElseThrow(() -> new ToDoItemException("Folder not found!"));
        if (!isAccess(folder.getOwnerId())) {
            throw new AccessDeniedException("You don have permission for this Folder");
        }
        folderRepository.delete(folder);
    }

    public boolean isAccess(Long folderId) {
        Folder folderInDb = folderRepository.findById(folderId)
                .orElseThrow(() -> new FolderException("Folder not found!"));
        return folderInDb.getOwnerId() == authUserContextService.getId();
    }

}
