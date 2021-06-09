package com.poosh.app.utils;

import java.util.Arrays;

public class TXTFileExporter implements FileExporter{

    @Override
    public String exportData(Object object) {
        Boolean isUser = object.getClass().toString().contains("User");

        if (isUser) {
            return "Txt report for a user.";
        }

        return "Generate txt report.";
    }
}
