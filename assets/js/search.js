document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("search-button");
    const resultsDiv = document.getElementById("results");
    let dictionary = [];

    // ✅ Adjust this if using GitHub Pages with a subdirectory
    const jsonPath = "/assets/dictionary.json";

    // 🔍 Fetch Dictionary JSON
    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            dictionary = data;
            console.log("✅ Dictionary loaded successfully:", dictionary);
        })
        .catch(error => {
            console.error("❌ Error loading dictionary:", error);
            resultsDiv.innerHTML = "<p style='color: red;'>Error loading dictionary.</p>";
        });

    // 🖊 Handle Search Button Click
    searchButton.addEventListener("click", function () {
        performSearch();
    });

    // 🖊 Allow pressing "Enter" to search
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    // 🔍 Search Function
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        resultsDiv.innerHTML = "";

        if (query.length === 0) {
            resultsDiv.innerHTML = "<p>Please enter a word to search.</p>";
            return;
        }

        console.log("🔍 Searching for:", query);

        const results = dictionary.filter(entry => 
            entry.word.toLowerCase().includes(query) // Search anywhere in the word
        );

        console.log("📋 Search results:", results);

        if (results.length > 0) {
            resultsDiv.innerHTML = results.map(entry =>
                `<div class="entry"><strong class="word">${entry.word}:</strong> ${entry.definition}</div>`
            ).join("");
        } else {
            resultsDiv.innerHTML = "<p>No results found.</p>";
        }
    }
});