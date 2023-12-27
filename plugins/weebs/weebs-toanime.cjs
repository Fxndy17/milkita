var uploadFile = require('../../lib/uploadFile.cjs');
var handler = async (m, {
	command,
	args,
	text,
	usedPrefix
}) => {
	try {
		var q = m.quoted ? m.quoted : m,
			mime = (q.msg || q).mimetype || ''
		if (/image/g.test(mime)) {
		  m.reply('*p l e a s e  w a i t. . .*')
			var res = await fetch(API('xzn', 'api/toanime', {
				url: await uploadFile(await q.download())
			}, 'apikey'));
			if (/text|json/.test(res.headers.get('content-type'))) throw 'Error converting image to anime...';
			await conn.sendMessage(m.chat, {
				image: await res.buffer(),
				caption: '_powered by skizo.tech_'
			}, {
				quoted: m
			})
		} else throw 'Send/reply with an image';
	} catch (e) {
		throw e.toString();
	}
};

handler.help = handler.command = ['toanime', 'jadianime'];
handler.tags = ['weebs'];
module.exports = handler;