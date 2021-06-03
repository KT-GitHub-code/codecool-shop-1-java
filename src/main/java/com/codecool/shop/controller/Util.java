package com.codecool.shop.controller;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

public class Util {
    public static JsonObject getRequestData (HttpServletRequest request) throws IOException {
        Reader in = new BufferedReader(new InputStreamReader((request.getInputStream())));

        StringBuilder sb = new StringBuilder();
        for (int c; (c = in.read()) >= 0; )
            sb.append((char) c);
        String str = sb.toString();

        JsonParser jsonParser = new JsonParser();
        return (JsonObject) jsonParser.parse(str);
    }
}
