document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const resultsDiv = document.getElementById("results");
    let dictionary = [];

    // ✅ Check the path: Change this if using GitHub Pages
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

    // 🖊 Handle User Input
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.trim().toLowerCase();
        resultsDiv.innerHTML = "";

        if (query.length === 0) {
            return; // Clear results if input is empty
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
    });
});