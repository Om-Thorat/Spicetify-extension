import React from "react";
import "./css/base.css";
import Bar from "./components/Bar"

export default function App() {
  React.useEffect(() => {
    
    let d = document.getElementsByClassName(
      "vis_container"
    )[0] as HTMLDivElement;
    let bars = d.children
    let stop = false;
    Spicetify.Player.addEventListener("songchange", () => {
      stop = true;
      stop = false;
      renderFrame();
    });
    Spicetify.Player.addEventListener("songchange", () => {
      stop = true;
      stop = false;
      renderFrame();
    });
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    function getPromiseFromEvent(item, event:string) {
      return new Promise((resolve) => {
        const listener = () => {
          item.removeEventListener(event, listener);
          resolve("");
        }
        item.addEventListener(event, listener);
      })
    }
    function Bsearch (arr:Array, x:number) {
  
      let start=0, end=arr.length-1;
           
      while (start<=end){
   
          let mid=Math.floor((start + end)/2);
    
          if (x <= arr[mid].start +arr[mid].duration &&arr[mid].start <= x){console.log(mid);return mid;}
   
          else if (arr[mid].start + arr[mid].duration < x){
               start = mid + 1;
          }
          else{
               end = mid - 1;
          }
      }
    
      return 0;
  }
    async function renderFrame() {
      let e = await Spicetify.getAudioData();
      let a = e.segments;
      let songn = (Spicetify.Queue.track.contextTrack.metadata.title)
      for (let k = 0; k < a.length-1; k++) {
        let curr_time = Spicetify.Player.getProgressPercent()*e.track.duration
        console.log(a[k].start,curr_time,a[k+1].start,k,songn)
        if ( !(curr_time <= a[k+1].start && a[k].start <= curr_time) ){
          k = Bsearch(a,curr_time)
          console.log(k)
        } 
        if (stop == true) {
          break
        } else if (!Spicetify.Player.isPlaying()) {
          await getPromiseFromEvent(Spicetify.Player,"onplaypause")
        }
        console.log("running ...");
        for (let i = 0; i < 12; i++) {
          let u = bars[i] as HTMLDivElement
          u.style.transition = `all ${a[k].duration * 1000}ms`
          u.style.height = `${a[k].pitches[i] * 70}%`
        }
        await sleep(a[k].duration * 1000);
      }
      return
    }
    renderFrame()
  }, []);

  return (
    <div className="vis_container">
      <Bar></Bar>
      <Bar></Bar>
      <Bar></Bar>
      <Bar></Bar>
      <Bar></Bar>
      <Bar></Bar>
      <Bar></Bar>
      <Bar></Bar>
      <Bar></Bar>
      <Bar></Bar>
      <Bar></Bar>
      <Bar></Bar>
    </div>
  );
}
