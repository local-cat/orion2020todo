package ru.localcat.orion2020todo.controllers.api.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.localcat.orion2020todo.constants.ApiConstants;
import ru.localcat.orion2020todo.helpers.WrapperHelper;
import ru.localcat.orion2020todo.models.ToDoItem;
import ru.localcat.orion2020todo.services.ToDoItemService;

import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping(ApiConstants.VERSION1_PATH + "/todoitems")
public class ToDoItemV1Controller {

    @Autowired
    private ToDoItemService toDoItemService;

    @GetMapping
    public List<ToDoItem> getToDoItemsList() {
        return (List<ToDoItem>) toDoItemService.getMyTodoList(null);
    }

    //TODO не лучшая реализация
    @GetMapping("/folders/{idsText}")
    @PreAuthorize("hasAuthority('selftodo:read')")
    public List<ToDoItem> getToDoItemsListInFolders(@PathVariable(value = "idsText") String folderIdsInLine) {
        if(folderIdsInLine == null) {
            throw new RuntimeException("List of folders is empty!");
        }
        else
        {
            List<Long> folderIds = WrapperHelper.splitInLongList(folderIdsInLine,",");
            return toDoItemService.getMyTodoList(folderIds);
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('selftodo:create')")
    public ToDoItem createToDoItem(@Valid @RequestBody ToDoItem toDoItem) {
        return toDoItemService.createToDoItem(toDoItem);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('selftodo:edit')")
    public ToDoItem updateToDoItem(@PathVariable(value = "id") Long toDoItemId,
                           @Valid @RequestBody ToDoItem toDoItemDetails) throws NoSuchAlgorithmException {
        try {
            return toDoItemService.updateToDoItem(toDoItemId, toDoItemDetails);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, exception.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('selftodo:delete')")
    public ResponseEntity deleteToDoItem(@PathVariable(value = "id") Long toDoItemId) {
        try {
            toDoItemService.deleteToDoItem(toDoItemId);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, exception.getMessage());
        }
        return ResponseEntity.ok().build();
    }

}
