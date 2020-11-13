package ru.localcat.orion2020todo.controllers.client;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.localcat.orion2020todo.constants.ApiConstants;

@Controller
public class IndexController {
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "jToDo");
        model.addAttribute("projectName", "jToDo");
        model.addAttribute("clientUri", "/client/");
        model.addAttribute("apiV1Uri", ApiConstants.VERSION1_PATH);
        return "index";
    }

}
