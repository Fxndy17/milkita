var handler = async (m, {
	text,
	conn,
	command
}) => {
	if (!text) throw 'perihal apa'
	try {
		var uploadFile = require('../../lib/uploadFile.cjs');
		var q = m.quoted ? m.quoted : m,
			mime = (q.msg || q).mimetype || ''
		if (/image/g.test(mime)) {
			var img = await uploadFile(await q.download())
			var xzn
			m.reply('_baik sir, gambar semdang di pruses..._')
			switch (command) {
				case 'filter':
					xzn = await fetch(API('xzn', 'api/aimirror', {
						url: img,
						filter: text
					}, 'apikey'))
					break;
				case 'filter_vip':
					xzn = await fetch(API('xzn', 'api/aimirrorvip', {
						url: img,
						filter: text
					}, 'apikey'))
					break;
			}
			var wtf = await xzn.json();
			if (wtf.status !== 200) throw wtf
			conn.sendFile(m.chat, await getbuffer(wtf.generated_image_addresses.getRandom()), '.jpg', 'iyh', m)
		} else throw `Send/reply an image`
	} catch (e) {
		throw e
	}
};
handler.help = handler.command = ['filter', 'filter_vip'];
handler.tags = ['weebs'];
//handler.premium = true
module.exports = handler;