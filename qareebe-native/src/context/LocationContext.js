import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [status, setStatus] = useState(null);

    const requestLocation = async (isMandatory = false) => {
        try {
            let { status: permissionStatus } = await Location.requestForegroundPermissionsAsync();
            setStatus(permissionStatus);

            if (permissionStatus !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                if (isMandatory) {
                    Alert.alert(
                        "Location Required",
                        "Qareebe needs your location to provide delivery services. Please enable it in settings.",
                        [{ text: "OK" }]
                    );
                }
                return false;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            return true;
        } catch (error) {
            console.error("Location error:", error);
            return false;
        }
    };

    useEffect(() => {
        // Pro-active request on app mount
        requestLocation(false);
    }, []);

    return (
        <LocationContext.Provider value={{ location, errorMsg, status, requestLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);
