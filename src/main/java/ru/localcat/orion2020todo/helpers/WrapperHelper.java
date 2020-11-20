package ru.localcat.orion2020todo.helpers;

import java.util.ArrayList;
import java.util.List;

public class WrapperHelper {

    public static List<Long> splitInLongList(String targetString, String splitter) {
        List<Long> result = new ArrayList<>();
        String[] strings = targetString.split(splitter);

        if (strings.length > 0) {
            for (String string : strings) {
                result.add(Long.parseLong(string));
            }
        }

        return result;
    }


    public static <T> String implode(List<T> list, String splitter) {
        if (list == null || list.size() == 0) {
            throw new RuntimeException("list is null");
        }

        StringBuilder stringBuilder = new StringBuilder();

        for (T t : list) {
            stringBuilder.append(t).append(splitter);
        }

        return stringBuilder.toString();
    }
}
