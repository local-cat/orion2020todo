package ru.localcat.orion2020todo.controllers.api.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.localcat.orion2020todo.constants.ApiConstants;
import ru.localcat.orion2020todo.dto.SaveUploaderResultDTO;
import ru.localcat.orion2020todo.helpers.DateTimeHelper;
import ru.localcat.orion2020todo.models.ToDoFiles;
import ru.localcat.orion2020todo.repositories.ToDoFilesRepository;
import ru.localcat.orion2020todo.services.AuthUserContextService;
import ru.localcat.orion2020todo.services.FileUploadSaverService;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(ApiConstants.VERSION1_PATH + "/files")
public class ToDoFilesV1Controller {

    private static String UPLOADED_FOLDER = "/files_upload/";

    @Autowired
    private FileUploadSaverService fileUploadSaverService;

    @Autowired
    private ToDoFilesRepository toDoFilesRepository;

    @Autowired
    private AuthUserContextService authUserContextService;

    //TODO
    @GetMapping("/{id}")
    public List<?> getFileListByToDoId(@PathVariable(value = "id") Long toDoItemId) {
        return toDoFilesRepository.findByToDoItemIdAndOwnerId(toDoItemId, authUserContextService.getId());
    }

    //TODO Замаорожено
/*    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestPart(name = "file", required = false) MultipartFile uploadfile) {
        Map<Object, Object> response = new HashMap<>();

        if (uploadfile == null || uploadfile.isEmpty()) {
            response.put("message", "Please select a file!");
            response.put("status", "NO_FILES");
            return ResponseEntity.ok(response);
        }

        try {
            fileUploadSaverService.saveUploadedFiles(UPLOADED_FOLDER, Arrays.asList(uploadfile));
        } catch (IOException e) {
            response.put("message", "Files not uploaded");
            response.put("status", "BAD");
            return ResponseEntity.unprocessableEntity().body(response);
            //return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        response.put("message", "Successfully uploaded");
        response.put("status", "OK");
        return ResponseEntity.ok(response);
    }*/

    @PostMapping("/upload/multi")
    @PreAuthorize("hasAuthority('todofiles:upload')")
    public ResponseEntity<?> uploadFileMulti(
            @RequestPart(name = "files[]", required = false) MultipartFile[] uploadfiles,
            @RequestParam(value = "entity_id", required = false) String todoIdText) {

        Map<Object, Object> response = new HashMap<>();
        //Get file name
        String uploadedFileName = Arrays.stream(uploadfiles).map(x -> x.getOriginalFilename())
                .filter(x -> !StringUtils.isEmpty(x)).collect(Collectors.joining(" , "));

        if (StringUtils.isEmpty(uploadedFileName)) {
            response.put("message", "Please select a file!");
            response.put("status", "NO_FILES");
            return ResponseEntity.ok(response);
        }

        try {
            String uploadPath = UPLOADED_FOLDER;
            if(todoIdText != null && todoIdText.length() > 0) {
                uploadPath = UPLOADED_FOLDER  + todoIdText+ "/";
            }
            List<SaveUploaderResultDTO> uploadResult = fileUploadSaverService.saveUploadedFiles(uploadPath, Arrays.asList(uploadfiles));
            for (SaveUploaderResultDTO saveUploaderResultDTO : uploadResult) {
                ToDoFiles mFile = new ToDoFiles();
                mFile.setName(saveUploaderResultDTO.getFileName());
                mFile.setPath(saveUploaderResultDTO.getFullFilePath());
                mFile.setToDoItemId(Long.parseLong(todoIdText));
                mFile.setOwnerId(authUserContextService.getId());
                mFile.setCreateAt(DateTimeHelper.getNowInEpocSeconds());
                toDoFilesRepository.save(mFile);
            }
        } catch (IOException e) {
            response.put("message", "Files not uploaded");
            response.put("status", "BAD");
            return ResponseEntity.unprocessableEntity().body(response);
        }

        response.put("message", "Successfully uploaded");
        response.put("status", "OK");
        return ResponseEntity.ok(response);
    }

}
