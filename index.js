var textWrapper = document.querySelector(".ml2");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime.timeline({ loop: false }).add({
  targets: ".ml2 .letter",
  scale: [4, 1],
  opacity: [0, 1],
  translateZ: 0,
  easing: "easeOutExpo",
  duration: 950,
  delay: (el, i) => 70 * i,
});

var textWrapper = document.querySelector(".ml11 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /([^\x00-\x80]|\w)/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: false })
  .add({
    targets: ".ml11 .line",
    scaleY: [0, 1],
    opacity: [0.5, 1],
    easing: "easeOutExpo",
    duration: 700,
  })
  .add({
    targets: ".ml11 .line",
    translateX: [
      0,
      document.querySelector(".ml11 .letters").getBoundingClientRect().width +
        10,
    ],
    easing: "easeOutExpo",
    duration: 700,
    delay: 100,
  })
  .add({
    targets: ".ml11 .letter",
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: "-=775",
    delay: (el, i) => 34 * (i + 1),
  });

//   const swiper = new Swiper('.swiper', {
//     // Optional parameters
//     direction: 'vertical',
//     loop: true,

//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//     },

//     // Navigation arrows
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },

//     // And if we need scrollbar
//     scrollbar: {
//       el: '.swiper-scrollbar',
//     },
//   });

let topCoins = document.getElementById("topCoins");

window.addEventListener("load", async () => {
  let exRate = await getData(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr"
  );
  console.log(exRate);

  let coins = await getData("https://api.coingecko.com/api/v3/search/trending");

  console.log(coins);
  topCoinsDisplay(coins.coins, exRate.bitcoin.inr);
});

async function getData(url) {
  let response = await fetch(url);
  let result = await response.json();
  return result;
}

function topCoinsDisplay(coins, exRate) {
  coins.forEach((element) => {
    let coinDiv = document.createElement("div");

    let coinLogo = document.createElement("img");
    coinLogo.src = element.item.thumb;
    coinLogo.classList.add("coinLogo");

    let coinInfo = document.createElement("div");

    let coinName = document.createElement("h2");
    coinName.innerText = element.item.name + "( " + element.item.symbol + " )";
    coinInfo.append(coinName);

    let coinPrice = document.createElement("p");
    let tm = "₹ " + calculatePrice(element.item.price_btc, exRate);
    coinPrice.innerText = tm;
    coinInfo.append(coinPrice);

    coinDiv.append(coinLogo, coinInfo);
    coinDiv.classList.add("oneCoin", "carousel-cell");
    topCoins.append(coinDiv);
  });
}

function calculatePrice(a, b) {
  return Math.round(a * b * 10000) / 10000;
}
