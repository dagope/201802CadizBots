# Material conferencia Cadiz 20/02/2018
En este repositorio encontrarás le material utilizado en la conferencia impartida en la Escuela Superior de Ingeniería de la Universidad de Cadiz el 20/02/2018

## Presentación
Aquí tenéis enlace a la presentación utilizada:
[Bots_presentacion_cadiz_20180220.pdf](Bots_presentacion_cadiz_20180220.pdf) 

## Demos
Para que las demostraciones puedan funcionaros en vuestro equipo, debeis de instalar los siguientes:
- nodejs
- python
- BotFramework Emulator
- Visual Studio Code
Podéis seguir la guía oficial para la configuración. [aquí](https://github.com/Microsoft/BotFramework-Emulator)

ejecutar ``npm install`` en el directorio src para que carguen tódos los módulos necesarios.
Para más detalle podéis seguir la guía oficial: [aquí](https://docs.microsoft.com/es-es/bot-framework/nodejs/bot-builder-nodejs-quickstart)


#### Demo con Lenguaje Natural (LUIS)
Para las demo de uso de lenguaje de natural con el servucios LUIS, es necesario crearse una cuenta en azure y registrar nuestro servicio en la pagina [https://www.luis.ai](https://www.luis.ai)

Una vez tengamos nuestra Key, lo agregamos en el código para poder probar el ejemplo.
 Cre3ar los siguientes intents:
  Nombre: "add expense"
  Entidades: 
    - cost
    - type
    - currency
Entrenar el intent, con frases del tipo: 
"nuevo gasto de 10 euros de taxi"
"10 euros de taxi"
suma 20 euros de taxi
Por cada sentencia podemos marcar la situación de cada entidad.

#### Demo de analisis de texto y deteccion del idioma
Para las demos de deteccion de lenguaje debemos crearnos la cuenta y configurar la url de llamada al servicio en el codigo de la demo.
Aquí podéis probar el servicio:
[https://azure.microsoft.com/es-es/services/cognitive-services/text-analytics/](https://azure.microsoft.com/es-es/services/cognitive-services/text-analytics/)


# Cuenta de Azure:
Puedes registrarte con una cuenta de Visual Studio Essentials que te da la posibilidad de disponer de algo de crédito mensualmente para el uso de los servicios. Aunque en este ejemplo te servirán las configuraciones en modo gratuita.
aquí teneis los pasos necesarios para crear vuestro Bot Service en Azure.
[https://docs.microsoft.com/es-es/bot-framework/bot-service-quickstart](https://docs.microsoft.com/es-es/bot-framework/bot-service-quickstart)

# Enlaces de interés
https://mva.microsoft.com/es-es/training-courses/desarrollo-de-bots-con-microsoft-bot-framework-y-nodejs-17712

https://dev.botframework.com

https://azure.microsoft.com/es-es/try/cognitive-services/

https://github.com/Microsoft/BotFramework-Emulator

https://github.com/Microsoft/BotBuilder

https://planetachatbot.com/


