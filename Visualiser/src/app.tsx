import React from "react";
import Vis from "./components/Vis";
import Anim from "./components/Anim";
async function main() {
  while (!Spicetify.Platform) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  new Spicetify.Topbar.Button("Visualiser", "download", toggle);
  let main = document.querySelector("#main")
  let con = document.querySelector("#main > div > div.Root__top-container > div.Root__main-view > div.main-view-container > div.os-host > div.os-padding > div > div")
  function toggle(){
    console.log("BRUH")
    if (main?.getAttribute("data-page") != "/vis"){
      main?.setAttribute("data-page","/vis")
      let w = document.createElement("div")
      w.id = "Visualiser"
      w.classList.add("vis_con")
      console.log(Spicetify.ReactDOMServer.renderToString(<Vis></Vis>))
      w.innerHTML = Spicetify.ReactDOMServer.renderToString(<Vis></Vis>)
      con?.appendChild(w)
      Anim()
    }
    else{
      document.getElementById("Visualiser")?.remove()
      main.setAttribute("data-page","/")
    }
  }
}

export default main;
