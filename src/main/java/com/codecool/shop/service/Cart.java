package com.codecool.shop.service;

import com.codecool.shop.model.Product;

import java.io.*;
import java.util.*;

public class Cart implements Serializable {

    private final UUID orderID;
    List<CartItem> cartItems = new ArrayList<CartItem>();
    private static Cart instance;

    public static Cart getInstance() {
        if (instance == null) {
            instance = new Cart();
        }
        return instance;
    }

    private Cart() {
        this.orderID = UUID.randomUUID();
    }

    public UUID getOrderID() {
        return orderID;
    }


    public void addItem(Product product) {
        addItem(new CartItem(product, 1));
    }

    public void addItem(CartItem item) {
        for (CartItem itm : cartItems) {
            if (itm.getProduct().getId() == item.getProduct().getId()) {
                itm.setQuantity(itm.getQuantity() + item.getQuantity());
                System.out.println(this.toString());
                return;
            }
        }

        cartItems.add(item);
        System.out.println(this.toString());


    }

    public void removeItem(CartItem item) {
        cartItems.remove(item);
    }

    private void writeObject(ObjectOutputStream oos) throws IOException {

        oos.writeObject(orderID);
        oos.writeObject(cartItems);
        oos.close();
    }

    private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException {
        instance = (Cart)in.readObject();
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public float getTotalPrice() {
        float cartPrice = 0;
        for (CartItem item : cartItems) {
            cartPrice += item.getSubTotalPrice();
        }
        return cartPrice;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "orderID=" + orderID +
                ", cartItems=" + cartItems +
                '}';
    }
}
