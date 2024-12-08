document.addEventListener("DOMContentLoaded", async () => {
    const apiUrl = "https://cors-anywhere.herokuapp.com/https://d3b6-190-83-98-214.ngrok-free.app/agricola";

    try {
        const response = await fetch(apiUrl, { mode: "cors" });
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        // Obtener los datos JSON de la respuesta
        const data = await response.json();
        console.log('Data received:', data); // Log para verificar los datos

        // Mostrar los productos
        displayProducts(data);
    } catch (error) {
        console.error('Error:', error.message);
        // Mostrar el error en el UI
        displayError(error.message);
    }
});

// Función para mostrar los productos
function displayProducts(products) {
    const container = document.getElementById("product-container");
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos productos

    // Recorrer los productos y crear tarjetas de producto
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product";

        // Crear la imagen del producto
        const img = document.createElement("img");
        img.src = product.Foto ? `data:image/png;base64,${product.Foto}` : 'default-image.png'; // Imagen por defecto si no existe
        img.alt = `Imagen de ${product.Nombre}`;
        
        // Crear el nombre del producto
        const name = document.createElement("h2");
        name.textContent = product.Nombre;
        
        // Crear la descripción del producto
        const description = document.createElement("p");
        description.textContent = product.Descripcion;
        
        // Crear el precio del producto
        const price = document.createElement("p");
        price.textContent = `Precio: $${product.Precio}`;
        
        // Agregar los elementos a la tarjeta
        productCard.appendChild(img);
        productCard.appendChild(name);
        productCard.appendChild(description);
        productCard.appendChild(price);
        
        // Agregar la tarjeta al contenedor de productos
        container.appendChild(productCard);
    });
}

// Función para mostrar mensajes de error
function displayError(message) {
    const container = document.getElementById("product-container");
    container.innerHTML = `<p style="color:red;">Error: ${message}</p>`;
}
