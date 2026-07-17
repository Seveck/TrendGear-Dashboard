# TrendGear Dashboard 📊
**Proyecto de Integración: Datos Sintéticos + Web Dinámica + Firebase**

Este proyecto consiste en un dashboard administrativo e interactivo para **TrendGear**, una tienda ficticia de gadgets tecnológicos. El objetivo principal fue aprender a conectar una base de datos en tiempo real con una interfaz web responsive, utilizando inteligencia artificial como asistente de desarrollo a través de prompts estratégicos.

---

## 🛠️ Tecnologías Utilizadas
* **Backend / Datos:** Python (Script de generación y validación de datos sintéticos).
* **Base de Datos:** Firebase Realtime Database.
* **Frontend:** HTML5, CSS3 (Custom Properties, Grid, Flexbox) y JavaScript Vanilla (ES6+, Fetch API, Template Literals).

---

## 🚀 Prompts Clave y Proceso de Desarrollo
El desarrollo del proyecto no fue automático; se guio paso a paso mediante instrucciones específicas (prompts) para resolver problemas reales de diseño, lógica y bases de datos. 

A continuación se destacan los momentos clave que evaluará el docente:

### 1. Definición de Requerimientos y Preparación
> **Prompt Clave:** *"haz todo lo que el documento pide que hagas, pero antes de hacerlo, dime que es lo que necesitas"*

* **Por qué se hizo:** Para asegurar que la IA entendiera las limitaciones del entorno de pruebas antes de escribir código. Nos permitió identificar que la base de datos de Firebase debía crearse primero y definir la estructura exacta del dataset de 40 clientes con sus 11 columnas obligatorias y reglas de validación.

### 2. Depuración de la Conexión con Firebase
> **Prompt Clave:** *"opte por la opcion b, pero sigue sin mostrarme los datos en la pagina, apesar de que todo lo que estaba en el json que importe ya este en la base de datos"*

* **El problema:** La página se cargaba vacía (`null`).
* **La solución:** Al analizar la estructura de la base de datos, nos dimos cuenta de que el JSON se había importado en la raíz de Firebase, mientras que el código de JavaScript (`app.js`) buscaba los datos en el nodo `/customers`. Se ajustó la ruta del Fetch en JS para apuntar a la raíz (`/`), resolviendo el problema de inmediato.

### 3. Optimización para Dispositivos Móviles (Responsive Design)
> **Prompt Clave:** *"asi se ven, no se adapta muy bien la pagina desde la vista de un celular"*

* **El problema:** La tabla con las 11 columnas de datos se desbordaba horizontalmente en pantallas pequeñas, arruinando la experiencia de usuario.
* **La solución:** Mediante CSS (`@media`), transformamos la visualización en dispositivos móviles. En lugar de scroll lateral, la tabla se adaptó para mostrar cada registro de cliente como una **tarjeta vertical independiente**, organizada y fácil de leer.

### 4. Rediseño Visual y UI Personalizada
> **Prompt Clave:** *"el nav sigue sin adaptarse bien, ademas, cambiale el estilo a toda la pagina completa, algo completamente diferente a lo que esta ahorita"*

* **Por qué se hizo:** El estilo oscuro inicial era muy común. Buscábamos una identidad de marca única.
* **La solución:** Se rediseñó la interfaz con un estilo "recibo de compra / caja registradora". Se aplicó un fondo salvia claro, un header ciruela oscuro, acentos en mostaza y bordes festoneados (tipo ticket de compra) en los contenedores de datos.

### 5. Reestructuración Completa del Layout y Datos Completos
> **Prompt Clave:** *"quiero que reestructures toda la pagina, cambia la pagina completamente... ademas, en la tabla donde se muestran los usuarios quiero que muestre todos los datos que estan en el csv, todos, eso incluye correo, edad, ciudad..."*

* **Por qué se hizo:** Se requería un panel verdaderamente profesional y que se mostraran las 11 columnas del CSV original sin saturar la pantalla.
* **La solución:** Se reestructuró el layout para pasar de un scroll infinito a un **sistema de pestañas funcionales** (Resumen, Clientes y Estadísticas) controlado por JS. La tabla se expandió para mostrar todos los datos requeridos de forma limpia.

---

## 📈 Resultados del Dashboard
Al finalizar las iteraciones guiadas por los prompts, el dashboard cuenta con:
* **Sección Resumen:** KPIs automáticos (Ingresos totales, ticket promedio de compra y edad promedio de clientes).
* **Sección Clientes:** Tabla dinámica con buscador por nombre y correo, adaptable a formato tarjeta en móviles.
* **Sección Estadísticas:** Gráfica de distribución de clientes por su nivel de membresía (Bronze, Silver, Gold, Platinum).

---
*Proyecto desarrollado en formación como programador de software.*
