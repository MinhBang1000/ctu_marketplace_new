package com.ctu.marketplace.utils;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class GenerateNameUtils {
    public static String generateName(String name){
        String n = Normalizer.normalize(name, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(n).replaceAll("").toLowerCase().replaceAll(" ", "-").replaceAll("đ", "d");
    }
}
