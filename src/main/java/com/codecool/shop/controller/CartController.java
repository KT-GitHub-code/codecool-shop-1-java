package com.codecool.shop.controller;

import com.codecool.shop.dao.implementation.ProductDaoMem;
import com.codecool.shop.service.Cart;
import com.codecool.shop.service.CartItem;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;
import java.util.Map;

@WebServlet(urlPatterns = {"/cart"})
public class CartController extends HttpServlet {
    private final Cart shoppingCart = Cart.getInstance();


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonObject returnJson = new JsonObject();
        JsonArray cartItemsArray = new JsonArray();

        System.out.println(shoppingCart.getCartItems().size());
        for (CartItem item : shoppingCart.getCartItems()) {
            JsonObject cartItem = new JsonObject();
            System.out.println("Adding "+ item.getProduct().getName());
            cartItem.addProperty("name", item.getProduct().getName());
            cartItem.addProperty("quantity", item.getQuantity());
            cartItem.addProperty("price",item.getProduct().getPrice());
            cartItem.addProperty("subtotal",item.getSubTotalPrice());
            cartItemsArray.add(cartItem);
        }
        returnJson.add("items", cartItemsArray);
        returnJson.addProperty("totalPrice",shoppingCart.getTotalPrice());
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        out.print(returnJson.toString());
        out.flush();

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ProductDaoMem pdm = ProductDaoMem.getInstance();
        Reader in = new BufferedReader(new InputStreamReader((req.getInputStream())));

        StringBuilder sb = new StringBuilder();
        for (int c; (c = in.read()) >= 0; )
            sb.append((char) c);
        String str = sb.toString();

        JsonParser jsonParser = new JsonParser();
        JsonObject jsonCartItem = (JsonObject) jsonParser.parse(str);
        int pID = jsonCartItem.get("productID").getAsInt();

        shoppingCart.addItem(pdm.find(pID));
    }
}
