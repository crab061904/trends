let agentsData=[]
//fetching data from the api
const fetchAgents = async () => {
    try {
        const response = await fetch("https://valorant-api.com/v1/agents");

        console.log("Response status:", response.status); // Debugging
        console.log("Response object:", response); // Debugging

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        agentsData = data.data.filter(agent => agent.isPlayableCharacter);
        displayAgents(agentsData);
    } catch (error) {
        console.error("Error fetching agents:", error);
    }
};
//displaying all the agents
const displayAgents=(agents)=>{

    const container=document.getElementById("agentContainer");
    container.innerHTML="";
    document.getElementById("fullAgentContainer").classList.add("hidden")
    agents.forEach(agent=>{
        const card=document.createElement("div")
        card.className="agent-card";
        card.onclick = () =>showFullAgent(agent);
        card.innerHTML=`<h2>${agent.displayName}</h2>
        <img src="${agent.displayIcon}" alt="${agent.displayName}">
        `;
        container.appendChild(card)

        
    })
}
//displaying a single agent
const showFullAgent =(agent)=>{
    document.getElementById("agentContainer").classList.add("hidden")//hiding the agents container
    const fullAgentContainer = document.getElementById("fullAgentContainer");
    fullAgentContainer.classList.remove("hidden");//removing the hidden attribute
    document.getElementById("searchbar").classList.add("hidden");//hiding the search bar
    

    

    document.getElementById("fullAgentDetails").innerHTML = `
        
        <div class="details">
        <div class="left">
        <img src="${agent.fullPortrait}" alt="${agent.displayName}" class="pic">
        </div>
        <div class="right">
        <div><h2>${agent.displayName}</h2>  </div>
          <div><p class="descrip">${agent.description}</p>  </sdiv></div>
        </div>
    `;
}
//shows alll the agents again when the x button is clicked
function showAllAgents() {
    document.getElementById("agentContainer").classList.remove("hidden"); // Show all agents
    document.getElementById("fullAgentContainer").classList.add("hidden"); // Hide full agent view
    document.getElementById("searchbar").classList.remove("hidden");//remove the search bar disabling
    
}
//search function
function searchAgent() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filteredAgents = agentsData.filter(agent => agent.displayName.toLowerCase().includes(query));
    displayAgents(filteredAgents);
}

fetchAgents();

