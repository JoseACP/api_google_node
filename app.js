const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

// Definir directamente la clave de la API y el ID del motor de búsqueda
const API_KEY = 'AIzaSyCODK0saQZqsqBEj79K4LdHhfRnBCCtLMY';
const SEARCH_ENGINE_ID = 'b17fbdaa36fa64324';

app.get('/buscar_ciberseguridad', async (req, res) => {
    try {
        // Términos de búsqueda
        const search_query = 'ciberseguridad';

        // URL de la API de búsqueda personalizada de Google
        const url = 'https://customsearch.googleapis.com/customsearch/v1';

        // Parámetros de la solicitud HTTP
        const params = {
            q: search_query,
            key: API_KEY,
            cx: SEARCH_ENGINE_ID,
        };

        // Realizar la solicitud HTTP usando Axios
        const response = await axios.get(url, { params });

        // Obtener los resultados en formato JSON
        const results = response.data;

        // Estructura de datos para almacenar los resultados en formato JSON
        const json_data = { results: [] };

        // Verificar si hay resultados en la respuesta JSON
        if ('items' in results) {
            // Iterar sobre los primeros tres resultados
            for (let i = 0; i < Math.min(3, results.items.length); i++) {
                const result = results.items[i];
                const title = result.title;
                const snippet = result.snippet;
                const link = result.link;

                // Crear un objeto para cada resultado
                const result_data = {
                    Resultado: i + 1,
                    Título: title,
                    Enlace: link,
                    "Texto relacionado con el tema": snippet,
                };

                // Agregar el objeto al listado de resultados
                json_data.results.push(result_data);
            }
        }

        // Devolver la respuesta como JSON
        res.json(json_data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
