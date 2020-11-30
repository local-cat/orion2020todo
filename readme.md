#### Напоминалка мне:

Теперь она здесь )))

![SummerToDo Screen](https://github.com/local-cat/orion2020todo/blob/master/docs/screen.png?raw=true "todo")

___

#### INIT DB:
``INSERT INTO jtodo.`user` 
(id, login, password, email, name, `role`, status)
 VALUES(1, 'admin', '$2a$12$4TpMHJ4LCgIobpLar7WrvuepQI9Vt2wms1WVQR.9NUhCaOIieeuq.', 'mail@tesdt.local', 'AdminName', 'ADMIN', 'ACTIVE');
``
___

#### START USE 

http://localhost:8081/api/v1/auth

**Method**: POST

**Request format**: JSON

**login** : admin

**password**: admin

____

#### TECH DOCS
[Guidelines for this project](docs/readme.md)
