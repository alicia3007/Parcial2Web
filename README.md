# Travel API - NestJS

## Descripción del proyecto

Esta API permite administrar planes de viaje y validar países utilizando la API pública de RestCountries.

El sistema implementa una estrategia de caché local:

- Primero busca el país en la base de datos SQLite.
- Si el país no existe, consulta la API externa RestCountries.
- Luego guarda el país localmente para futuras consultas.

La aplicación fue desarrollada utilizando:

- NestJS
- TypeORM
- SQLite
- Axios
- Class Validator

---

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

Si todo funciona correctamente, debe aparecer algo similar a:

```bash
Nest application successfully started
```

La API quedará ejecutándose en:

```bash
http://localhost:3000
```

---

# Arquitectura interna

La aplicación está dividida en dos módulos principales.

## CountriesModule

Este módulo se encarga de administrar la información de países.

Contiene:

- `Country Entity`
- `CountriesService`
- `RestcountriesProvider`

Este módulo NO expone endpoints públicos.

Su responsabilidad es:

1. Buscar un país en la base de datos local.
2. Si no existe, consultar la API externa RestCountries.
3. Guardar el país en SQLite.
4. Retornar la información del país.

---

## TravelPlansModule

Este módulo administra los planes de viaje.

Contiene:

- `TravelPlan Entity`
- `TravelPlansService`
- `TravelPlansController`
- DTOs de validación

Este módulo expone los endpoints públicos de la API:

- Crear plan
- Obtener todos los planes
- Obtener un plan por id
- Eliminar un plan

---

# Flujo de caché de países

Cuando un usuario crea un plan de viaje:

1. El cliente envía un código Alpha-3 del país.
   Ejemplo:

```json
"countryCode": "COL"
```

2. `TravelPlansService` llama a `CountriesService`.

3. `CountriesService` busca el país en SQLite.

4. Si el país ya existe:
   - Se reutiliza la información local.
   - No se consume la API externa.

5. Si el país NO existe:
   - Se consulta `https://restcountries.com`
   - Se obtiene la información del país.
   - El país se guarda en SQLite.
   - Luego se retorna.

Esto permite reducir llamadas externas y mejorar el rendimiento.

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
-d '{
  "title":"Viaje a Colombia",
  "startDate":"2025-06-01",
  "endDate":"2025-06-15",
  "countryCode":"COL"
}'
```

---

# Obtener todos los planes

### Endpoint

```http
GET /travel-plans
```

### Ejemplo CURL

```bash
curl http://localhost:3000/travel-plans
```

---

# Obtener un plan por ID

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

# Eliminar un plan

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

# Estructura del proyecto

```text
travel-api/
├── src/
│   ├── countries/
│   ├── travel-plans/
│   ├── app.module.ts
│   └── main.ts
├── .env
├── package.json
└── README.md
```

---

# Base de datos

La aplicación utiliza SQLite.

El archivo de base de datos se genera automáticamente:

```text
travel.db
```

Este archivo fue agregado al `.gitignore` para evitar subir datos locales al repositorio.

---

# Validaciones implementadas

La API valida:

- Campos obligatorios
- Formato de fechas YYYY-MM-DD
- Existencia válida del país mediante RestCountries
- Conversión automática de códigos Alpha-3 a mayúsculas

---

# Tecnologías utilizadas

- NestJS
- TypeScript
- SQLite
- TypeORM
- Axios
- Class Validator
- REST Countries API