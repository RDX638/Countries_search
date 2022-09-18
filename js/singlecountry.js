
const init = () => {
    doApi()
}

const doApiByCode = async code => {

    let url = `https://restcountries.com/v3.1/alpha/${code.toLowerCase()}`;
    let resp = await fetch(url);
    let data = await resp.json();
  
    data = data.filter(item =>
        item.name.common != "Palestine"
    )
    hideLoading()
    document.querySelector("#id_parent").innerHTML = "";
    let { name } = updateUi(data[0])
    return data[0].name.common;
}



const doApi = async () => {
    showLoading()
    const urlParams = new URLSearchParams(window.location.search);
    let idCountry = urlParams.get("name");
    if (idCountry == "United States") {
        idCountry = "United States of America"
    }
   
    if (idCountry) {
        let url = `https://restcountries.com/v3.1/name/${idCountry}`;
        let resp = await fetch(url);
        let data = await resp.json();
        data = data.filter(item =>
            item.name.common != "Palestine"
        )
        hideLoading()
        updateUi(data[0])
    }
}

    

const updateUi = (_single) => {
    let div = document.createElement("div");
    div.className = " container col-md-9 box_single";
    document.querySelector("#id_parent").append(div);
    const currencyArray = Object.values(_single.currencies);
    let currencies = `${currencyArray[0].name} ${currencyArray[0].symbol}`
    const languages_ar = Object.values(_single.languages);
    const languages = languages_ar.join();
    div.innerHTML =
        `
        <article class=" shadow  row justify-content-between h-80 center m-auto main mt-5">
        <div class=" col-md-6 m-2 overflow-hidden ">
            <img class="img-fluid border border-dark img-country width="100% height="100%" src="${_single.flags.png}" alt="${_single.name.common}" width="100%" >
        </div>
        <div class=" col-md-5 ms-2 text-start headline ">
        <h3>${_single.name.common} </h3>
       <p> Population: <strong> ${(Math.floor((_single.population / 1000000) * 100) / 100).toLocaleString(2)}M</strong></p>  
          
        <p>Region: <strong>${_single.region}</strong></p>
        <p>Language:<strong> ${languages}</strong></p>
        <p>Currency: <strong>${currencies} </strong></p>
        <p>Capital: <strong>${_single.capital}</strong></p>
        <p id="id_borders">borders: </p>
    </div>
        <iframe class="col-md-6 my-5" 
        width="200px" 
        height="200px"
        frameborder="0" 
        scrolling="no" 
        marginheight="0" 
        marginwidth="0" 
        src="https://maps.google.com/maps?q=${_single.latlng[0]},${_single.latlng[1]}&hl=en&z=5&amp;output=embed"
        >
    </iframe>
    <div>
    <button class="home_btn  btn btn-secondary"><i class="fa fa-home" aria-hidden="true"></i></button>
   
</div>
    </article>
 
</div>

`

    let borders = document.querySelector("#id_borders")
    if (_single.borders) {
        console.log(_single.borders)
        _single.borders.forEach((item, i) => {

            let border = document.createElement("span")
            border.className = "text-primary";
            border.style.cursor = "pointer";
            if (item != "PSE") {
                border.innerHTML = i !== _single.borders.length - 1 ? `${item}, ` : `${item}`
                borders.append(border);
            }
            border.addEventListener("click", () => {
                doApiByCode(item);
            })
        })
    }
    else {
        document.querySelector("#id_borders").innerHTML = "borders :<strong>None</strong>"
    }
    let btn = div.querySelector(".home_btn");
    btn.addEventListener("click", () => {
        history.back();
    })
}



const showLoading = () => {
    document.querySelector("#id_loading").style.display = "block";
    document.querySelector("#id_parent").style.display = "none";
}

const hideLoading = () => {
    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_parent").style.display = "flex";
}


init();



