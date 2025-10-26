const PORT = 3000

document.getElementById("formularioBuscar").addEventListener("submit", async (e) => {
    e.preventDefault()

    const nombre = document.getElementById("nombreBuscar").value
    const resultado = document.getElementById("resultado")

    try {
        const res = await fetch(`http://localhost:${PORT}/api/users?nombre=${nombre}`, {
            headers: {
                "Content-Type": "application/json", // Decimos que queremos JSON
            }
        })
        const datos = await res.json() // trasnformamos el json obtenido en json

        resultado.innerHTML = ""

        if(datos.length === 0){
            resultado.innerHTML = `<li> No se encontró ningun usuario </li>`
            return
        }

        datos.forEach((e) => {
            const li = document.createElement("li");
            li.textContent = `${e.nombre} - ${e.bio}`;
            resultado.appendChild(li);
        });

    } catch (error) {
       resultado.innerHTML = `<li>Error al conectar con el servidor</li>`
    }
})

document.getElementById("formularioCrearUsuario").addEventListener("submit", async (e) => {
    e.preventDefault()
        const resultadoUsuario = document.getElementById("resultadoUsuario")
        const nombre = document.getElementById("nombreCrear").value
        const bio = document.getElementById("bio").value
        const avatar = document.getElementById("avatarUrl").value
    try {
        const res = await fetch(`http://localhost:${PORT}/api/crearUsuario`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify ({
                nombre: nombre,
                bio: bio,
                avatarUrl: avatar
            })
        })
        
        const data = await res.json()

        const li = document.createElement("li");
        li.textContent = `Usuario "${data.usuario.nombre}" fue creado exitosamente`;
        resultadoUsuario.appendChild(li);

    } catch (error) {
        resultadoUsuario.innerHTML = `<li>Error al conectar con el servidor</li>`
    }
})

document.getElementById("formularioEliminar").addEventListener("submit", async (e) => {
    e.preventDefault()

    const id = document.getElementById("idEliminar").value
    const resultadoEliminar = document.getElementById("resultadoEliminar")

    try {
        const res = await fetch(`http://localhost:${PORT}/api/users/${id}`, {
            method: "DELETE"
        })
        const data = await res.json()

        const li = document.createElement("li");
        li.textContent = `El usuario con el id "${data.usuarioId.userId}" fue eliminado exitosamente`;
        resultadoEliminar.appendChild(li);

    } catch (error) {
        resultadoEliminar.innerHTML = `<li>Error al conectar con el servidor</li>`
    }
})