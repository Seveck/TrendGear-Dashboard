
### FASE I: INGENIERÍA Y MODELADO DE DATOS (Dataset Sintético)
Necesito generar un prototipo de información estructurado en formato PSV (Pipe-Separated Values) para evitar conflictos con comas en nombres o ciudades[cite: 1]. El dataset simulado debe representar operaciones de E-commerce para la tienda tecnológica "TrendGear"[cite: 1].

1.  **Atributos obligatorios del esquema (11 columnas):**
    *   **Customer ID:** Identificador único para cada registro[cite: 1].
    *   **Name:** Nombre del cliente para personalización[cite: 1].
    *   **Email:** Contacto utilizando dominios de prueba seguros (ej. mailinator.com o example.com)[cite: 1].
    *   **Product Purchased:** Artículo tecnológico adquirido[cite: 1].
    *   **Purchase Date:** Fecha de transacción en formato ISO YYYY-MM-DD[cite: 1].
    *   **Amount Spent ($):** Valor numérico de la compra[cite: 1].
    *   **Age:** Edad del cliente[cite: 1].
    *   **City:** Ubicación geográfica para logística[cite: 1].
    *   **Payment Method:** Método de pago normalizado (ej. "Credit Card")[cite: 1].
    *   **Last Login Date:** Fecha de última actividad en formato ISO[cite: 1].
    *   **Membership Status:** Nivel de lealtad del cliente[cite: 1].

2.  **Reglas estrictas de validación de integridad:**
    *   Rango de edad válido únicamente entre 13 y 100 años[cite: 1].
    *   Montos financieros de compra deben ser mayores o iguales a cero ($ >= 0)[cite: 1].
    *   La fecha de compra ("Purchase Date") debe ser anterior o igual al último inicio de sesión ("Last Login Date"), evitando cualquier fecha futura[cite: 1].
    *   Absoluta unicidad en los IDs de usuario[cite: 1].
    *   Valores categóricos perfectamente normalizados para evitar duplicidades por discrepancias de caja (ej. usar "Credit Card" de manera consistente)[cite: 1].

3.  **Entregable de esta fase:** Un script de Python que automatice la generación de este dataset sintético controlando las distribuciones estadísticas, listo para cargarse en Firebase Realtime Database[cite: 1].

---

### FASE II: MAQUETACIÓN ÁGIL Y DISEÑO UI/UX
Diseña la interfaz del Dashboard de TrendGear bajo una arquitectura de código segregado, separando estrictamente los archivos de HTML, CSS y JavaScript[cite: 1]. El diseño debe seguir estas directrices estéticas[cite: 1]:

*   **Esquema de Colores:** Fondo oscuro tecnológico (#1E1E1E) con un color de acento azul (#007BFF) para llamadas a la acción y botones[cite: 1].
*   **Tipografía:** Familia tipográfica Roboto para máxima legibilidad de los datos numéricos[cite: 1].
*   **Estructura del Layout:** Cabecera (Header), área de contenido principal (Main) y pie de página (Footer)[cite: 1].
*   **Navegación:** Menú completamente responsivo que se transforme en un sistema "hamburguesa" interactivo en dispositivos móviles[cite: 1].
*   **Contenedores de Datos:** Diseña las tarjetas (cards) y tablas dinámicas preparadas para recibir la inyección de datos desde el frontend[cite: 1].

---

### FASE III: LÓGICA DE INTEGRACIÓN CON FIREBASE
Desarrolla el script de JavaScript (JS vanilla) encargado de dar dinamismo a la interfaz mediante la inyección del dataset en el DOM[cite: 1]:

1.  **Fetch de Datos:** Implementa una función asíncrona (fetch) que apunte directamente a la URL de Firebase Realtime Database donde se aloja el dataset sintético[cite: 1].
2.  **Lógica de Renderizado:** Recorre el objeto de datos (mediante bucles como `forEach`) para generar plantillas dinámicas (Template Literals) de HTML e inyectarlas dinámicamente en los contenedores del Dashboard[cite: 1].
3.  **Formateo de Datos:** Asegúrate de que los montos financieros se muestren correctamente con su símbolo de moneda ($) y los decimales adecuados[cite: 1].
4.  **Control de Errores:** Implementa una estructura robusta para capturar y reportar errores de conexión o asincronía en la consola[cite: 1].

---

### Lo que necesito que generes en tu primera respuesta:
1.  El **script de Python** detallado para generar el dataset de prueba con las validaciones requeridas[cite: 1].
2.  La **arquitectura de archivos** recomendada para el frontend[cite: 1].
3.  El código **HTML5 semántico**, el archivo **CSS modular** (con variables y diseño responsivo) y el archivo **JavaScript** para la conexión asíncrona a Firebase y renderizado de tarjetas[cite: 1].
