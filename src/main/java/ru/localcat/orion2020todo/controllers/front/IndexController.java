package ru.localcat.orion2020todo.controllers.front;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    @GetMapping("/")
    public String siteHome(Model model) {
        model.addAttribute("title", "Summer//TODO");
        return "index";
    }

    @GetMapping("/api")
    public String siteApi(Model model) {
        model.addAttribute("title", "Summer//TODO");
        return "api";
    }

    @GetMapping("/features")
    public String siteFeatures(Model model) {
        model.addAttribute("title", "Summer//TODO");
        return "features";
    }

    @GetMapping("/contact")
    public String siteContact(Model model) {
        model.addAttribute("title", "Summer//TODO");
        return "contact";
    }

}
