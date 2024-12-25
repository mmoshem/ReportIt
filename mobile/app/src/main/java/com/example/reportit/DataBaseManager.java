package com.example.reportit;
import android.widget.Toast;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
public class DataBaseManager {
    // Database credentials
    private static final String URL = "jdbc:mysql://sql100.infinityfree.com:3306/if0_37976463_reportit_db";
    private static final String USER = "if0_37976463";
    private static final String PASSWORD = "YcWAGwA2gL";

    private Connection connection;

    // Constructor to establish a connection
    public DataBaseManager() {
        try {
            // Load MySQL JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("Connected to the database successfully!");
        } catch (ClassNotFoundException e) {
            System.out.println("JDBC Driver not found: " + e.getMessage());

        } catch (SQLException e) {
            System.out.println("Connection failed: " + e.getMessage());
        }
    }

    // Method to execute a SELECT query
    public ResultSet executeQuery(String query) {
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            return statement.executeQuery();
        } catch (SQLException e) {
            System.out.println("Query execution failed: " + e.getMessage());
            return null;
        }
    }

    // Method to execute an INSERT/UPDATE/DELETE query
    public boolean executeUpdate(String query) {
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.executeUpdate();
            return true;
        } catch (SQLException e) {
            System.out.println("Update execution failed: " + e.getMessage());
            return false;
        }
    }

    // Close the connection
    public void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
                System.out.println("Connection closed successfully.");
            }
        } catch (SQLException e) {
            System.out.println("Failed to close connection: " + e.getMessage());
        }
    }
}
