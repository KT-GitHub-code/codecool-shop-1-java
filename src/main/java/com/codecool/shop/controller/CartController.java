package com.codecool.shop.controller;

import com.codecool.shop.dao.implementation.ProductDaoMem;
import com.codecool.shop.service.Cart;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Map;

@WebServlet(urlPatterns = {"/cart"})
public class CartController extends HttpServlet {
    private Cart shoppingCart = Cart.getInstance();


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Cart cart = Cart.getInstance();
        ProductDaoMem pdm = ProductDaoMem.getInstance();
        Reader in = new BufferedReader(new InputStreamReader((req.getInputStream())));

        StringBuilder sb = new StringBuilder();
        for (int c; (c = in.read()) >= 0; )
            sb.append((char) c);
        String str = sb.toString();

        JsonParser jsonParser = new JsonParser();
        JsonObject jsonCartItem = (JsonObject) jsonParser.parse(str);
        int pID = jsonCartItem.get("productID").getAsInt();

        cart.addItem(pdm.find(pID));
    }
}
