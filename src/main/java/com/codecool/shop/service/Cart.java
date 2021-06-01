package com.codecool.shop.service;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.*;

public class Cart implements Serializable {

    private final UUID orderID;
    List<CartItem> cartItems = new ArrayList<CartItem>();
    private static Cart instance;

    public static Cart getInstance() {
        if (instance == null)
            return new Cart();
        return instance;
    }

    private Cart() {
        this.orderID = UUID.randomUUID();
    }

    public UUID getOrderID() {
        return orderID;
    }

    public void addItem(CartItem item) {
        for (CartItem itm : cartItems) {
            if (itm.getProduct().getId() == item.getProduct().getId()) {
                itm.setQuantity(itm.getQuantity() + item.getQuantity());
                return;
            }
        }
        cartItems.add(item);
    }

    public void removeItem(CartItem item) {
        cartItems.remove(item);
    }


    private void writeObject(ObjectOutputStream oos) throws IOException {

        oos.writeObject(orderID);
        oos.writeObject(cartItems);

    }

    private void readObject(ObjectInputStream in) throws IOException {

    }

    public float getTotalPrice() {
        float cartPrice = 0;
        for (CartItem item : cartItems) {
            cartPrice += item.getSubTotalPrice();
        }
        return cartPrice;
    }
}
