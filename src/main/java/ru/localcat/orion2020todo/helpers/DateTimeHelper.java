package ru.localcat.orion2020todo.helpers;

public class DateTimeHelper {
    public static Integer getNowInEpocSeconds() {
        return Math.toIntExact(System.currentTimeMillis() / 1000);
    }
}
