// cuma contoh nyimpen sesi :v

var handler = async (m, {
	text,
	conn
}) => {
	if (!text) throw 'perihal apa cuba';
	var body = text.replace(/\s+/g, '+');
	conn.ai = conn.ai ? conn.ai : {
		last_answer: 0
	}
	if (!db.data.game[m.chat]) {
		db.data.game[m.chat] = {
			game: {}
		}
	}
	var game = db.data.game[m.chat].game
	if (!game.ai) game.ai = {
		is_first: true,
		id: '',
		mes: '',
		last_used: 0
	}
	try {
		await m.reply('*w r i t i n g. . .*')
		var response = await fetch(API('xzn', 'api/openai', {
			text: text,
			id: game.ai.id
		}, 'apikey'))
		var rep = await response.json();
		game.ai = {
			id: rep.id,
			is_first: false,
			last_used: Date.now()
		}
		conn.ai.last_answer = Date.now()
		conn.reply(m.chat, rep.result, m)
	} catch (e) {
		throw e.toString();
		m.reply("mana gada hoax hoax")
	};
};
handler.help = handler.command = ['ask'];
handler.tags = ['tools'];

module.exports = handler;