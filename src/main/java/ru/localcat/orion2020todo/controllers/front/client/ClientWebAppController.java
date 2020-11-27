package ru.localcat.orion2020todo.controllers.front.client;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ClientWebAppController {
    @GetMapping("/client")
    public String clientPage() {
        return "client/app.html";
    }

    @GetMapping("/client/auth")
    public String clientAuth() {
        return "client/auth.html";
    }

    @GetMapping("/client/app")
    public String clientApp() {
        return "client/app.html";
    }
}
