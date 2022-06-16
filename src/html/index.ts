export default class Html {
  private contentDom = document.querySelector<HTMLDivElement>("#content");
  constructor() {
    // this.AddLoadingBtn()
  }

  AddLoadingPage() {
    let l = new Array(240);
    this.contentDom!.innerHTML = `
            <div class="loadingScreen">
              <div class="pixel__container">

              </div>
                <div class="loadingScreen__buttons">
                  <button id="loadBtn" disabled>Enter World</button>
                  <button>Download PDF</button>
                </div>
            </div>
        `;
    for(let i =0; i < l.length; i++){
      document.querySelector(".pixel__container")!.innerHTML +="<div class='pixel'></div>"
    }
    const pixels = document.querySelectorAll(".pixel");
    for (let i =0;i< pixels.length; i++) {
      (pixels[i] as HTMLDivElement).style.animationDelay =
        Math.ceil(Math.random() * 5000)  + "ms";
    }
  }
  RemoveLoadingBtn() {
    this.contentDom!.innerHTML = "";
  }
}

// <svg width="513" height="709" viewBox="0 0 513 709" fill="none" xmlns="http://www.w3.org/2000/svg">
// <g id="undraw_winter_magic_-5-xu2 1">
// <g id="tree2">
// <path id="Vector" d="M513 443.901C513.094 639.333 398.282 707.618 256.627 707.688C253.336 707.69 250.062 707.654 246.803 707.581C240.238 707.441 233.741 707.142 227.313 706.683C99.4597 697.588 0.0872699 625.905 2.5737e-05 444.153C-0.0902655 256.063 237.42 18.5794 255.233 1.01974C255.248 1.01974 255.248 1.01974 255.264 1.00378C255.941 0.334567 256.287 0 256.287 0C256.287 0 512.906 248.484 513 443.901Z" fill="#272928"/>
// <path id="Vector_2" d="M247.277 677.799L341.025 545.15L247.047 692.356L246.803 707.581C240.238 707.441 233.741 707.142 227.313 706.683L237.326 511.166L237.246 509.653L237.419 509.366L238.371 490.891L144.015 343.412L238.647 477.051L238.886 480.969L246.45 333.248L165.663 180.841L247.429 307.288L255.233 1.0197L255.263 0.000457764L255.264 1.00374L254.058 242.528L334.348 146.739L253.721 263.328L251.659 395.597L326.645 268.627L251.37 415.044L250.224 488.592L359.049 311.851L249.811 514.25L247.277 677.799Z" fill="#8B8B8F"/>
// </g>
// </g>
// </svg>
