# Manual de Usuario: Crystal Cove Resort App

¡Bienvenido a la aplicación oficial de **Crystal Cove Resort**! Este manual te guiará paso a paso para utilizar todas las funcionalidades del sistema, tanto si eres un huésped buscando la escapada perfecta, como si eres un administrador gestionando el complejo.

---

## Índice
1. [Instalación de la Aplicación](#1-instalación-de-la-aplicación)
2. [Registro e Inicio de Sesión](#2-registro-e-inicio-de-sesión)
3. [Explorando el Resort (Huéspedes)](#3-explorando-el-resort-huéspedes)
4. [Reserva y Pago de Habitaciones](#4-reserva-y-pago-de-habitaciones)
5. [Tus Reservas y Código QR](#5-tus-reservas-y-código-qr)
6. [Modo Administrador (Recepción y Dashboard)](#6-modo-administrador-recepción-y-dashboard)

---

## 1. Instalación de la Aplicación
Dado que esta aplicación se distribuye de forma privada (APK):
1. Descarga el archivo `.apk` proporcionado por la administración.
2. Abre el archivo descargado en tu teléfono Android.
3. Si el teléfono te solicita permisos para "Instalar aplicaciones de orígenes desconocidos", acepta y continúa.
4. Una vez instalada, busca el ícono dorado de **Crystal Cove** en tu menú y abre la aplicación.

---

## 2. Registro e Inicio de Sesión
Al abrir la aplicación por primera vez, verás la pantalla de bienvenida.
* **Si eres un usuario nuevo:** Toca en "¿No tienes cuenta? Regístrate aquí". Llena el formulario con tu correo, una contraseña segura, tu nombre completo y número de teléfono. 
* **Si ya tienes cuenta:** Ingresa tu correo y contraseña en la pantalla principal y presiona "Iniciar Sesión".

> **Nota:** La aplicación mantendrá tu sesión abierta para mayor comodidad hasta que decidas cerrar sesión desde tu Perfil.

---

## 3. Explorando el Resort (Huéspedes)
Una vez dentro, entrarás al **Home (Inicio)**.
* **Navegación Inferior:** Utiliza la barra de navegación en la parte inferior para moverte entre las 4 secciones principales: *Inicio, Habitaciones, Reservas y Perfil.*
* **Inicio:** Aquí encontrarás galerías de imágenes de nuestras instalaciones, reseñas de otros huéspedes y acceso rápido a las actividades extra del resort (spa, yates, buceo, etc.).
* **Perfil:** En esta pestaña puedes revisar tus datos, modificar tu nombre y teléfono, y cerrar sesión cuando lo desees.

---

## 4. Reserva y Pago de Habitaciones
¡El proceso de reservar es completamente digital!
1. Dirígete a la pestaña de **Habitaciones** (el icono de la cama en el menú inferior).
2. Explora nuestro catálogo de suites y villas. Puedes ver fotos, descripción, precio por noche y amenidades incluidas.
3. Toca el botón **Reservar** en la habitación de tu preferencia.
4. Revisa los detalles de tu elección. Al final de la pantalla verás el botón azul "Confirmar Reserva y Pagar".
5. **Pago Seguro:** Se abrirá la pasarela de pagos de *Stripe*. Ingresa los datos de tu tarjeta de crédito o débito de forma totalmente segura.
6. Al procesarse el pago, la aplicación te confirmará el éxito y creará oficialmente tu reservación.

---

## 5. Tus Reservas y Código QR
Para ingresar al resort no necesitas llaves ni papeles, tu celular es tu acceso.
1. Ve a la pestaña de **Reservas** (el icono del calendario en el menú inferior).
2. Allí verás una lista con todas las reservaciones que has pagado.
3. Al tocar tu reservación activa, la pantalla se iluminará y mostrará un **Código QR**.
4. Muestra este código QR en la entrada o recepción del hotel para que te den acceso inmediato a tus instalaciones.

---

## 6. Modo Administrador (Recepción y Dashboard)
El sistema cuenta con herramientas exclusivas si el usuario que inicia sesión tiene el rol de `admin`.

### El Lector QR (Recepción)
Si eres parte del staff de recepción:
1. En la pestaña de Inicio o en el menú especial, accede a la herramienta **Escáner QR**.
2. Concede permiso a la cámara de tu teléfono.
3. Apunta la cámara al Código QR en la pantalla del teléfono del huésped.
4. El sistema verificará instantáneamente la base de datos y te mostrará la información de la reserva (Nombre, Teléfono, Habitación y Estado).
5. Podrás presionar **"Marcar En Estancia"** para registrar el Check-in, o **"Cancelar Reserva"** en caso de alguna anomalía.

### Dashboard Analítico (Gerencia)
El administrador tiene acceso a un Dashboard interactivo en tiempo real:
* **Métricas Clave:** Observa el número total de reservaciones, ingresos financieros totales (en MXN) y usuarios registrados.
* **Ocupación:** Revisa gráficas que muestran el porcentaje de habitaciones disponibles contra las habitaciones ocupadas.
* **Tiempo Real:** Gracias a la conexión directa con *Supabase*, si un cliente paga una reserva en este instante, los números y las gráficas del dashboard se actualizarán automáticamente frente a tus ojos sin necesidad de recargar la pantalla.

---
*Crystal Cove Resort - Documentación generada para la versión 1.0 (Android).*
