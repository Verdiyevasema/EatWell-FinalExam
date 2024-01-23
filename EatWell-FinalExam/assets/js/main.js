const cards = document.querySelector(".cards");
const card = document.querySelector(".card");
let limit = 3;
let arr = [];
let data = [];
let copyData = [];

const BASE_URL = "http://localhost:8020";

async function getData() {
  try {
    let res = await axios(`${BASE_URL}/ourOffer`);
    console.log(res.data);
    drawCard(res.data);
    data = res.data;
    arr = res.data;
    copyData = res.data;
  } catch (error) {
    console.log(error);
  }
}
getData();

function drawCard(data) {
  cards.innerHTML = "";
  data.forEach((el) => {
    cards.innerHTML += `
        <div class="card">
        <div class="cardImg">
          <img src="${el.image}" alt="" />
        </div>
        <div class="cardText">
          <h6>$${el.price}</h6>
          <h3>${el.name}</h3>
          <p>${el.description}</p>
        </div>
        <a class="btn btn-warning" href="details.html?id=${el.id}">Order Now!</a>
      </div>`;
  });
}
