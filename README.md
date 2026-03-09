# Parcial 1

## Guia de ejecución

Para preparar el entorno con el objetivo de poder correr la aplicación y la suite de pruebas se requiere:

1. Realizar un fork del repositorio del back https://github.com/isis3710-uniandes/bookstore-back
2. Realice el build de la imagen docker usando el comando docker build ./ -t bookstore
3. Ejecutar la imagen usando el comando docker run -d -p 127.0.0.1:8080:8080 bookstore
4. Ejecutar el front (habiendo navegado a la ruta donde este se encuentre) mediante npm run dev
5. En una nueva terminal, en la misma ruta del front, ejecutar npm test para ejecutar la suite de pruebas

## Reporte de cambios

Para persistir los datos de autores entre diferentes rutas se implementó un contexto mediante AuthorsContext, que almacena el arreglo de autores y un flag que evita realizar multiples peticiones al backend cuando el usuario navega entre páginas. El provider envuelve toda la aplicación en el layout principal para que cualquier componente hijo acceda y modifique el estado compartido mediante el hook. En la pagina de autores el filtrado se implementó mediante un estado local search que almacena lo que el usuario esta buscando en la barra. Se usa el método filter sobre el arreglo de autores para crear un nuevo arreglo filtrado que contiene únicamente los autores correspondientes. La lista filtrada se renderiza dinamizamente para que la actualizacion sea en tiempo real.

Nota: Con respecto al pre parcial, se añadio la propiedad aria-disabled, estilos correspondientes y lógica que controle la interacción en HandleSubmit, en el botón de crear en caso de que el formulario está vacío, en vez de directamente utilizar disabled, con el objetivo de que igualmente se puedan mostrar los errores bajo los inputs correspondientes al intentar hacer click. Asi mismo se implementaron pruebas que verifican el renderizado del componente en /crear al identificar los campos relevantes y verificar el estado inicial del boton submit, y otras que prueban un flujo de uso incorrecto donde se confirma que en caso de tener datos invalidos, el sistema renderiza los mensajes de error esperados y que el boton mantiene el estado deshabilitado (no solo mediante aria-disabled sino también verificando que el submit no se ejecutó, teniendo en cuenta las limitaciones descritas en el punto anterior).
