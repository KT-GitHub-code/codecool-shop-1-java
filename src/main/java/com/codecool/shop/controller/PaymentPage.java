package com.codecool.shop.controller;

import com.codecool.shop.config.TemplateEngineUtil;
import com.codecool.shop.dao.ProductCategoryDao;
import com.codecool.shop.dao.ProductDao;
import com.codecool.shop.dao.SupplierDao;
import com.codecool.shop.dao.implementation.ProductCategoryDaoMem;
import com.codecool.shop.dao.implementation.ProductDaoMem;
import com.codecool.shop.dao.implementation.SupplierDaoMem;
import com.codecool.shop.service.Cart;
import com.codecool.shop.service.ProductService;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.WebContext;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = {"/payment"})
public class PaymentPage extends HttpServlet {
    private final Cart shoppingCart = Cart.getInstance();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        WebContext context = new WebContext(req, resp, req.getServletContext());
        ProductDao productDataStore = ProductDaoMem.getInstance();
        ProductCategoryDao productCategoryDataStore = ProductCategoryDaoMem.getInstance();
        SupplierDao supplierDataStore = SupplierDaoMem.getInstance();
        ProductService productService = new ProductService(productDataStore, productCategoryDataStore);

        if ((req.getParameter("categoryId") != null) && (req.getParameter("vendorId") == null)) {
            int category_id = Integer.parseInt(req.getParameter("categoryId"));
            context.setVariable("category", productService.getProductCategory(category_id));
            context.setVariable("products", productService.getProductsForCategory(category_id));

        } else if ((req.getParameter("categoryId") == null) && (req.getParameter("supplierId") != null)) {
            int supplierId = Integer.parseInt(req.getParameter("supplierId"));
            context.setVariable("supplier", supplierDataStore.find(supplierId));
            context.setVariable("products", productService.getProductsForSupplier(supplierId));
        } else {
            context.setVariable("category", productService.getProductCategory(1));
            context.setVariable("products", productService.getProductsForCategory(1));
        }

        context.setVariable("allcategories", productCategoryDataStore.getAll());
        context.setVariable("allsuppliers", supplierDataStore.getAll());
        TemplateEngine engine = TemplateEngineUtil.getTemplateEngine(req.getServletContext());


        context.setVariable("cart", shoppingCart );
//        context.setVariable("productNames", shoppingCart.getCartItems(). );

        engine.process("product/payment.html", context, resp.getWriter());
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{

    }

}
