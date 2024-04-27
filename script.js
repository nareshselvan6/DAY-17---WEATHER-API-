function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}

let container = element("div", "container", "", "");
let heading = element("H1", "text-center", "title", "Countries Weather Details");
let row = element("div", "row", "", "");

container.append(row);
document.body.append(heading, container);

// fetching part
let response = fetch("https://restcountries.com/v3.1/all");
response
  .then((data) => data.json())
  .then((result) => {
    for (let i = 0; i < result.length; i++) {
      let col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
      col.innerHTML = `
        <div class="card h-100 ">
        <div class ="card-header">
        <h5 class="card-title text-center">${result[i].name.common}</h5>
        </div>
        <div class="img-box h-50 ">
        <img src="${result[i].flags.png}" class="card-img-top" alt="country image">
        </div>
        <div class="card-body card-text text-center">

        <div class="card-body card-text text-center">
        <h5 class="py-2">Region: ${result[i].region}</h5>
        <h5 class="py-2">capital: ${result[i].capital}</h5>
        <h5 class="py-2">Country Code: ${result[i].cca3}</h5>
        <button class="btn btn-primary ">Click For Weather</button>
        </div>
        </div>
        `;
      row.append(col);
    }

    let buttons = document.querySelectorAll("button");
    // console.log(buttons);

    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        let latlng = result[index].latlng;
        let lat = latlng[0];
        let lon = latlng[1];
        

       let weatherapi=fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7eebfd09ec4b9ddf006c0c91f664d1b0`);
       weatherapi.then((data)=>data.json()).then((res)=>{
        alert(`Weather of ${result[index].name.common} is ${Math.floor(res.main.temp - 273.15)}°C`)
       })
      });
    });

  });
