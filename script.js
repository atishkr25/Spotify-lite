console.log("Chaloooooo......");

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/Songs/");
    let results = await a.text();

    let parser = new DOMParser();
    let doc = parser.parseFromString(results, "text/html");

    let fileElements = doc.querySelectorAll("a"); 

    let mp3Files = [];

    fileElements.forEach(it => {
        let href = it.getAttribute("href");
        if (href.endsWith(".mp3")) {
            let fileName = decodeURIComponent(href.split("/").pop());  // clean name
            mp3Files.push(fileName);
        }
    });

    return mp3Files;
}


async function main() {
    //get the list of songs
    let Songs = await getSongs();
    console.log(Songs)

    let songUl = document.querySelector(".songList").getElementsByTagName('ul')[0];
    Songs.forEach(elem => {
        songUl.innerHTML = songUl.innerHTML + `<li>
                            <img class="invert music-icon" src="images/music.svg" alt="">
                            <div class="song-info">
                                <div class="song-Name">${elem.split("-")[0]}</div>
                                <div class="song-Artist">atish</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="images/play.svg" alt="">
                            </div>
        
                        </li>`;
    });

    //playing first song
    var audio = new Audio(Songs[10]);
    // audio.play();

    audio.addEventListener('loadeddata', () => {
        let duration  = audio.duration;
        console.log(duration);
    })      

}
main();
