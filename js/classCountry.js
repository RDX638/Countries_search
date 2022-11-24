export default class CountryClass {
  constructor(_parent, _item) {
    this.parent = _parent;
    this.img = _item.flags.png || _item.flags.svg;
    this.name = _item.name.common;
    this.capital = _item.capital;
  }

  render() {
    let div = document.createElement("div");
    div.className = "col-md-4 p-3 countries ";
    document.querySelector(this.parent).append(div);
    div.innerHTML = `
        <article class="row shadow h-100 "style="cursor: pointer ;">
          <div class="h-50 p-0">
              <img src="${this.img}" alt="${this.name}" class="overflow-hidden" height="100%" width="100%">
          </div>
          <div class =" p-2 text-center ">
             <h5 class="m-0">${this.name}</h5>
             <p>Capital: ${this.capital}</p>
         </div>
        </article>
    `;
    div.addEventListener("click", () => {
      console.log(this.name);

      window.open(`singlecountry.html?name=${this.name}`, "_self");
    });
  }
}
