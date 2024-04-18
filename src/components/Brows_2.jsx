import FotoFalafel from '../images/falafel_salad_home_dss_desktop_es.cbd8906b.png'

function Brows_2 () {
    return(
            <div className="flex flex-row bg-orange-500">
            <svg width="136px" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="0,100 100,0 0,0" fill="white" />
            </svg>



                <img src={FotoFalafel} alt="FotoFalafel" className="h-8/12 w-8/12"/>
            </div>
    );
}

export default Brows_2;