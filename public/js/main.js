const submit=document.getElementById('submitBtn');
const cityName= document.getElementById('cityName');
const city_name= document.getElementById('city_name');
const real_temp = document.getElementById('real_temp');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');
const day=document.getElementById('day');
const today_data=document.getElementById('today_data');
const datahideTop = document.querySelector('.top_layer');

const getclick = async(event) => {
    event.preventDefault();
    let cityVal=cityName.value;
     
 
     if(cityVal === "")
      {
         city_name.innerText="plz write a city name";
         datahide.classList.add('data_hide');
         datahideTop.classList.add('data_hide');
      } else if(cityVal=="Sonagachi")
      {
        city_name.innerText="Too hot to show the temperature!!";
        datahide.classList.add('data_hide');
        datahideTop.classList.add('data_hide');

      }
      else
      {
      try {

        let url =`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=mertic&appid=8d98433d60d6eefd652235336c307dfa`;
        const response = await fetch(url);
        const data = await response.json();
        const arrdata =[data];


        let temperature =arrdata[0].main.temp-273;
        let actual_temp=temperature.toFixed(2);
        real_temp.innerText=actual_temp;

        
        city_name.innerText=`${arrdata[0].name},${arrdata[0].sys.country}`;
        
        const temp_cur =arrdata[0].weather[0].main;
         console.log(temp_cur);
        if(temp_cur === "Clear"){
            temp_status.innerHTML=
            "<i class='fas fa-sun' sytle='color: #eccc68;'></i>";
        } else  if(temp_cur === "Clouds"){
            temp_status.innerHTML=
            "<i class='fas fa-cloud' sytle='color: #f1f2f6;'></i>";
        } else if(temp_cur === "Rain"){
            temp_status.innerHTML=
            "<i class='fas fa-cloud-rain' sytle='color: #a4b0be;'></i>";
        }   else {
            temp_status.innerHTML=
            "<i class='fas fa-sun' sytle='color: #eccc68;'></i>";
        }


        // day;

        const getCurrentDay = () => {
             const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Sat"];

                const d = new Date();
                let day = weekday[d.getDay()];
                return day;
        }

        day.innerText=getCurrentDay();


        const getCurrentTime = () =>{
            var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];
            let now = new Date();
            let month = months[now.getMonth()];
            let date = now.getDate();
            
            let hours = now.getHours();
            let mins = now.getMinutes();

            let periods = "AM";
            if(hours>11)
            {
                periods="PM";
                if(hours>12)
                hours=hours-12;

            }
            if(mins<10)
            {
                mins = "0"+mins;
            } 
            return `${month} ${date} | ${hours}:${mins}${periods}` 
        }

        today_data.innerText=getCurrentTime();

        datahide.classList.remove('data_hide');
        datahideTop.classList.remove('data_hide');
       } catch  {
        city_name.innerText=`plz enter the city name properly`;
        datahide.classList.add('data_hide');
        datahideTop.classList.add('data_hide');
        }

    }
    

}

   

submit.addEventListener('click', getclick);