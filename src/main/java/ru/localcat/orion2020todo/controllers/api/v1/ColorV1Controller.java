package ru.localcat.orion2020todo.controllers.api.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.localcat.orion2020todo.constants.ApiConstants;
import ru.localcat.orion2020todo.models.Color;
import ru.localcat.orion2020todo.services.ColorService;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.VERSION1_PATH + "/colors")
public class ColorV1Controller {

    @Autowired
    private ColorService colorService;

    @GetMapping
    public List<Color> getColorsList() {
        return colorService.getColorsList();
    }
}
