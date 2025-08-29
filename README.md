# Proyecto: Grafo de Barrios y Calles

Este proyecto es un programa en *JavaScript* que simula una ciudad con *barrios* y *calles* usando un *grafo*.  
Cada barrio es un *nodo* y cada calle es una *arista* (con peso opcional que representa distancia o costo).  

El programa incluye operaciones básicas de grafos como: agregar, eliminar, buscar caminos y calcular rutas más cortas.

---

## 🚀 Funcionalidades

- *Agregar barrio* → Se crean nodos para representar cada barrio.  
- *Agregar calle* → Conecta dos barrios, puede tener un peso (ejemplo: distancia).  
- *Eliminar barrio* → Borra un barrio y todas sus conexiones.  
- *Ver conexión directa* → Revisa si dos barrios están conectados directamente por una calle.  
- *BFS (Breadth First Search)* → Encuentra el camino más corto en un grafo SIN pesos.  
- *Dijkstra* → Encuentra el camino más corto en un grafo CON pesos.  
- *Barrio más conectado* → Busca cuál barrio tiene más calles conectadas.  
- *Cerrar calle* → Elimina una conexión específica entre dos barrios.  

---

## 📂 Estructura del código

El código está dividido en dos partes:

1. **Clase Grafo**
   - Contiene todos los métodos para trabajar con el grafo.  
   - Usa listas de adyacencia (this.ady) para guardar las conexiones.  

2. *Ejemplo de uso*
   - Se crea una ciudad.  
   - Se agregan barrios y calles.  
   - Se prueban los métodos (BFS, Dijkstra, conexiones, etc.).  

---

## 📝 Ejemplo de ejecución

```js
let ciudad = new Grafo();
ciudad.agregarCalle("A", "B", 2);
ciudad.agregarCalle("A", "C", 4);
ciudad.agregarCalle("B", "C", 1);
ciudad.agregarCalle("C", "D", 3);
ciudad.agregarCalle("D", "E", 1);

console.log("Camino BFS A→E:", ciudad.bfs("A","E"));
console.log("Camino Dijkstra A→E:", ciudad.dijkstra("A","E"));
console.log("Barrio más conectado:", ciudad.barrioMasConectado());
console.log("¿Existe conexión directa A-C?", ciudad.existeConexion("A","C"));

// simular cierre de calle
ciudad.cerrarCalle("C","D");
console.log("Después de cerrar C-D, camino A→E:", ciudad.dijkstra("A","E"));
