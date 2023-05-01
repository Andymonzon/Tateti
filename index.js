let cerrar = document.querySelectorAll(".close")[0]
let modal = document.querySelectorAll(".modal")[0]
let modalC = document.querySelectorAll(".modal-container")[0]
let modalTextos = document.querySelector(".modal-textos")
const x = document.querySelector(".x")
const o = document.querySelector(".o")
const btnReinicio = document.querySelector(".btn-reinicio")

const cuadros = document.querySelectorAll(".cuadro")

const cerrarModal = () => {
    cerrar.addEventListener("click", () => {
        modal.classList.add("modal-close")
        setTimeout(() => {
            modalC.style.visibility = "hidden"
        }, 500)
    })
    window.addEventListener("click", (e) => {
        if (e.target == modalC) {
            modal.classList.add("modal-close")
            setTimeout(() => {
                modalC.style.visibility = "hidden"
            }, 500)
        }
    })
}

let turno = "❌"
let tablero = []
if (turno === "❌") {
    x.style.backgroundColor = "#38f"
}

const btnPulsado = (e, index) => {
    const btn = e.target
    if (btn.innerHTML === "") {
        if (turno === "❌") {
            btn.innerHTML = "❌"
            modalTextos.innerHTML = `
            <h2 class="felicidades">Felicidades!</h2>
            <p class="ganador">ha ganado:</p>
            <h3 class="icono-ganador">❌</h3>
            `
            turno = "🔵"
        } else if (turno === "🔵") {
            btn.innerHTML = "🔵"
            modalTextos.innerHTML = `
            <h2 class="felicidades" >Felicidades!</h2>
            <p class="ganador" >ha ganado:</p>
            <h3 class="icono-ganador" >🔵</h3>
            `
            turno = "❌"
        }
    } else {
        return
    }

    tablero[index] = turno
    if (turno === "❌") {
        o.style.backgroundColor = "transparent"
        x.style.backgroundColor = "#38f"
    } else if (turno === "🔵") {
        x.style.backgroundColor = "transparent"
        o.style.backgroundColor = "#38f"
    }
    if (ganador()) {
        tablero = []
        cuadros.forEach((cuadro) => (cuadro.innerHTML = ""))
        confetti({
            zIndex: 2000,
        })
        modalC.style.visibility = "visible"
        modal.classList.remove("modal-close")
        turno = "❌"
        if (turno === "❌") {
            o.style.backgroundColor = "transparent"
            x.style.backgroundColor = "#38f"
        }
        cerrarModal()
    }
    console.log(tablero)
}

btnReinicio.addEventListener("click", () => {
    tablero = []
    cuadros.forEach((cuadro) => (cuadro.innerHTML = ""))
    turno = "❌"
    if (turno === "❌") {
        o.style.backgroundColor = "transparent"
        x.style.backgroundColor = "#38f"
    } else if (turno === "🔵") {
        x.style.backgroundColor = "transparent"
        o.style.backgroundColor = "#38f"
    }
})

const ganador = () => {
    if (tablero[0] === tablero[1] && tablero[0] === tablero[2] && tablero[0]) {
        return true
    } else if (
        tablero[3] === tablero[4] &&
        tablero[3] === tablero[5] &&
        tablero[3]
    ) {
        return true
    } else if (
        tablero[6] === tablero[7] &&
        tablero[6] === tablero[8] &&
        tablero[6]
    ) {
        return true
    } else if (
        tablero[0] === tablero[3] &&
        tablero[0] === tablero[6] &&
        tablero[0]
    ) {
        return true
    } else if (
        tablero[1] === tablero[4] &&
        tablero[1] === tablero[7] &&
        tablero[1]
    ) {
        return true
    } else if (
        tablero[2] === tablero[5] &&
        tablero[2] === tablero[8] &&
        tablero[2]
    ) {
        return true
    } else if (
        tablero[0] === tablero[4] &&
        tablero[0] === tablero[8] &&
        tablero[0]
    ) {
        return true
    } else if (
        tablero[2] === tablero[4] &&
        tablero[2] === tablero[6] &&
        tablero[2]
    ) {
        return true
    } else if (tablero.filter((celda) => celda !== undefined).length === 9) {
        // Si todas las celdas están ocupadas y no hay ganador, es un empate
        modalTextos.innerHTML = `
            <h2 class="felicidades">Empate!</h2>
            <p class="ganador">Intenta de nuevo</p>
            `
        modalC.style.visibility = "visible"
        modal.classList.remove("modal-close")
        turno = "❌"
        if (turno === "❌") {
            o.style.backgroundColor = "transparent"
            x.style.backgroundColor = "#38f"
        }
        cerrarModal()
        return true
    }
    return false
}

cuadros.forEach((cuadro, index) => {
    cuadro.addEventListener("click", (e) => btnPulsado(e, index))
})
