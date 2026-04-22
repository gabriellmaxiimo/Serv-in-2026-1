package com.servin.api.utils;

public class CpfUtils {

    public static String sanitizar(String cpf) {
        if (cpf == null) {
            return null;
        }
        return cpf.replaceAll("\\D", ""); 
    }
}