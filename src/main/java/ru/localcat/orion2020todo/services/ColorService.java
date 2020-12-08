package ru.localcat.orion2020todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.localcat.orion2020todo.models.Color;
import ru.localcat.orion2020todo.repositories.ColorRepository;

import java.util.List;

@Service
public class ColorService {

    @Autowired
    private ColorRepository colorRepository;

    public List<Color> getColorsList() {
         return (List<Color>) colorRepository.findAll();
    }
}

