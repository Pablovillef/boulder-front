# Posible orden de tareas a implementar

Listo a continuación los casos de uso en un orden que me parece simple para su implementación.

## Modelo de datos / BD relacional con, al menos, vías

- Tener vías almacenadas (aunque, por ejemplo, subamos todas mediante inserts a la BD) parece un buen punto de comienzo.
- No veo necesario tener todos los campos de una vía ya en la BD. Por ejemplo, la lista de vídeos se puede dejar para más tarde.

## Comunicación frontend/backend

Que el frontend se comunique correctamente con el backend cuando el front está corriendo en el móvil y el backend está en un dispositivo distinto (pero en la misma red wifi).

## Leer vía mediante QR (cliente, trabajador)

- Si lo del QR funciona bien, pues hacer que un usuario (cliente o trabajador) pueda leer una vía. Como comentamos, la vista de la vía será similar para los dos, pero igual el trabajador tiene un botón extra de edición, por ejemplo.
- Esto incluiría ver los detalles básicos de una vía, en los que, como te comenté en el punto anterior, se podrían obviar los vídeos en una primera pasada.

## Implementar diferenciación vista cliente/trabajador

- En este punto podría ya pensarse en, mediante el login o mediante un par de botones temporales, separar las vistas de cliente y trabajador. Esto nos permitirá ya trabajar de forma paralela en las interfaces de cada uno, por ejemplo añadiendo controles para un usuario u otro.

## Borrar vía (trabajador)

Que tenga su diálogo de confirmación

## Editar vía (trabajador)

- Cambiar datos sencillos, igual no tienen ni que ser todos los datos en principio

## Listar vídeos (cliente, trabajador)

## Ver detalles vídeo

## Reproducir vídeo

Como link a youtube o un incrustado de youtube, si es posible
