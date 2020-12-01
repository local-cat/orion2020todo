package ru.localcat.orion2020todo.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class ToDoFiles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;
    @Getter
    @Setter
    private Long toDoItemId;
    @Getter
    @Setter
    private Long ownerId;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private String path;
    @Getter
    @Setter
    private Boolean deleted;
    @Getter
    @Setter
    private Integer createAt;
}
