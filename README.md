# Travel API - NestJS

## Descripción del proyecto

Esta API permite administrar planes de viaje y validar países utilizando la API pública de RestCountries.

El sistema implementa una estrategia de caché local:

- Primero busca el país en la base de datos SQLite.
- Si el país no existe, consulta la API externa RestCountries.
- Luego guarda el país localmente para futuras consultas.

# Instalación del proyecto

## 1. Clonar el repositorio

```bash
git clone https://github.com/alicia3007/Parcial2Web.git
```

---

## 2. Entrar al proyecto

```bash
cd Parcial2Web/travel-api
```

---

## 3. Instalar dependencias

```bash
npm install
```

---

## 4. Instalar dependencias necesarias para SQLite

```bash
npm install sqlite3
```

---

## 5. Ejecutar el proyecto

```bash
npm run start:dev
```

La API quedará ejecutándose en:

```bash
http://localhost:3000
```

---

# Arquitectura interna

La aplicación está dividida en cuatro módulos principales (dos en el preparcial y los otros realizados durante el parcial).

## CountriesModule

Este módulo se encarga de administrar la información de países.


Su responsabilidad es buscar un país en la base de datos local, si no existe, consultar la API externa RestCountries, guardar el país en SQLite y retornar la información del país.

---

## TravelPlansModule

Este módulo administra los planes de viaje.

Este módulo expone los endpoints públicos de la API, crear plan, obtener todos los planes, obtener un plan por id y eliminar un plan

---

## MiddlewareModule

Este modulo se encarga de verificar quien hizo la petición, a qué ruta entró y el método HTTP que utilizó. La forma de verificar que este módulo funciona es por medio de verificar que en la terminal donde se encuentra ejecutando la aplicación, aparezcan estas informaciones dadas por el middleware (npm run start:dev). 

---

## UsersModule 

Este modulo se encarga de darle un "dueño" a los planes de viaje, con el fin de verificar quien lo creó, a quién le pertenece y quien debería administrarlo. 

---

# Endpoints disponibles

## Crear plan de viaje

### Endpoint

```http
POST /travel-plans
```

### Ejemplo JSON para Postman

```json
{
  "title": "Viaje a Colombia",
  "startDate": "2025-06-01",
  "endDate": "2025-06-15",
  "countryCode": "COL"
}
```

### Ejemplo CURL

```bash
curl -X POST http://localhost:3000/travel-plans \
  -H "Content-Type: application/json" \
  -H "x-user-id: 1" \
  -d '{"title": "Viaje a Colombia", "startDate": "2025-06-01", "endDate": "2025-06-10", "countryCode": "CO", "userId": 1}'
```

---

## Obtener todos los planes

### Endpoint

```http
GET /travel-plans
```

### Ejemplo CURL

```bash
curl http://localhost:3000/travel-plans
```

---

## Obtener un plan por ID

### Endpoint

```http
GET /travel-plans/:id
```

### Ejemplo

```http
GET /travel-plans/1
```

### Ejemplo CURL

```bash
curl http://localhost:3000/travel-plans/1
```

---

## Eliminar un plan

### Endpoint

```http
DELETE /travel-plans/:id
```

### Ejemplo

```http
DELETE /travel-plans/1
```

### Ejemplo CURL

```bash
curl -X DELETE http://localhost:3000/travel-plans/1
```

---

## Crear un usuario

### Ejemplo CURL

```
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan", "email": "juan@test.com"}'
```

## Crear un plan de viaje 

### Ejemplo CURL 

```
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan", "email": "juan@test.com"}'
```
---

## Agrega un gasto al plan

### Ejemplo CURL 

```
curl -X POST http://localhost:3000/travel-plans/1/expenses \
  -H "Content-Type: application/json" \
  -H "x-user-id: 1" \
  -d '{"description": "Hotel", "amount": 200, "category": "Alojamiento"}'
```

---

## Consulta el plan con los gastos

### Ejemplo CURL 

```
curl http://localhost:3000/travel-plans/1 \
```
---

## Prueba del usuario inexistente

### Ejemplo CURL

```
curl -X POST http://localhost:3000/travel-plans \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "startDate": "2025-06-01", "endDate": "2025-06-10", "countryCode": "CO", "userId": 999}'
```

---

## Expense inválido 

## Ejemplo CURL 

```
curl -X POST http://localhost:3000/travel-plans/1/expenses \
-H "Content-Type: application/json" \
-d '{
  "description":"",
  "amount":-10,
  "category":""
}'
```
---

## Pais inexistente

### Ejemplo CURL 

```
curl -X POST http://localhost:3000/travel-plans \
-H "Content-Type: application/json" \
-d '{
  "title":"Test",
  "startDate":"2025-06-01",
  "endDate":"2025-06-10",
  "countryCode":"XXX",
  "userId":1
}'
```

# Base de datos

La aplicación utiliza SQLite.

El archivo de base de datos se genera automáticamente, este es un archivo llamado travel.db.

Este archivo fue agregado al `.gitignore` para evitar subir datos locales al repositorio y seguir con la recomendación dada en el pie de página del parcial. 

---

# Reporte de Cambios

Los gastos fueron implementados como un arreglo embebido dentro de la entidad TravelPlan. Para agregar un nuevo gasto, el sistema busca el plan de viaje en la base de datos, convierte el campo expenses desde JSON a un arreglo de objetos, agrega el nuevo gasto y luego guarda nuevamente el arreglo actualizado en formato JSON dentro de la base de datos. 

LOS IDS PARA PARA LAS PRUEBAS DEBEN SER MODIFICADOS ACORDE A LO QUE SE ENCUENTRA (NO ALCANCÉ A REVISAR) YA QUE POR LAS PRUEBAS REALIZADAS DURANTE EL PARCIAL ESTO PUEDE FALLAR!
