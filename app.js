const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MySQLAdapter = require('@bot-whatsapp/database/mysql');

require('dotenv').config();

const {
  MYSQL_DB_HOST,
  MYSQL_DB_USER,
  MYSQL_DB_PASSWORD,
  MYSQL_DB_NAME,
  MYSQL_DB_PORT,
} = process.env;

console.log(MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_NAME);

// ---------- CONSTANTES ----------
const volverMenuPrincipal = '0 🔙Volver al Menú Principal';
const msgOpcionInvalida = '❌ La opción ingresada no es válida. Por favor seleccione una opción correcta.';

// ---------- FUNCIÓN REUTILIZABLE ----------
const validarMenu = (flow, menuMensaje, opcionesValidas) =>
  flow.addAction({ capture: true }, async (ctx, { fallBack, gotoFlow, flowDynamic }) => {
    const input = ctx.body?.trim();
    if (input === '0') return gotoFlow(flowPrincipal);
    if (!input || !opcionesValidas.includes(input)) {
      await flowDynamic(`${msgOpcionInvalida}\n\n${menuMensaje}`);
      return fallBack();
    }
  });

// ---------- MENSAJES MENÚS ----------
const mensajeEscuelaMinisterial = `Escuela Ministerial:
 1 ➡ Solicitar Información
 2 ➡ Preguntas Frecuentes
 3 ➡ Reportar un Problema
 4 ➡ Realizar una Sugerencia
${volverMenuPrincipal}`;

const mensajeEscuelaMaestros = `Escuela de Maestros:
 1 ➡ Solicitar Información
 2 ➡ Preguntas Frecuentes
 3 ➡ Reportar un Problema
 4 ➡ Realizar una Sugerencia
${volverMenuPrincipal}`;

const mensajeBautismos = `Bautismos:
 1 ➡ Solicitar Información
 2 ➡ Preguntas Frecuentes
 3 ➡ Reportar un Problema
 4 ➡ Realizar una Sugerencia
${volverMenuPrincipal}`;

const mensajeUniversidadVida = `Universidad de la Vida:
 1 ➡ Solicitar Información
 2 ➡ Preguntas Frecuentes
 3 ➡ Reportar un Problema
 4 ➡ Realizar una Sugerencia
${volverMenuPrincipal}`;

const mensajeFundacionUSC = `Fundación Un Sólo Corazón:
 1 ➡ Solicitar Información
 2 ➡ Preguntas Frecuentes
 3 ➡ Reportar un Problema
 4 ➡ Realizar una Sugerencia
${volverMenuPrincipal}`;

const mensajeVisionUP = `VisionUP:
 1 ➡ Solicitar Información
 2 ➡ Preguntas Frecuentes
 3 ➡ Reportar un Problema
 4 ➡ Realizar una Sugerencia
${volverMenuPrincipal}`;

const mensajeEventosG12 = `Eventos G12:
 1 ➡ Solicitar Información
 2 ➡ Preguntas Frecuentes
 3 ➡ Reportar un Problema
 4 ➡ Realizar una Sugerencia
${volverMenuPrincipal}`;

const mensajeCapacitacionDestino = `Capacitación Destino:
 1 ➡ Solicitar Información
 2 ➡ Preguntas Frecuentes
 3 ➡ Reportar un Problema
 4 ➡ Realizar una Sugerencia
${volverMenuPrincipal}`;

const mensajeModulosComplementarios = `Módulos Complementarios:
 1 ➡ Solicitar Información
 2 ➡ Preguntas Frecuentes
 3 ➡ Reportar un Problema
 4 ➡ Realizar una Sugerencia
${volverMenuPrincipal}`;

// ---------- MENÚS ----------
const escuelaMinisterialMenu = validarMenu(
  addKeyword(['4']).addAnswer(mensajeEscuelaMinisterial),
  mensajeEscuelaMinisterial,
  ['1', '2', '3', '4']
);

