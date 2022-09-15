import { creatCountryList, showLoading, hideLoading,} from "./manager.js";
import { declareEvnets } from "./viewEvents.js";

const init = () => {
    doApi();
    declareEvnets(doApi)
}

const doApi = async () => {
    showLoading();
    let url = `https://restcountries.com/v3.1/all`;
    let resp = await fetch(url);
    let data = await resp.json();
    data =  data.filter(item =>
        item.name.common!="Palestine"
    )
    console.log(data)
    creatCountryList(data)

}

init();