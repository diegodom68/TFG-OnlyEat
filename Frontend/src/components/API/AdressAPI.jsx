import React, { useEffect } from 'react';
import useGoogleScript from '../../Hooks/GoogleScript';


const AddressAPI = ({ apiKey }) => {
    useGoogleScript(apiKey);
  
    useEffect(() => {
      const initAutocomplete = () => {
        if (!window.google) {
          console.log("Google Maps JavaScript API not loaded");
          return;
        }
  
        const input = document.getElementById('autocomplete');
        const autocomplete = new window.google.maps.places.Autocomplete(input);
        autocomplete.setFields(['address_components', 'geometry']);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          console.log(place);
        });
      };
  
      if (window.google) {
        initAutocomplete();
      } else {
        window.onload = initAutocomplete; // Inicializa el autocompletado una vez cargado el script
      }
    }, []);
  
    return <input id="autocomplete" type="text" placeholder="Enter your address" />;
  };
  
export default AddressAPI;
