const toCurrency = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};
document.querySelectorAll(".price").forEach((node) => {
  node.textContent = toCurrency(node.textContent);
});

const $card = document.querySelector("#removeListener");
if ($card) {
  $card.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-course")) {
      const id = event.target.dataset.id;
      fetch("/card/remove/" + id, {
        method: "delete",
      }).then((res) => {
        res.json().then((card) => {
          if (card.courses.length) {
            const html = card.courses
              .map((c) => {
                return `
                <li class="collection-item avatar">
                <img class="circle" src="${c.img}" alt="img">
            
                <span class="title">${c.title}</span>
                <p class="price">${c.price}
                </p>
                <p class="secondary-content big">Count: ${c.count}</p>
                <button  class="btn btn-small right remove-course" data-id="${id}">Delete course</button>
              </li>
                `;
              })
              .join("");
            $card.innerHTML = html;
            document.querySelectorAll(".price").forEach((node) => {
              node.textContent = toCurrency(node.textContent);
            });
            document.querySelector("#price-inner").textContent = toCurrency(
              card.price
            );
          } else $card.innerHTML = "<p>Card is empty</p>";
        });
      });
    }
  });
}
