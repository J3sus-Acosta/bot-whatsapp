const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MySQLAdapter = require('@bot-whatsapp/database/mysql')

require('dotenv').config();

const MYSQL_DB_HOST = process.env.MYSQL_DB_HOST;
const MYSQL_DB_USER = process.env.MYSQL_DB_USER;
const MYSQL_DB_PASSWORD = process.env.MYSQL_DB_PASSWORD;
const MYSQL_DB_NAME = process.env.MYSQL_DB_NAME;
const MYSQL_DB_PORT = process.env.MYSQL_DB_PORT;

console.log(MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_NAME);

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['🤪 Hasta Aquí vamos Por Ahora🤪 Hasta luego y gracias por testear el Bot'])

const volverMenuPrincipal = '\n*MENU* Para volver al menú principal.';

const escuelaMinisterialMenu = addKeyword(['MIN','Min','min'])
    .addAnswer([
        `Escuela Ministerial:
        Escriba:
        (INF) Para Solicitar Información
        (PGF) Para Preguntas Frecuentes
        (PRO) Para Reportar un Problema
        (SUG) Para Realizar una Sugerencia`,
        volverMenuPrincipal,
    ]);

const escuelaMaestrosMenu = addKeyword(['MAE','Mae','mae'])
    .addAnswer([
        `Escuela de Maestros:
        Escriba:
        (INF) Para Solicitar Información
        (PGF) Para Preguntas Frecuentes
        (PRO) Para Reportar un Problema
        (SUG) Para Realizar una Sugerencia`,
        volverMenuPrincipal,
    ]);

const bautismosMenu = addKeyword(['BAU','Bau','bau'])
    .addAnswer([
        `Bautismos:
        Escriba:
        (INF) Para Solicitar Información
        (PGF) Para Preguntas Frecuentes
        (PRO) Para Reportar un Problema
        (SUG) Para Realizar una Sugerencia`,
        volverMenuPrincipal,
    ]);

const universidadVidaMenu = addKeyword(['UDV','Udv','udv'])
    .addAnswer([
        `Universidad de la Vida:
        Escriba:
        (INF) Para Solicitar Información
        (PGF) Para Preguntas Frecuentes
        (PRO) Para Reportar un Problema
        (SUG) Para Realizar una Sugerencia`,
        volverMenuPrincipal,
    ]);

const fundacionUSCMenu = addKeyword(['USC','usc','Usc'])
    .addAnswer([
        `Fundación Un Sólo Corazón:
        Escriba:
        (INF) Para Solicitar Información
        (PGF) Para Preguntas Frecuentes
        (PRO) Para Reportar un Problema
        (SUG) Para Realizar una Sugerencia`,
        volverMenuPrincipal,
    ]);
  

const visionUPMenu = addKeyword(['Vis', 'vis', 'VIS']).addAnswer(
    [
        `VisionUP:
        Escriba lo que está en *negritas* para seleccionar cada opción:
        (MU) Para Manual de Usuario
        (PGF) Para Preguntas Frecuentes
        (PRO) Para Reportar un Problema
        (SUG) Para Realizar una Sugerencia`,
        volverMenuPrincipal,
    ]
)

const eventosG12Menu = addKeyword(['EG12', 'G12','eg12','g12']).addAnswer(
    [
        `Eventos G12:
        Escriba lo que está en *negritas* para seleccionar cada opción:
        (MU) Para Manual de Usuario
        (PGF) Para Preguntas Frecuentes
        (PRO) Para Reportar un Problema
        (SUG) Para Realizar una Sugerencia`,
        volverMenuPrincipal,
    ]
)

const capacitacionDestinoMenu = addKeyword(['cd', 'CD','Cd']).addAnswer(
    [
        `Capacitación Destino:
        Escriba lo que está en *negritas* para seleccionar cada opción:
        (INF) Para Solicitar Información
        (PGF) Para Preguntas Frecuentes
        (PRO) Para Reportar un Problema
        (SUG) Para Realizar una Sugerencia`,
        volverMenuPrincipal,
    ]
)

const flowPrincipal = addKeyword(['hola', 'Hola', 'Hola'])
    .addAnswer('¡Hola! Bienvenidos a la plataforma de soporte de MCI SANTIAGO')
    .addAnswer(
        [
            `Escriba lo que está en *negritas* para seleccionar cada opción:
            👉*EG12* Para Eventos G12
            👉*VIS*  Para VisionUP
            👉*CD*   Para Capacitación Destino
            👉*MIN*  Para Escuela Ministerial
            👉*MAE*  Para Escuela de Maestros
            👉*BAU*  Para Bautismos
            👉*UDV*  Para Universidad de la Vida
            👉*USC*  Para Fundación Un Sólo Corazón`,
        ],
        null,
        null,
        [visionUPMenu, capacitacionDestinoMenu, eventosG12Menu, fundacionUSCMenu,
        universidadVidaMenu,bautismosMenu,escuelaMaestrosMenu,escuelaMinisterialMenu]
    )

const main = async () => {
    const adapterDB = new MySQLAdapter({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    })
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}

main();
