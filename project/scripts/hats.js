const pageHats = document.querySelector("#hats");
if (pageHats) {
  /* FETCH */
  // Declare a global empty array variable to store a list of hats
  var hatList = new Array();
  // Declare a global empty array variable to store a filtered list of hats
  var filteredHats = new Array();

  const elementList = addedElements().map(elem => elem.id);

  // Output function
  function output(hats) {
    hats.forEach((hat) => {
      let article = document.createElement("article");

      let btn = document.createElement("button");
      btn.setAttribute("data-id", hat.hatId);
      btn.addEventListener("click", addElement);

      //Block button if not in shopping cart
      if (elementList.includes(hat.hatId))
        btn.classList.add('added');

      let img = document.createElement("img");
      img.setAttribute("src", hat.imageUrl);
      img.setAttribute("alt", hat.hatName);

      let hatName = document.createElement("h3");
      hatName.textContent = hat.hatName;

      let hatPrice = document.createElement("h4");
      hatPrice.textContent = "$" + hat.hatPrice;

      article.appendChild(btn);
      article.appendChild(img);
      article.appendChild(hatName);
      article.appendChild(hatPrice);

      document.querySelector("#hats").appendChild(article);
    });
  }

  // Function to get data
  async function getHats() {
    const response = await fetch("data/hats.json");
    if (response.ok) {
      hatList = await response.json();
      output(hatList);
    }
  }

  getHats();

  // Declare a function named reset that clears all of the <article> elements from the HTML element with an ID of hats
  function reset() {
    document.querySelector("#hats").innerHTML = "";
  }

  // Declare a function named sortBy that does the following:
  // - Calls the reset function
  // - Sorts the global hat list by the currently selected value of the HTML element with an ID of sortBy
  // - Calls the output function passing in the sorted list of hats
  function sortBy() {
    reset();
    filterByPrice(false);

    let filter = document.querySelector("#sortBy").value;

    switch (filter) {
      case "hatNameAscending":
        output(
          filteredHats.sort((hat1, hat2) => {
            let hatName1 = hat1.hatName.toLowerCase();
            let hatName2 = hat2.hatName.toLowerCase();
            if (hatName1 < hatName2) return -1;
            else if (hatName1 > hatName2) return 1;
            else return 0;
          })
        );
        break;
      case "hatNameDescending":
        output(
          filteredHats.sort((hat1, hat2) => {
            let hatName1 = hat1.hatName.toLowerCase();
            let hatName2 = hat2.hatName.toLowerCase();
            if (hatName1 > hatName2) return -1;
            else if (hatName1 < hatName2) return 1;
            else return 0;
          })
        );
        break;
      case "hatPriceAscending":
        output(
          filteredHats.sort((hat1, hat2) => {
            let hatPrice1 = parseInt(hat1.hatPrice);
            let hatPrice2 = parseInt(hat2.hatPrice);
            if (hatPrice1 < hatPrice2) return -1;
            else if (hatPrice1 > hatPrice2) return 1;
            else return 0;
          })
        );
        break;
      case "hatPriceDescending":
        output(
          filteredHats.sort((hat1, hat2) => {
            let hatPrice1 = parseInt(hat1.hatPrice);
            let hatPrice2 = parseInt(hat2.hatPrice);
            if (hatPrice1 > hatPrice2) return -1;
            else if (hatPrice1 < hatPrice2) return 1;
            else return 0;
          })
        );
        break;
      default:
        // using ternary operators
        output(
          filteredHats.sort((hat1, hat2) =>
            hat1.hatName.toLowerCase() > hat2.hatName.toLowerCase()
              ? 1
              : hat2.hatName.toLowerCase() >
                hat1.hatName.toLowerCase()
              ? -1
              : 0
          )
        );
        break;
    }
  }

  function filterByPrice(print = true) {
      reset();

      filteredHats = [];

      document.querySelectorAll(".priceRange").forEach((checkbox) => {
          if (checkbox.checked) {
              const min = parseInt(checkbox.dataset.min);
              const max = parseInt(checkbox.dataset.max);

              const hats = hatList.filter(hat => {
                  return parseInt(hat.hatPrice) >= min && parseInt(hat.hatPrice) <= max;
              });

              filteredHats = filteredHats.concat(hats);
          }

      });

      if (filteredHats.length === 0)
        filteredHats = hatList;

      if (print)
        output(filteredHats)
  }

  function addElement(e) {
    if (!loggedIn)
      //If user is not logged in, send to Log In page
      window.location = "login.html";
    else {
      const btn = e.target;
      btn.classList.add('added');
      const elementId = btn.dataset.id;

      let elementList = addedElements();
      const elements = addedElements().map(elem => elem.id);

      //Add item if not in shopping cart
      if (!elements.includes(elementId)) {
        elementList.push({ id: elementId });

        saveElements(elementList);
        showBadge();
      }
    }
  }

  // Add a change event listener to the HTML element with an ID of sortBy that calls the sortBy function
  document.querySelector("#sortBy").addEventListener("change", sortBy);
  document.querySelector(".filtering").addEventListener("change", filterByPrice);
}

