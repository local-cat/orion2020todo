package ru.localcat.orion2020todo.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    private Long id;
    @Getter
    @Setter
    private Long parentId;
    @Getter
    @Setter
    private String name;
    @Getter
    private Long ownerId;
    @Getter
    private Integer createAt;
    @Getter
    @Setter
    private Integer updateAt;
}
