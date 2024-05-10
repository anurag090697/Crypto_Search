var textWrapper = document.querySelector(".ml2");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml2 .letter",
    scale: [4, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70 * i,
  })
  .add({
    targets: ".ml2",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

anime.timeline({ loop: false }).add({
  targets: ".ml15 .word",
  scale: [14, 1],
  opacity: [0, 1],
  easing: "easeOutCirc",
  duration: 1000,
  delay: (el, i) => 800 * i,
});

let inputName = document.getElementById("inputName");
let coinBtn = document.getElementById("coinBtn");
let searchResults = document.getElementById("searchResults");

coinBtn.addEventListener("click", searchedCoins);

async function searchedCoins() {
  let url = "https://api.coingecko.com/api/v3/search?query=" + inputName.value;
  let coinData = await getData(url);
  console.log(coinData);
  displaySearchedCoins(coinData.coins);
}

async function getData(url) {
  let response = await fetch(url);
  let result = await response.json();
  return result;
}

function displaySearchedCoins(arr) {
  arr.forEach((ele, index) => {
    let coinBox = document.createElement("div");

    let leftPart = document.createElement("div");

    let idx = document.createElement("h2");
    idx.innerText = index + 1 + ".";
    leftPart.append(idx);

    let logo = document.createElement("img");
    logo.src = ele.thumb;
    leftPart.append(logo);

    let naam = document.createElement("h1");
    naam.innerText = ele.name;
    leftPart.append(naam);

    let symbol = document.createElement("h1");
    symbol.innerText = ele.symbol;
    leftPart.append(symbol);

    coinBox.append(leftPart);

    let rightPart = document.createElement("div");

    let infoBtn = document.createElement("a");
    infoBtn.innerHTML = `<button class="button-35" role="button">More Info</button>`;
    infoBtn.href = "coin_Detail.html?id=" + ele.id;
    rightPart.append(infoBtn);

    coinBox.append(rightPart);
    coinBox.classList.add("coinBox");

    searchResults.append(coinBox);
  });
}
