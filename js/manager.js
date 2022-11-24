import CountryClass from "./classCountry.js";

const allCountries = [];

export const creatCountryList = (_ar) => {
  hideLoading();

  let countries_ar = [
    "United States",
    "Israel",
    "Thailand",
    "France",
    "United Kingdom",
  ];

  let filter_ar = _ar.filter((item) => countries_ar.includes(item.name.common));
  allCountries.splice(0, _ar.length, ..._ar);

  document.querySelector("#id_row").innerHTML = "";
  filter_ar.forEach((item) => {
    let country = new CountryClass("#id_row", item);
    country.render();
  });
};
export const createCountryListValue = async (value) => {
  let arr = allCountries.filter((item) =>
    item.name.common.toLowerCase().includes(value.toLowerCase())
  );
  document.querySelector("#id_row").innerHTML = "";
  if (arr.length != 0) {
    arr.forEach((item) => {
      let country = new CountryClass("#id_row", item);
      country.render();
    });
  } else {
    document.querySelector("#id_row").innerHTML =
      "<h4 class=m-5>Country is not found.. </h4>";
  }
};

export const showLoading = () => {
  document.querySelector("#id_loading").style.display = "block";
  document.querySelector("#id_row").style.display = "none";
};

export const hideLoading = () => {
  document.querySelector("#id_loading").style.display = "none";
  document.querySelector("#id_row").style.display = "flex";
};
