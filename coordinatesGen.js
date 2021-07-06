// function randomIntFromInterval(min, max) { // min and max included 
//     return Math.floor(Math.random() * (max - min + 1) + min);
//   }
  
  const x_min=39.11;
  const x_max=39.9;
  const y_min=-106.23;
  const y_max=-103.92;
  const no_of_steps = 10;
  
  //will need to put this part in an array using a for loop when simulating multiple people
  let lat_init = y_min + (Math.random() * (y_max-y_min));
  let lon_init = x_min + (Math.random() * (x_max-x_min)); //start points
  
  let lat_fin = y_min + (Math.random() * (y_max-y_min));
  let lon_fin = x_min + (Math.random() * (x_max-x_min)); //end points
  
  let x_inc=(lat_fin-lat_init)/(no_of_steps-1);
  let y_inc=(lon_fin-lon_init)/(no_of_steps-1);
  
  let x=lat_init,y=lon_init;
  ////////
  
  let jsonData=[]
  // console.log(lat_init,lon_init);
  for(var i=0;i<10;i++)
  {
    // console.log(x,y);
    x=x+x_inc;
    y=y+y_inc;  
    jsonData.push({"lat":x,"lon":y});
  }
  // console.log(lat_fin,lon_fin);
   
  module.exports = jsonData;