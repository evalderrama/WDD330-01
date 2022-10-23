const links = [
  {
    label: "Week 1 notes",
    url: "week1/index.html"
  },
  {
    label: "Week 2 notes",
    url: "week2/index.html"
  },
  {
    label: "Week 3 notes",
    url: "week3/index.html"
  },
  {
    label: "Week 4 notes",
    url: "week4/index.html"
  },
  {
    label: "Week 5 notes",
    url: "week5/index.html"
  }
]

//Link array
console.log(links)

//Create table of contents
const olList = document.querySelector('ol');
links.forEach((linkInfo) => {
  //Create li element
  let liElement = document.createElement("li");

  //Create link
  let linkElement = document.createElement("a");
  linkElement.textContent = linkInfo.label;
  linkElement.setAttribute('href', linkInfo.url);
  console.log(linkElement)

  //Add link to li element
  liElement.appendChild(linkElement);
  console.log(liElement)

  //Add li element to list
  olList.appendChild(liElement);
});