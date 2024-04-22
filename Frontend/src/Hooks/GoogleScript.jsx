import { useEffect } from 'react';

const useLoadGoogleMapsAPI = (apiKey) => {
    useEffect(() => {
        const scriptId = 'google-maps-script';

        if (document.getElementById(scriptId)) {
            return; // El script ya está cargado, no hacer nada
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            // Limpiar el script al desmontar el componente
            if (document.getElementById(scriptId)) {
                document.body.removeChild(script);
            }
        };
    }, [apiKey]); // Dependencia para recargar si la apiKey cambia
};

export default useLoadGoogleMapsAPI;

