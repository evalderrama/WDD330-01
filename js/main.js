const links = [
  {
    label: "Week1 notes",
    url: "week1/index.html"
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