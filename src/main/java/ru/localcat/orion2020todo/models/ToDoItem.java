package ru.localcat.orion2020todo.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class ToDoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    private Long id;
    @Getter
    @Setter
    private Long folderId;
    @Getter
    private Long ownerId;
    @Getter
    @Setter
    @Column(columnDefinition = "text")
    private String content;
    @Getter
    @Setter
    private Boolean status;
    @Getter
    private Integer createAt;
    @Getter
    @Setter
    private Integer updateAt;
}
