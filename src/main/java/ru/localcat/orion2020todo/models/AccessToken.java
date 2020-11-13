package ru.localcat.orion2020todo.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class AccessToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    private Long id;
    @Getter
    private String token;
    @Getter
    private Integer createAt;
    @Getter
    private Integer expiresIn;
    @Getter
    //TODO FOREIGHT KEY
    private Long userId;


}