const pageAddedHats = document.querySelector("#hats-added");
if (pageAddedHats) {
  let elementList = addedElements().map(elem => elem.id);

  // Output function
  function output(hats) {
    hats.forEach((hat) => {
      if (elementList.includes(hat.hatId)) {
        let article = document.createElement("article");

        let div1 = document.createElement("div");

        let img = document.createElement("img");
        img.setAttribute("src", hat.imageUrl);
        img.setAttribute("alt", hat.hatName);

        div1.appendChild(img);

        let div2 = document.createElement("div");
        div2.classList.add("desc")

        let hatName = document.createElement("h3");
        hatName.textContent = hat.hatName;

        let hatPrice = document.createElement("h4");
        hatPrice.textContent = "$" + hat.hatPrice;

        div2.appendChild(hatName);
        div2.appendChild(hatPrice);

        let div3 = document.createElement("div");

        let btn = document.createElement("button");
        btn.textContent = "X";
        btn.setAttribute("data-id", hat.hatId);
        btn.setAttribute("title", "Remove");
        btn.addEventListener("click", removeElement);

        div3.appendChild(btn);

        article.appendChild(div1);
        article.appendChild(div2);
        article.appendChild(div3);

        document.querySelector("#hats-added").appendChild(article);
      }
    });
  }

  // Function to get data
  async function getHats() {
    const response = await fetch("data/hats.json");
    if (response.ok) {
      hatList = await response.json();
      elementList = addedElements().map(elem => elem.id);

      output(hatList);

      if (elementList.length > 0) {
        document.querySelector("#pay").classList.remove("hidden");
      } else {
        document.querySelector("#hats-added").innerHTML = "<div class='no-records'>No hats added</div>"
        document.querySelector("#pay").classList.add("hidden");
      }
    }
  }

  getHats();

  function removeElement(e) {
    if (!loggedIn)
      //If user is not logged in, send to Log In page
      window.location = "login.html";
    else {
      const btn = e.target;
      const elementId = btn.dataset.id;

      let elementList = addedElements().filter((elem) => elem.id != elementId);

      saveElements(elementList);
      showBadge();

      document.querySelector("#hats-added").innerHTML = "";
      getHats();
    }
  }
}

function addedElements() {
  let elementList = localStorage.getItem("added_elements");
  if (elementList) {
    elementList = JSON.parse(elementList);
  } else {
    elementList = [];
  }
  return elementList;
}

function saveElements(elements) {
  localStorage.setItem('added_elements', JSON.stringify(elements));
}

const badge = document.querySelector(".badge");

function showBadge() {
  const elements = addedElements().map(elem => elem.id);
  if (elements.length > 0) {
    badge.textContent = elements.length;
    badge.classList.add("active");
  } else {
    badge.textContent = '';
    badge.classList.remove("active");
  }
}

if (badge)
  showBadge();
