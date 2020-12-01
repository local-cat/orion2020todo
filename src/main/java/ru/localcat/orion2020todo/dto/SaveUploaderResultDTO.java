package ru.localcat.orion2020todo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SaveUploaderResultDTO {
    private String fileName;
    private String fullFilePath;
}
