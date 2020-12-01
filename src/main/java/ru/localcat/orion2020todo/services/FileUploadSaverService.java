package ru.localcat.orion2020todo.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.localcat.orion2020todo.dto.SaveUploaderResultDTO;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileUploadSaverService {
    public List<SaveUploaderResultDTO> saveUploadedFiles(String targetFolder, List<MultipartFile> files) throws IOException {
        List<SaveUploaderResultDTO> resultDTOS = new ArrayList<>();
        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;//next pls
            }
            String absolutePath = new File("").getAbsolutePath();
            byte[]bytes = file.getBytes();
            Files.createDirectories(Paths.get(absolutePath + targetFolder));
            String fullPath = absolutePath + targetFolder + file.getOriginalFilename();
            Path path = Paths.get(fullPath);
            Files.write(path, bytes);

            resultDTOS.add(new SaveUploaderResultDTO(file.getOriginalFilename(), fullPath));
        }

        return resultDTOS;

    }
}
