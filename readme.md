#### Напоминалка мне:
1) ~~разобратсья со всеми тудушками~~
2) ~~пошукать тему с выносом настроке в ямл, для трушной кубернизации~~
3) ~~Почистить код от личнего импорта~~
4) Может быть запилить клинетскую прилагу, на хтмл, джс, ксс.. но хз
5) ~~Запилить фал с ипортом из постмана (свагер намутить???)~~
6) Эндпоинты в апи для просмотра ролей и перпишенов?
7) Добавить ролей?
8) ~~Поле login сделать unique~~
9) ~~Почистить код от комментариев ненжуных и ипорта, сделать реформат~~
10) запилить мультиязычность ? (почитать про это)
11) ....
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

see /docs/readme.md