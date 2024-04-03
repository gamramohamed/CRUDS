let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("Total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let creatBtn = document.getElementById("creatBtn");
let deleteAllDiv = document.getElementById("deleteAllDiv");
let tbody = document.getElementById("tbody");
let mood = "create";
let imp;

function Total() {
  if (
    price.value != "" &&
    price.value > 0 &&
    taxes.value >= 0 &&
    ads.value >= 0 &&
    discount.value >= 0
  ) {
    total.innerHTML =
      +price.value + +taxes.value + +ads.value - +discount.value;
    //   let result = +price.value + +taxes.value + +ads.value - +discount.value;
    //   total.innerHTML = result;
  } else {
    total.innerHTML = "";
  }
}

// create data
let proData;
if (localStorage.product != null) {
  proData = JSON.parse(localStorage.product);
} else {
  proData = [];
}
function create() {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (title.value != "" && price.value != "" && count.value < 100) {
    if (mood === "create") {
      if (count.value > 1) {
        for (let i = 0; i < newPro.count; i++) {
          proData.push(newPro);
        }
        
      } else {
        proData.push(newPro);
      }
    } else {
      proData[imp] = newPro;
      mood = "create";
      creatBtn.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  } else{
    alert('Product name* | Price* | count < 100')
  }

  // save data
  localStorage.product = JSON.stringify(proData);

  
  addData();
}

// Clear data after saving it
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
}

// read data in the table
function addData() {
  let newRow = "";
  for (let i = 0; i < proData.length; i++) {
    newRow += `
    <tr>
    <td>${i+1}</td>
    <td>${proData[i].title}</td>
    <td>${proData[i].price}</td>
    <td>${proData[i].taxes}</td>
    <td>${proData[i].ads}</td>
    <td>${proData[i].discount}</td>
    <td>${proData[i].total}</td>
    <td>${proData[i].category}</td>
    <td><button onclick="update(${i})">UPDATE</button></td>
    <td><button onclick="deleteData(${i})">DELETE</button></td>              
                 
  </tr>`;
  }
  tbody.innerHTML = newRow;

  // delete all btn
  if (proData.length > 2) {
    deleteAllDiv.innerHTML = `<button onclick="deleteAll()">DELETE ALL ( ${proData.length} )</button>`;
  } else {
    deleteAllDiv.innerHTML = "";
  }
}
addData();

// search
let searchMood = "Title";
let search = document.getElementById("search");
function getSearchMood(id) {
  if (id == "SearchByTitle") {
    searchMood = "Title";
  } else {
    searchMood = "Category";
  }
  search.focus();
  search.placeholder = "Search By " + searchMood;
  search.value = "";
  addData();
}

function searchData(value) {
  let newRow = "";
  for (let i = 0; i < proData.length; i++) {
    if (searchMood == "Title") {
      if (proData[i].title.includes(value)) {
        newRow += `
          <tr>
          <td>${i}</td>
          <td>${proData[i].title}</td>
          <td>${proData[i].price}</td>
          <td>${proData[i].taxes}</td>
          <td>${proData[i].ads}</td>
          <td>${proData[i].discount}</td>
          <td>${proData[i].total}</td>
          <td>${proData[i].category}</td>
          <td><button onclick="update(${i})">UPDATE</button></td>
          <td><button onclick="deleteData(${i})">DELETE</button>  </td>                   
          </tr>
        `;
      }
    } else {
      if (proData[i].category.includes(value)) {
        newRow += `
        <tr>
        <td>${i}</td>
        <td>${proData[i].title}</td>
        <td>${proData[i].price}</td>
        <td>${proData[i].taxes}</td>
        <td>${proData[i].ads}</td>
        <td>${proData[i].discount}</td>
        <td>${proData[i].total}</td>
        <td>${proData[i].category}</td>
        <td><button onclick="update(${i})">UPDATE</button></td>
        <td><button onclick="deleteData(${i})">DELETE</button>  </td>                   
        </tr>`;
      }
    }
  }
  tbody.innerHTML = newRow;
}

// update data
function update(i) {
  title.value = proData[i].title;
  price.value = proData[i].price;
  taxes.value = proData[i].taxes;
  ads.value = proData[i].ads;
  discount.value = proData[i].discount;
  category.value = proData[i].category;
  // delete count
  count.style.display = "none";
  creatBtn.innerHTML = "Update";
  mood = "update";
  imp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// delete All data
function deleteAll() {
  localStorage.clear;
  proData.splice(0);
  addData();
}

// delete data
function deleteData(i) {
  proData.splice(i, 1);
  localStorage.product = JSON.stringify(proData);
  addData();
}
