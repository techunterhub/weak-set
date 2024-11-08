const pendingRequests = new WeakSet();

async function fetchProductDetails(product) {
    if (pendingRequests.has(product)) {
        console.log(`Product ${product.id} details are already loading...`);
        return;
    }

    pendingRequests.add(product);
    const detailsContainer = document.getElementById("product-details");

    try {
        console.log(`Fetching details for product ${product.id}...`);
        
        // Simulate API call with a timeout (could be replaced with an actual API call)
        await new Promise(resolve => setTimeout(resolve, 1000));

        const productData = {
            id: product.id,
            name: `Product ${product.id}`,
            description: "This is a detailed description of the product.",
            price: "$" + (Math.random() * 100).toFixed(2)
        };

        detailsContainer.innerHTML = `
            <h3>Details for Product ${productData.id}</h3>
            <p>Name: ${productData.name}</p>
            <p>Description: ${productData.description}</p>
            <p>Price: ${productData.price}</p>
        `;

        console.log(`Details loaded for product ${product.id}`);
        return productData;
    } finally {
        pendingRequests.delete(product);
    }
}

document.querySelectorAll(".product-button").forEach(button => {
    button.addEventListener("click", (event) => {
        const productId = event.target.getAttribute("data-product-id");
        const product = { id: productId };
        
        // Add loading state to button
        event.target.classList.add("loading");
        event.target.disabled = true;

        fetchProductDetails(product).then(() => {
            // Remove loading state after the request completes
            event.target.classList.remove("loading");
            event.target.disabled = false;
        });
    });
});
