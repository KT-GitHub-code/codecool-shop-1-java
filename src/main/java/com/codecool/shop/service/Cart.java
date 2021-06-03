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
        System.out.println("Adding " + product.getName());
        CartItem toAdd = new CartItem(product, 1);
        for (CartItem itm : cartItems) {
            if (itm.getProduct().getId() == toAdd.getProduct().getId()) {
                itm.setQuantity(itm.getQuantity() + toAdd.getQuantity());
                return;
            }
        }
        cartItems.add(toAdd);
    }


    public void removeItem(Product product) {
        System.out.println("Removing " + product.getName());
        cartItems.removeIf(cItem -> cItem.getProduct().getId() == product.getId());
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