const escuelaMaestrosMenu = validarMenu(
  addKeyword(['5']).addAnswer(mensajeEscuelaMaestros),
  mensajeEscuelaMaestros,
  ['1', '2', '3', '4']
);

const bautismosMenu = validarMenu(
  addKeyword(['6']).addAnswer(mensajeBautismos),
  mensajeBautismos,
  ['1', '2', '3', '4']
);

const universidadVidaMenu = validarMenu(
  addKeyword(['7']).addAnswer(mensajeUniversidadVida),
  mensajeUniversidadVida,
  ['1', '2', '3', '4']
);

const fundacionUSCMenu = validarMenu(
  addKeyword(['8']).addAnswer(mensajeFundacionUSC),
  mensajeFundacionUSC,
  ['1', '2', '3', '4']
);

const visionUPMenu = validarMenu(
  addKeyword(['2']).addAnswer(mensajeVisionUP),
  mensajeVisionUP,
  ['1', '2', '3', '4']
);

const eventosG12Menu = validarMenu(
  addKeyword(['1']).addAnswer(mensajeEventosG12),
  mensajeEventosG12,
  ['1', '2', '3', '4']
);

const capacitacionDestinoMenu = validarMenu(
  addKeyword(['3']).addAnswer(mensajeCapacitacionDestino),
  mensajeCapacitacionDestino,
  ['1', '2', '3', '4']
);

const modulosComplementariosMenu = validarMenu(
  addKeyword(['9']).addAnswer(mensajeModulosComplementarios),
  mensajeModulosComplementarios,
  ['1', '2', '3', '4']
);

// ---------- MENÚ PRINCIPAL ----------
const flowPrincipal = addKeyword(['hola', 'menu', 'volver'])
  .addAnswer('¡Hola! Bienvenidos a la plataforma de soporte de MCI SANTIAGO')
  .addAnswer([
    `Escriba el número correspondiente para seleccionar cada opción:
    1 ➡ Eventos G12
    2 ➡ VisionUP
    3 ➡ Capacitación Destino
    4 ➡ Escuela Ministerial
    5 ➡ Escuela de Maestros
    6 ➡ Bautismos
    7 ➡ Universidad de la Vida
    8 ➡ Fundación Un Sólo Corazón
    9 ➡ Módulos Complementarios`,
  ])
  .addAction({ capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const input = ctx.body?.trim();
    switch (input) {
      case '1': return gotoFlow(eventosG12Menu);
      case '2': return gotoFlow(visionUPMenu);
      case '3': return gotoFlow(capacitacionDestinoMenu);
      case '4': return gotoFlow(escuelaMinisterialMenu);
      case '5': return gotoFlow(escuelaMaestrosMenu);
      case '6': return gotoFlow(bautismosMenu);
      case '7': return gotoFlow(universidadVidaMenu);
      case '8': return gotoFlow(fundacionUSCMenu);
      case '9': return gotoFlow(modulosComplementariosMenu);
      default:
        return fallBack(); // <- esta es la corrección
    }
  });

// ---------- MENSAJE SI NO SE ENTIENDE NADA ----------
const flowFallback = addKeyword([/.*/]).addAnswer(
  'No entendí tu mensaje. Por favor selecciona una opción válida del menú.'
);

// ---------- INICIALIZACIÓN ----------
const main = async () => {
  const adapterDB = new MySQLAdapter({
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USER,
    database: MYSQL_DB_NAME,
    password: MYSQL_DB_PASSWORD,
    port: MYSQL_DB_PORT,
  });

  const adapterFlow = createFlow([
    flowPrincipal,
    visionUPMenu,
    capacitacionDestinoMenu,
    eventosG12Menu,
    fundacionUSCMenu,
    universidadVidaMenu,
    bautismosMenu,
    escuelaMaestrosMenu,
    escuelaMinisterialMenu,
    modulosComplementariosMenu,
    flowFallback,
  ]);

  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
