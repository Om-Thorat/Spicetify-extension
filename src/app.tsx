import { io } from "socket.io-client";

function sleep(ms:number) {return new Promise(resolve => setTimeout(resolve, ms));}

async function main() {
  await sleep(200)
  const socket = io("http://127.0.0.1:443");
  socket.on("connect", () => {
    const engine = socket.io.engine;
    console.log(engine.transport.name);
    socket.emit("command",Spicetify.Queue.track.contextTrack.metadata.title)
  });
  socket.on("input", async(data) => {
    // console.log(data)
    switch(data){
      case "PlayPause":
        Spicetify.Player.togglePlay();
        socket.emit("command",Spicetify.Queue.track.contextTrack.metadata.title)
        break
      case "Next":
        Spicetify.Player.next();
        socket.emit("command",Spicetify.Queue.nextTracks[0].contextTrack.metadata.title)
        break
      case "Prev":
        Spicetify.Player.back();
        socket.emit("command",Spicetify.Queue.prevTracks.at(-1).contextTrack.metadata.title)
        break
      case "Shuffle":
        Spicetify.Player.toggleShuffle();
        socket.emit("command",Spicetify.Queue.track.contextTrack.metadata.title)
        break
      case "Repeat":
        Spicetify.Player.toggleRepeat();
        socket.emit("command",Spicetify.Queue.track.contextTrack.metadata.title)
        break
      case "getdata":
        socket.emit("command",Spicetify.Queue.track.contextTrack.metadata.title)
    }
  });
  // Try to make this work with the package structure
  // Spicetify.Player.addEventListener("songchange",()=>{
  //   console.log("HUH")
  //   socket.emit("command",Spicetify.Queue.track.contextTrack.metadata.title)
  // })
}

export default main;

