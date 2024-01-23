const searchInput = document.querySelector(".searchInput");
const sortPriceBtn = document.querySelector(".sortPriceBtn");
const sortNameBtn = document.querySelector(".sortNameBtn");
const form = document.querySelector("form");
const allInputs = document.querySelectorAll(".form-control");
const tbody = document.querySelector("tbody");
let arr;
let data = [];
let editId = null;
const BASE_URL = "http://localhost:8020";

async function getData() {
  try {
    let res = await axios(`${BASE_URL}/ourOffer`);
    console.log(res.data);
    drawCard(res.data);
    data = res.data;
    arr = res.data;
  } catch (error) {
    console.log(error);
  }
}
getData();

function drawCard(data) {
  tbody.innerHTML = "";
  data.forEach((el) => {
    tbody.innerHTML += `
            <tr>
              <td>${el.id}</td>
              <td><img src="${el.image}" width=100px/></td>
              <td>${el.price}</td>
              <td>${el.name}</td>
              <td>${el.description}</td>
              <td>
              <a class="btn btn-primary" href="#" onclick=editProduct("${el.id}")>Edit</a>
              <button class="btn btn-danger" onclick=deleteProduct("${el.id}",this)>Delete</button>
              </td>
            </tr>
         `;
  });
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    image: allInputs[0].value,
    price: allInputs[1].value,
    name: allInputs[2].value,
    description: allInputs[3].value,
  };
  if (!editId) {
    let res = await axios.post(`${BASE_URL}/ourOffer`, obj);
    drawCard(res.data);
  } else {
    axios.patch(`${BASE_URL}/ourOffer/${editId}`, obj);
  }
});

// SEARCH
searchInput.addEventListener("input", function (e) {
  let filtered = arr.filter((item) =>
    item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawCard(filtered);
});

// SORT PRICE
sortPriceBtn.addEventListener("click", function () {
  let sorted = [];
  if (this.innerText === "Ascending") {
    sorted = data.sort((a, b) => a.price - b.price);
    this.innerText = "Descending";
  } else if (this.innerText === "Descending") {
    sorted = data.sort((a, b) => b.price - a.price);
    this.innerText = "Ascending";
  }
  drawCard(sorted);
});

// SORT NAME
sortNameBtn.addEventListener("click", function () {
  let sorted = [];
  if (this.innerText === "Sort by name A") {
    sorted = data.sort((a, b) => (a.name < b.name ? -1 : 1));
    this.innerText = "Sort by name B";
  } else if (this.innerText === "Sort by name B") {
    sorted = data.sort((a, b) => (a.name < b.name ? 1 : -1));
    this.innerText = "Sort by name A";
  }
  drawCard(sorted);
});

// DELETE
async function deleteProduct(id, btn) {
  if (confirm("Silmek istediyinize eminsiniz?")) {
    btn.closest("tr");
    await axios.delete(`${BASE_URL}/ourOffer/${id}`);
  }
}

// EDIT
async function editProduct(id) {
  editId = id;
  let res = await axios(`${BASE_URL}/ourOffer/${id}`);
  allInputs[0].value = res.data.image;
  allInputs[1].value = res.data.price;
  allInputs[2].value = res.data.name;
  allInputs[3].value = res.data.description;
}
