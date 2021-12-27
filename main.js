
const baseUrl = 'https://api.ipify.org/?format=json';

//GET DEFAULT IP ADDRESS 
 fetch (baseUrl)
    .then( response => response.json())
    .then (data => { 
        inputSpace.value = data.ip  
        getPositionDetails (data.ip)

}).catch (err => { 
    console.log(err,'Error fetching ip address')
})
  

// 
const inputSpace = document.querySelector('.ip-value')  ;
const submitBtn= document.querySelector("#properties > form > button") 
submitBtn.addEventListener('click' , (e)=> { 
    e.preventDefault()  ; //DISABLE DEFAULT EVENT ON SUBMIT BTN   
    getPositionDetails(inputSpace.value)
})





const getPositionDetails = (ip) => {     
const yek= 'at_FwAPdWr1oSWqo8xglR3MBEMHgeJ37' ; 
const apiUrl =  `https://geo.ipify.org/api/v2/country,city?apiKey=${yek}&ipAddress=${ip}`   ; 

fetch ( apiUrl )
.then( response => response.json())
.then (data => { 

    const ipAddress = data.ip ; 
    const zone = data.location.timezone ; 
    const isp = data.isp ;
    const locality = data.location.country + ', ' + data.location.region ;  
    const lat = data.location.lat  ; 
    const lng = data.location.lng ; 

    updateDetails(ipAddress, zone , isp  , locality   )
    plotGraph(lat , lng) 
})
.catch (err  => { 
    console.log('Error at getting position')
})

}

//FUNCTION TO PLOT GRAP USING ---API
let plotGraph  = function (lat , lng  ) {  
    try { 

        let container = L.DomUtil.get('map'); 
        if(container != null){ container._leaflet_id = null; } 

        let map = L.map('map').setView([lat , lng ], 13 );
        let tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hpZWZjaXBoZXIiLCJhIjoiY2t4bHVpMmZoMWs2OTJ3dWI3ZnM3dG1qNSJ9.vT1pLDVvVIzncKD5aGqA9g', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiY2hpZWZjaXBoZXIiLCJhIjoiY2t4bHVpMmZoMWs2OTJ3dWI3ZnM3dG1qNSJ9.vT1pLDVvVIzncKD5aGqA9g' , 
    }).addTo(map);
    
        let  Icon = L.icon({
        iconUrl: 'images/icon-location.svg',
        iconSize:     [38, 95], // size of the icon
    });
    
    L.marker([lat, lng ], {icon: Icon}).addTo(map);
        

    } 
    catch (err) {  

      console.log(err , ' at plot graph function')
    }
    
} 


//FUNCTION TO UPDATE WRIGHTEN WRITEUPS AT PAGE 
const updateDetails = (ip , zone , isp , locality ) => {  
    try { 
        document.querySelector('.db__content--ip ').innerHTML = ip 
        document.querySelector('.db__content--zone span').innerHTML = zone
        document.querySelector('.db__content--isp ').innerHTML = isp 
        document.querySelector('.db__content--location ').innerHTML = locality
    }
    catch (err ) { 
        console.log(err , 'at updateDetails' )
    }
    

}



//FUNCTION TO HIDE DISPLAY BOX ON HOVER TO MAP 

const toggleDisplay = ()=> {  
    const propertiesBlock = document.querySelector('.properties__display') ;  
    
    document.querySelector('#map-section').addEventListener('mouseover' , ()=> { 
        propertiesBlock.classList.remove('active')
    })
    document.querySelector('#map-section').addEventListener('mouseout' , ()=> { 
        propertiesBlock.classList.add('active')
    })
}

toggleDisplay()

