const {FINAL_API_URL} = require("../main");

function usage() {
    return '/login <username> <password>';
}

function name() {
    return 'login';
}

async function handle(bot, args, chatId) {
    if (args.length < 3) {
        bot.sendMessage(chatId, module.exports.usage());
        return;
    }

    const username = args[1];
    const password = args[2];

    await fetch(FINAL_API_URL + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })
        .then(res => res.json())
        .then(json => {
            if (json.status === 'OK') {
                bot.sendMessage(chatId, json.message);
            } else {
                bot.sendMessage(chatId, `Ошибка! ${json.message}`)
            }
        });
}

module.exports.usage = usage;
module.exports.name = name;
module.exports.handle = handle;

module.exports.desc = () => {
    return 'Вход и получение нового API токена';
};