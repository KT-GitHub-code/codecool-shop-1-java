package com.codecool.shop.controller;

import com.codecool.shop.config.TemplateEngineUtil;
import com.codecool.shop.model.Cart;
import com.codecool.shop.model.CartItem;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.WebContext;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;

@WebServlet(urlPatterns = {"/checkout"})
public class CheckoutController extends HttpServlet {
    private final Cart shoppingCart = Cart.getInstance();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        TemplateEngine engine = TemplateEngineUtil.getTemplateEngine(req.getServletContext());
        WebContext context = new WebContext(req, resp, req.getServletContext());
        engine.process("product/checkout.html", context, resp.getWriter());
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("checkout doPost");
        Reader in = new BufferedReader(new InputStreamReader((req.getInputStream())));


        StringBuilder sb = new StringBuilder();
        for (int c; (c = in.read()) >= 0; )
            sb.append((char) c);
        String incomeJson = sb.toString();
        JsonParser jsonParser = new JsonParser();
        JsonObject jsonToSave = (JsonObject) jsonParser.parse(incomeJson);
        JsonObject cartJson = getCartJson();
        jsonToSave.add("cart", cartJson);

        Files.write(Paths.get(shoppingCart.getOrderID() + ".json"), jsonToSave.toString().getBytes());


        System.out.println("redirection to payment");
        resp.sendRedirect("/payment");
    }

    private JsonObject getCartJson() {
        JsonObject cartJson = new JsonObject();
        JsonArray cartItemsArray = new JsonArray();


        for (CartItem item : shoppingCart.getCartItems()) {
            JsonObject cartItem = new JsonObject();
            cartItem.addProperty("name", item.getProduct().getName());
            cartItem.addProperty("quantity", item.getQuantity());
            cartItem.addProperty("price", item.getProduct().getPrice());
            cartItem.addProperty("subtotal", item.getSubTotalPrice());
            cartItemsArray.add(cartItem);
        }
        cartJson.add("items", cartItemsArray);
        cartJson.addProperty("totalPrice", shoppingCart.getTotalPrice());
        return cartJson;
    }

}
