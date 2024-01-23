const details = document.querySelector(".details");
const id = new URLSearchParams(window.location.search).get("id");

const BASE_URL = "http://localhost:8020/ourOffer";

async function getData() {
  try {
    let res = await axios(`${BASE_URL}/${id}`);
    console.log(res.data);
    drawCard(res.data);
    cards = res.data;
  } catch (error) {
    console.log(error);
  }
}
getData();

function drawCard(data) {
  details.innerHTML = "";
  details.innerHTML = `
        <div class="card">
        <div class="cardImg">
          <img src="${data.image}" alt="" />
        </div>
        <div class="cardText">
          <h6>$${data.price}</h6>
          <h3>${data.name}</h3>
          <p>${data.description}</p>
        </div>
        <a class="btn btn-warning" href="main.html">Order Now!</a>
      </div>`;
}
