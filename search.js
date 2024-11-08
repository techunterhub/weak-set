const pendingRequests = new WeakSet();

async function fetchSuggestions(queryObject) {
    if (pendingRequests.has(queryObject)) {
        console.log("Query is already in progress...");
        return;
    }

    pendingRequests.add(queryObject);
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const users = await response.json();

        // Filter the users to include only those whose name includes the query
        const filteredSuggestions = users.filter(user => 
            user.name.toLowerCase().includes(queryObject.query.toLowerCase())
        );

        displaySuggestions(filteredSuggestions);
        return filteredSuggestions;
    } finally {
        pendingRequests.delete(queryObject);
    }
}

function displaySuggestions(suggestions) {
    const suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = "";

    if (suggestions.length === 0) {
        suggestionsContainer.innerHTML = "<p>No results found</p>";
        return;
    }

    suggestions.forEach(suggestion => {
        const div = document.createElement("div");
        div.classList.add("suggestion");
        div.textContent = suggestion.name;
        suggestionsContainer.appendChild(div);
    });
}

document.getElementById("search-box").addEventListener("input", (event) => {
    const query = event.target.value.trim();
    if (!query) {
        document.getElementById("suggestions").innerHTML = "";
        return;
    }

    const queryObject = { query };
    fetchSuggestions(queryObject);
});
