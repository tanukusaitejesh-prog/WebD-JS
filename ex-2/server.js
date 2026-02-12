async function loadTiks() {
  let response = await fetch("tickets.json");
  const data = await response.json();
  tickets = data;
  handleSearch();
}

function filterTickets(data, searchTerm, status) {
  let result = data;
  if (searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    result = result.filter(ticket =>
      ticket.id.toLowerCase().includes(searchTerm) ||
      ticket.title.toLowerCase().includes(searchTerm)
    );
  }
  if (status !== "all") {
    result = result.filter(ticket =>ticket.status.toLowerCase() === status.toLowerCase()
    );
  }

  return result;
}

function sortTickets(data, sorty) {
  let result = data; 
  result.sort((a, b) => {
    if (sorty === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  return result;
}
function renderTickets(data) {
  const container = document.getElementById("ticketsContainer");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No tickets found</p>";
    return;
  }

  data.forEach(ticket => {
    const div = document.createElement("div");
    div.classList.add("ticket-card");

    div.innerHTML = `
      <h3>${ticket.title}</h3>
      <p><strong>ID:</strong> ${ticket.id}</p>
      <p><strong>Status:</strong> ${ticket.status}</p>
      <p><strong>Created:</strong> ${ticket.createdAt}</p>
    `;

    container.appendChild(div);
  });
}
function handleSearch() {
  const searchTerm = document.getElementById("searchInput").value;
  const status = document.getElementById("statusFilter").value;
  const sorty = document.getElementById("sortSelect").value;
  let filtered = filterTickets(tickets, searchTerm, status);
  let sorted = sortTickets(filtered, sorty);
  renderTickets(sorted);
}
document.getElementById("searchInput").addEventListener("input", handleSearch);
document.getElementById("statusFilter").addEventListener("change", handleSearch);
document.getElementById("sortSelect").addEventListener("change", handleSearch);
loadTiks();


