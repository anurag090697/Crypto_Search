var textWrapper = document.querySelector(".ml7 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml7 .letter",
    translateY: ["1.1em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    rotateZ: [180, 0],
    duration: 750,
    easing: "easeOutExpo",
    delay: (el, i) => 50 * i,
  })
  .add({
    targets: ".ml7",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

let currURL = new URL(window.location.href);
let params = new URLSearchParams(currURL.search);

if (!params.has("id")) {
  window.location.href = "coinSearch.html";
} else {
  getData(
    `https://api.coingecko.com/api/v3/coins/${params.get(
      "id"
    )}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  ).then((res) => {
    showDetailedInfo(res);
  });
}

let imgValue = document.getElementById("imgValue");
let coinHistory = document.getElementById("coinHistory");
let coinPic = document.getElementById("CoinPic");

let nameCoin = document.getElementById("nameCoin");
let coinChart = document.getElementById("coinChart");

let coinRs = document.getElementById("coinRs");
let dolCoin = document.getElementById("dolCoin");
let euroCoin = document.getElementById("euroCoin");
let pndCoin = document.getElementById("pndCoin");
let btcvalue = document.getElementById("btcvalue");

window.addEventListener("load", showDetailedInfo());

async function showDetailedInfo(data) {
//   let url = `https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
//   let data = await getData(url);
//   console.log(data);

  coinPic.src = data.image.large;

  nameCoin.innerHTML = data.name + " (" + data.symbol + ")";

  coinRs.innerText = " ₹ " + data.market_data.current_price.inr;
  dolCoin.innerText = " $ " + data.market_data.current_price.usd;
  euroCoin.innerText = " € " + data.market_data.current_price.eur;
  pndCoin.innerText = " £ " + data.market_data.current_price.gbp;
  btcvalue.innerText = " ₿ " + data.market_data.current_price.btc;

  let temp = `<p> ${data.description.en} </p>`;
  coinHistory.append(temp);
}

// 249231.3891

async function getData(url) {
  let response = await fetch(url);
  let result = await response.json();
  return result;
}
