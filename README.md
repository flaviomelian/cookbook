# CookBook- MVP

Proyecto simple para gestionar y compartir recetas entre usuarios, con app móvil en React Native y backend en Spring Boot.

---

## 🚀 Tecnologías

- **Frontend:** React Native (Expo)
- **Backend:** Spring Boot, Spring Security, JPA, PostgreSQL
- **Autenticación:** JWT
- **Comunicación:** API REST con JSON

---

## 🎯 Funcionalidades MVP

- Registro e inicio de sesión de usuarios.
- Visualización de recetas propias.
- Crear y editar recetas (título, ingredientes, pasos).
- Visualizar detalle de receta (paso a paso).
- Gestión básica de grupos y compartir recetas (lectura).

---

## 🧩 Estructura básica del backend

- Entidades: Usuario, Receta, Grupo.
- API REST para autenticación, recetas y grupos.
- Seguridad con JWT y control de acceso simple.

---

## 📱 Estructura básica del frontend (React Native)

- Páginas: Login, Registro, Lista de Recetas, Detalle Receta, Crear/Editar Receta.
- Navegación con React Navigation.
- Manejo de sesiones con AsyncStorage.
- Consumo de API con Axios.

---

## 🔧 Instalación y ejecución

### Backend

1. Clonar el repositorio y entrar en la carpeta backend.
2. Configurar `application.properties` con datos de base de datos.
3. Ejecutar con Maven o Gradle:

```bash
./mvnw spring-boot:run
