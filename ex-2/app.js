let tickets=[];
let filteredtickets=[];
const searchInput =document.getElementById("searchInput");
const status = document.getElementById("statusFilter");
const sortval =document.getElementById("sortSelect");
let ticketc = document.getElementById("ticketCount");
let ticketcs=document.getElementById("ticketsContainer");
async function loadTiks(){
    let response = await fetch("tickets.json");
    const data = await response.json();
    tickets =data;
    applyFilters();
}

function applyFilters(){
    ticketcs.innerHTML = "";
    const searchterm = searchInput.value.toLowerCase();
    const selectstatus =status.value;
    const sorty = sortval.value;

    let result=[...tickets];
    if(searchterm){
        result=result.filter(ticket=>ticket.id.toLowerCase().includes(searchterm)||ticket.title.toLowerCase().includes(searchterm));

    }
    if(selectstatus!='all'){
        result=result.filter(ticket=>ticket.status==selectstatus);

    }
    result.sort((a,b)=>{
        if(sorty=='newest'){
            return new Date(b.createdAt)-new Date(a.createdAt);

        }
        else{
            return new Date(a.createdAt)-new Date(b.createdAt);
        }
    });

    filteredtickets=result;
    for(let i=0;i<filteredtickets.length;i++){
        const ticket = filteredtickets[i];
        const card = document.createElement("div");
        card.className="ticks";
        card.innerHTML=`
        <h3>${ticket.title}</h3>
        <p> <b>ID: </b>${ticket.id}</p>
        <p><b>Status: </b>${ticket.status}</p>
        <p><b>Priority: </b>${ticket.priority}</p>
        <p><b>Assignee: </b>${ticket.assignee}</p>`

        ticketcs.appendChild(card);

    }

    
}
searchInput.addEventListener("input",applyFilters);
status.addEventListener("change",applyFilters);
sortval.addEventListener("change",applyFilters);
loadTiks();
