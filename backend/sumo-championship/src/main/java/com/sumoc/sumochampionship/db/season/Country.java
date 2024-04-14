package com.sumoc.sumochampionship.db.season;

import java.util.ArrayList;
import java.util.List;

/*
 List of countries supported by system
 TODO: Refactor this: store it in database
 */
public enum Country {
    ALBANIA,
    ANDORRA,
    AUSTRIA,
    BELARUS,
    BELGIUM,
    BOSNIA_AND_HERZEGOVINA,
    BULGARIA,
    CROATIA,
    CYPRUS,
    CZECH_REPUBLIC,
    DENMARK,
    ESTONIA,
    FINLAND,
    FRANCE,
    GERMANY,
    GREECE,
    HUNGARY,
    ICELAND,
    IRELAND,
    ITALY,
    KOSOVO,
    LATVIA,
    LIECHTENSTEIN,
    LITHUANIA,
    LUXEMBOURG,
    MALTA,
    MOLDOVA,
    MONACO,
    MONTENEGRO,
    NETHERLANDS,
    NORTH_MACEDONIA,
    NORWAY,
    POLAND,
    PORTUGAL,
    ROMANIA,
    RUSSIA,
    SAN_MARINO,
    SERBIA,
    SLOVAKIA,
    SLOVENIA,
    SPAIN,
    SWEDEN,
    SWITZERLAND,
    UKRAINE,
    UNITED_KINGDOM,
    VATICAN_CITY;


    public static boolean exists(String countryName){
        for(Country country: Country.values()){
            String countryString = country.name().replace("_", " ");
            if (countryName.equals(countryString)) return true;
        }
        return false;
    }
    public static List<String> getAllCountries(){
        List<String> countries = new ArrayList<>();
        for(Country country: Country.values()){
            countries.add(country.name().replace("_", " "));
        }
        return countries;
    }

    public static Country toEnum(String country){
        Country country1 = null;
        try{
            country1 = Country.valueOf(country.toUpperCase().replace(" ", "_"));
        }catch (IllegalArgumentException e){
            return null;
        }
        return country1;
    }
}
