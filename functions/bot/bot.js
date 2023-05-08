const { Telegraf } = require("telegraf");

const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const gameShortName = 'your-game'
const gameUrl = 'https://univerlib.com'

const markup = Extra.markup(
  Markup.inlineKeyboard([
    Markup.gameButton('🎮 Play now!'),
    Markup.urlButton('Telegraf help', 'http://telegraf.js.org')
  ])
)

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start(({ replyWithGame }) => replyWithGame(gameShortName))
bot.command('foo', ({ replyWithGame }) => replyWithGame(gameShortName, markup))
bot.gameQuery(({ answerGameQuery }) => answerGameQuery(gameUrl))
// bot.launch()

// bot.start((ctx) => {
//   console.log("Received /start command");
//   try {
//     return ctx.reply("Hi");
//   } catch (e) {
//     console.error("error in start action:", e);
//     return ctx.reply("Error occured");
//   }
// });
// bot.help((ctx) => {
//   console.log("Received /help command");
//   try {
//     return ctx.reply("Send me a sticker");
//   } catch (e) {
//     console.error("error in help action:", e);
//     return ctx.reply("Error occured");
//   }
// });

// bot.on("sticker", (ctx) => {
//   console.log("Received sticker");
//   try {
//     return ctx.reply("👍");
//   } catch (e) {
//     console.error("error in send sticker action:", e);
//     return ctx.reply("Error occured");
//   }
// });

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("error in handler:", e);
    return {
      statusCode: 400,
      body: "This endpoint is meant for bot and telegram communication",
    };
  }
};
