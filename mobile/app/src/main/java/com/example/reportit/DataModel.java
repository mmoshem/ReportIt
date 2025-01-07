package com.example.reportit;

public class DataModel {

    private String name;
    private String version;
    private int image; // Integer
    private int id;

    public DataModel(String i_Name, String i_Version, int i_Image, int i_id) {
        name = i_Name;
        version = i_Version;
        image = i_Image;
        id = i_id;
    }

    public void setName(String name) {
        this.name = name;
    }


    public void setVersion(String version) {
        this.version = version;
    }

    public void setImage(int image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public String getVersion() {
        return version;
    }

    public int getId_() {
        return id;
    }

    public int getImage() {
        return image;
    }
}
