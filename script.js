// Grafo básico con lista de adyacencia
class Grafo {
    constructor() { 
        this.ady = {}; // aquí guardamos los barrios (cada barrio tendrá su lista de calles)
    }

    // agregar un barrio
    agregarBarrio(barrio) {
        if (!this.ady[barrio]) { // si el barrio no existe todavía
            this.ady[barrio] = []; // lo creo vacío (sin calles)
        }
    }

    // agregar calle (con peso opcional)
    agregarCalle(a, b, peso = 1) {
        this.agregarBarrio(a); // me aseguro que a exista
        this.agregarBarrio(b); // me aseguro que b exista
        this.ady[a].push({ nodo: b, peso: peso }); // le agrego la calle desde a hasta b
        this.ady[b].push({ nodo: a, peso: peso }); // y también desde b hasta a (porque el grafo es doble vía)
    }

    // eliminar barrio
    eliminarBarrio(barrio) {
        delete this.ady[barrio]; // borro el barrio del objeto
        for (let i in this.ady) { // recorro todos los demás barrios
            // quito todas las calles que iban a ese barrio
            this.ady[i] = this.ady[i].filter(v => v.nodo !== barrio);
        }
    }

    // ver si hay conexión directa
    existeConexion(a, b) {
        if (!this.ady[a]) return false; // si el barrio a ni existe
        return this.ady[a].some(v => v.nodo === b); // miro si b está en la lista de a
    }

    // BFS: camino más corto en calles sin peso
    bfs(origen, destino) {
        let cola = [[origen, [origen]]]; // cola con el nodo actual y el camino recorrido
        let visitados = new Set([origen]); // guardo los visitados para no repetir

        while (cola.length > 0) { // mientras tenga barrios por revisar
            let [actual, camino] = cola.shift(); // saco el primero
            if (actual === destino) return camino; // si llegué al destino devuelvo el camino

            for (let vecino of this.ady[actual]) { // recorro las calles que salen de aquí
                if (!visitados.has(vecino.nodo)) { // si no he ido a ese barrio
                    visitados.add(vecino.nodo); // lo marco como visitado
                    cola.push([vecino.nodo, [...camino, vecino.nodo]]); // lo meto en la cola con el camino actualizado
                }
            }
        }
        return null; // si no lo encontré regreso null
    }

    // Dijkstra: camino más corto con pesos
    dijkstra(origen, destino) {
        let dist = {}; // distancias mínimas desde origen
        let previo = {}; // para saber por dónde llegué
        let nodos = new Set(Object.keys(this.ady)); // todos los barrios

        // inicializo las distancias
        for (let n of nodos) {
            dist[n] = Infinity; // todo infinito al inicio
            previo[n] = null; // nadie los alcanza aún
        }
        dist[origen] = 0; // el origen tiene distancia 0

        // mientras queden barrios por revisar
        while (nodos.size > 0) {
            let u = null;
            // busco el barrio con menor distancia
            for (let n of nodos) {
                if (u === null || dist[n] < dist[u]) {
                    u = n;
                }
            }
            nodos.delete(u); // ya lo saco del conjunto

            // reviso a sus vecinos
            for (let vecino of this.ady[u]) {
                let alt = dist[u] + vecino.peso; // calculo nueva distancia
                if (alt < dist[vecino.nodo]) { // si es mejor que la que tenía
                    dist[vecino.nodo] = alt; // la actualizo
                    previo[vecino.nodo] = u; // y guardo por dónde vine
                }
            }
        }

        // reconstruyo el camino desde el destino hacia atrás
        let camino = [];
        let u = destino;
        while (u) { // mientras tenga nodos
            camino.unshift(u); // lo meto al inicio
            u = previo[u]; // sigo retrocediendo
        }
        return camino;
    }

    // barrio con más conexiones
    barrioMasConectado() {
        let max = null; // el barrio con más calles
        let cantidad = -1;
        for (let b in this.ady) {
            if (this.ady[b].length > cantidad) { // si tiene más que el máximo
                cantidad = this.ady[b].length; // lo actualizo
                max = b;
            }
        }
        return { barrio: max, conexiones: cantidad }; // devuelvo el barrio y cuántas calles tiene
    }

    // cerrar una calle
    cerrarCalle(a, b) {
        this.ady[a] = this.ady[a].filter(v => v.nodo !== b); // quito b de la lista de a
        this.ady[b] = this.ady[b].filter(v => v.nodo !== a); // quito a de la lista de b
    }
}

// -----------------------------
// Ejemplo de prueba
// -----------------------------
let ciudad = new Grafo(); // creo el grafo (mi ciudad)
ciudad.agregarCalle("A", "B", 2); // agrego una calle con peso 2
ciudad.agregarCalle("A", "C", 4); // calle A-C con peso 4
ciudad.agregarCalle("B", "C", 1); // calle B-C con peso 1
ciudad.agregarCalle("C", "D", 3); // calle C-D con peso 3
ciudad.agregarCalle("D", "E", 1); // calle D-E con peso 1

console.log("Camino BFS A→E:", ciudad.bfs("A","E")); // pruebo el BFS (camino más corto sin pesos)
console.log("Camino Dijkstra A→E:", ciudad.dijkstra("A","E")); // pruebo Dijkstra (con pesos)
console.log("Barrio más conectado:", ciudad.barrioMasConectado()); // miro cuál tiene más calles
console.log("¿Existe conexión directa A-C?", ciudad.existeConexion("A","C")); // reviso si A y C están conectados directo

// simular cierre de calle
ciudad.cerrarCalle("C","D"); // cierro la calle C-D
console.log("Después de cerrar C-D, camino A→E:", ciudad.dijkstra("A","E")); // pruebo otra vez el camino
