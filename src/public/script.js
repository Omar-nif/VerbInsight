document.getElementById("searchButton").addEventListener("click", async () => {
    const verb = document.getElementById("verbInput").value.trim();

    if (!verb) {
        alert("Por favor. escriba un verbo");
        return;
    }

    try {
        const response = await fetch(`/api/verbs/${verb}`)
        ;
        const data = await response.json();

        if (response.ok) {
            // Actualizamos los valores en la pagina
            document.getElementById("baseForm").textContent = data.base_form || "-";
            document.getElementById("pastSimple").textContent = data.past_simple || "-";
            document.getElementById("pastParticiple").textContent = data.past_participle || "_";
            document.getElementById("translation").textContent = data.translation || "-";
        } else {
            alert(data.message || "Verbo no encontrado");
        }

        verbInput.value = '';
        verbInput.focus();

    } catch (error) {
        console.error("Error al obtener el verbo:", error);
        alert("Pcurrio un error al coectar con el servidor.");
    }
    
});