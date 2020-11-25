package ru.localcat.orion2020todo.controllers.api.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.localcat.orion2020todo.constants.ApiConstants;
import ru.localcat.orion2020todo.models.Folder;
import ru.localcat.orion2020todo.services.FolderService;

import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping(ApiConstants.VERSION1_PATH + "/folders")
public class FolderV1Controller {

    @Autowired
    private FolderService folderService;

    //TODO Можно ли как два нижних метода объединить в один , а тчонее объеденить их ГЕтМаппинги?
    @GetMapping()
    public List<Folder> getFolders() {
        return folderService.getFoldersList(FolderService.SUPER_PARENT_FOLDER_ID);
    }

    @GetMapping("/{id}")
    public List<Folder> getFoldersWithParentId(@PathVariable(value = "id") Long parentFolderId) {
        return folderService.getFoldersList(parentFolderId);
    }

    @PostMapping
    public Folder createFolder(@Valid @RequestBody Folder folder) {
        return folderService.createFolder(folder);
    }

    @PutMapping("/{id}")
    public Folder updateToDoItem(@PathVariable(value = "id") Long folderId,
                                 @Valid @RequestBody Folder folderDetails) throws NoSuchAlgorithmException {
        try {
            return folderService.updateFolder(folderId, folderDetails);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, exception.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteFolder(@PathVariable(value = "id") Long folderId) {
        try {
            folderService.deleteFolder(folderId);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, exception.getMessage());
        }
        return ResponseEntity.ok().build();
    }

}
