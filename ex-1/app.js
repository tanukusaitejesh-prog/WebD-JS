let orders = [];
const list = document.getElementById("order-list");
const details = document.getElementById("order-details");
fetch("orders.json").then(r => r.json()).then(d => {
    orders = d;
    for (let i = 0; i < orders.length; i++) {
      const div = document.createElement("div");
      div.className = "order-row";
      div.dataset.orderId = orders[i].orderId;

      let total = 0;
      for (let j = 0; j < orders[i].items.length; j++) {
        total += orders[i].items[j].qty * orders[i].items[j].price;
      }

      div.textContent =
        orders[i].orderId +" | " +orders[i].date +" | " +orders[i].customer.name +" | ₹" +total +" | " +orders[i].status;
        const badge = document.createElement("span");
        badge.className = "badge";
        if (orders[i].status === "DELIVERED") badge.className += " badge--delivered";
        else if (orders[i].status === "SHIPPED") badge.className += " badge--shipped";
        else if (orders[i].status === "PENDING") badge.className += " badge--pending";
        else if (orders[i].status === "CANCELLED") badge.className += " badge--cancelled";
        else badge.className += " badge--unknown";

badge.textContent = orders[i].status;

div.appendChild(badge);

        list.appendChild(div);
    }
  });

list.addEventListener("click", e => {
  const row = e.target.closest(".order-row");
  if (!row) return;
  const allRows =document.querySelectorAll(".order-row");
  for (let i = 0; i < allRows.length; i++) {
    allRows[i].classList.remove("selected");
  }

  row.classList.add("selected");

  const id = row.dataset.orderId;
  let order = null;

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].orderId === id) {
      order = orders[i];
      break;
    }
  }

  details.textContent = "";

  const h = document.createElement("h2");
  h.textContent = order.orderId;
  details.appendChild(h);

  const p1 = document.createElement("p");
  p1.textContent = order.customer.name + ", " + order.customer.city;
  details.appendChild(p1);

  const status = document.createElement("span");
  status.className = "badge";
  if (order.status === "DELIVERED") status.className += " badge--delivered";
  else if (order.status === "SHIPPED") status.className += " badge--shipped";
  else if (order.status === "PENDING") status.className += " badge--pending";
  else if (order.status === "CANCELLED") status.className += " badge--cancelled";
  else status.className += " badge--unknown";

status.textContent = order.status;
details.appendChild(status);


  const ul = document.createElement("ul");
  let grand = 0;

  for (let i = 0; i < order.items.length; i++) {
    const li = document.createElement("li");
    const line = order.items[i].qty * order.items[i].price;
    grand += line;
    li.textContent =order.items[i].name +" - " +order.items[i].qty +" x " +order.items[i].price +" = " +line;
    ul.appendChild(li);
  }

  details.appendChild(ul);

  const t = document.createElement("p");
  t.textContent = "Total: ₹" + grand;
  details.appendChild(t);
});
