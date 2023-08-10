export default function Anim() {
    let d = document.getElementsByClassName(
      "bar_container"
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
    function getPromiseFromEvent(item:any, event:string) {
      return new Promise((resolve) => {
        const listener = () => {
          item.removeEventListener(event, listener);
          resolve("");
        }
        item.addEventListener(event, listener);
      })
    }
    async function renderFrame() {
      let e = await Spicetify.getAudioData();
      let a = e.segments;
      for (let k = 0; k < a.length; k++) {
        console.log("running ...")
        if (stop == true) {
          return;
        } else if (!Spicetify.Player.isPlaying()) {
          await getPromiseFromEvent(Spicetify.Player,"onplaypause")
        }
        for (let i = 0; i < 12; i++) {
          let u = bars[i] as HTMLDivElement
          u.style.transition = `all ${a[k].duration * 1000}ms`
          u.style.height = `${a[k].pitches[i] * 200}px`
        }
        await sleep(a[k].duration * 1000);
      }
    }
  }