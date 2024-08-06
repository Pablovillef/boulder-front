# Roles y casos de uso

## Roles

Entiendo que habrá tres: invitado, cliente, y trabajador.

El rol de administrador lo dejaría sin hacer, asumimos que los trabajadores de rocódromos (y los rocódromos) se dan de alta en la base de datos de antemano, y nos centramos en lo demás (que para el tfg es más que de sobra)

## Casos de uso fundamentales (el core de la aplicación)

### Invitado

Los básicos, que dejaría para el final en cuanto a su implementación:

- Iniciar sesión
- Registrarse

Los que comentamos en la última reunión que estaría bien poder hacer sin ser necesaria una cuenta de cliente:

- Accede detalles vía mediante QR: esto permite acceder a las características de la vía.

- Ver lista de vídeos: o se muestra ya de golpe al leer el QR de la vía, o que haya alguna pestaña o similar para ver los vídeos.

- Ver detalles vídeo: fecha de subida a la aplicación, usuario que lo ha subido, y que salga la opción de ver el vídeo (caso de uso de debajo)

- Reproducir vídeo. Esto puede hacerse con un link que nos lleve al servicio externo como youtube, o si es sencillo se puede incrustar en la app.

### Cliente

El cliente tendrá todos los casos de uso del invitado, menos obviamente los de iniciar sesión y registrarse.

- Cerrar sesión: lo esperado, también dejar para el final

- Ver lista de rocódromos

- Ver detalle rocódromo

- Ver vías activas rocódromo

- Accede detalles vía mediante navegación: mismo resultado que "Accede detalles vía mediante QR", pero accedido mediante navegación en vez de leyendo el QR.

- Añadir vídeo a vía: un botón extra en el caso de uso de ver detalles vía.

- Listar mis vídeos

- Editar vídeo

- Borrar vídeo

### Trabajador

- Ver vías rocódromo (en este caso serían todas)
- Da de alta vía
- Edita vía
- Da de baja vía
- Da de baja vídeo

## Casos de uso extra

Todo esto es opcional/casos que se me han ocurrido sobre la marcha, se puede decidir que merece la pena hacerlo en base a lo que se descubra con el desarrollo de la parte fundamental, pero no hay ninguna obligación para hacerlo.

### Filtrado de vías

Como cliente, se podría permitir a los usuarios ver vías antiguas, que ya hayan sido dadas de baja, y sus vídeos asociados.

### Vías/Rocódromos favoritos

Para poder acceder rápidamente a ellos.

### Ver vídeos de un cliente concreto

Porque nos guste cómo escala.

## Modelo de datos

Creo que está todo claro, menos quizá los detalles a almacenar de cada vía.

### Vías

- `id_via`: identificador único de una vía, interno a la aplicación, puede ser numérico y dependiente del id del rocódromo para ser realmente único, o no, único globalmente por sencillez.

- `qr_via`: este QR puede que no sea único entre vías. Por ejemplo, si cada rocódromo compra unas etiquetas QR y en las etiquetas pone poco más que un "1", o un "Trepariscos/1", pues cuando esa vía se de de baja se podría reutilizar esa etiqueta en otro sitio. Esto me hace pensar en cómo sería el proceso de leer un QR: se debería indicar, aparte, en qué rocódromo nos encontramos? De esta forma, cualquier QR podría valer.

De todas formas, a nivel de este TFG podemos asumir que el QR de una vía es único y tiene el formato que queramos, en plan `Treparriscos-1`, y pensar que `Treparriscos` identifica únivocamente al rocódromo, y que no se usará ese código de vía más veces.

- `nombre`: si se le quiere poner un nombre, para que se use en la app, estaría bien. Las vías no tienen, pero igual en la app queda raro que no lo haya. Si no, se pone una foto y ya está.

- `foto`: habría que ver cómo gestionar esto en Postgres, o usar un sistema de terceros para subir las fotos programáticamente. Si bien los vídeos sí que nos apoyaremos en otras plataformas como Youtube, estas fotos creo que deberíamos gestionarlas nosotros.

- `tipo`: bloque (o "boulder", más conocido) o vía. Quizá esto nos haga pensar en buscar otro nombre que no sea vía, ya que una vía en sí es solo un tipo de ruta, las que vas atado con cuerda o autoasegurador. O en el código llamamos vía a todo, pero cuando lo pintemos en la app usamos el tipo, y ponemos bloque/boulder o vía concretamente.

- `presas`: esto sería el color. Creo que llamarlo presas será más adecuado porque el nivel también se suele marcar con un color, así se tiene claro de qué hablamos.

- `num_nivel`: numérico, del 1 al que sea. Esto evita problemas como los que comento en el siguiente punto.

- `texto_nivel`: pongo texto, pero generalmente es un color. Lo que pasa es que los colores no se usan consistentemente entre rocódromos. Por ejemplo, en el Quality, el Indian y el Treparriscos hay nivel `1(blanco)`. En cambio, los niveles 2 y 3 dependen de en cuál estés: en el Quality es `2(verde)` y `3(azul)`, y en el Indian y el Trepa son `2(azul)` y `3(verde)`. En el 4 y 5 vuelven a coincidir los tres, con `4(amarillo)` y `5(naranja)`. Por eso veo necesario un número que acompañe al texto, que será un color casi siempre. Esto no creo que sea maś que añadir filas de niveles específicas para cada rocódromo, y ya está.

