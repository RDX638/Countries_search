import { createCountryListValue } from "./manager.js"
export const declareEvnets = (doApi) => {
    const input = document.querySelector("#id_input");
    const usa = document.querySelector("#id_usa");
    document.querySelector("#btnSearch").addEventListener("click", () => {
        createCountryListValue(input.value)
    })
 
    input.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            createCountryListValue(input.value)
        }
    })
}


