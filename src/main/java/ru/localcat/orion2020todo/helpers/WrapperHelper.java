package ru.localcat.orion2020todo.helpers;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class WrapperHelper {

    public static List<Long> splitInLongList(String targetString, String splitter) {
        String[] strings = targetString.split(splitter);
        List<Long> result = Arrays.stream(strings).map(Long::parseLong).collect(Collectors.toList());
        return result;
    }

    //Оставляет сплитер в коцне строки
    public static <T> String implode(List<T> list, String splitter) {
        if (list == null || list.size() == 0) {
            throw new RuntimeException("list is null");
        }

        return list.stream().map(t -> t + splitter).collect(Collectors.joining());
    }
}
