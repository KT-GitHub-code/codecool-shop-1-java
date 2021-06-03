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

@WebServlet(urlPatterns = {"/cart"})
public class CartController extends HttpServlet {
    private final Cart shoppingCart = Cart.getInstance();
    private final ProductDaoMem pdm = ProductDaoMem.getInstance();


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonObject returnJson = new JsonObject();
        JsonArray cartItemsArray = new JsonArray();

        for (CartItem item : shoppingCart.getCartItems()) {
            JsonObject cartItem = new JsonObject();
            cartItem.addProperty("id", item.getProduct().getId());
            cartItem.addProperty("name", item.getProduct().getName());
            cartItem.addProperty("quantity", item.getQuantity());
            cartItem.addProperty("price",item.getProduct().getDefaultPrice());
            cartItem.addProperty("subtotal",item.getSubTotalPrice());
            cartItem.addProperty("currency",item.getProduct().getDefaultCurrency().toString());
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
        JsonObject jsonCartItem = getRequestData(req);
        int pID = jsonCartItem.get("productID").getAsInt();

        shoppingCart.addItem(pdm.find(pID));
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonObject jsonCartItem = getRequestData(req);
        int pID = jsonCartItem.get("productID").getAsInt();

        shoppingCart.removeItem(pdm.find(pID));
    }


    private JsonObject getRequestData (HttpServletRequest request) throws IOException {
        Reader in = new BufferedReader(new InputStreamReader((request.getInputStream())));

        StringBuilder sb = new StringBuilder();
        for (int c; (c = in.read()) >= 0; )
            sb.append((char) c);
        String str = sb.toString();

        JsonParser jsonParser = new JsonParser();
        return (JsonObject) jsonParser.parse(str);
    }
}
