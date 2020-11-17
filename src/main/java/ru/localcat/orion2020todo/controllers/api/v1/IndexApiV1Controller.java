package ru.localcat.orion2020todo.controllers.api.v1;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.localcat.orion2020todo.constants.ApiConstants;

@RestController
@RequestMapping(ApiConstants.VERSION1_PATH)
public class IndexApiV1Controller {

    @GetMapping
    public ResponseEntity<String> getApiDescription() {
        return new ResponseEntity<String>("Link for Swagger", null, HttpStatus.I_AM_A_TEAPOT);
    }
}
