var handler = async (m, {
	command,
	args,
	text,
	usedPrefix
}) => {
	if (!text) throw 'Nyari foto apa?'
	let [t1, t2] = text.split('|');
	try {
		var api = await (await fetch(API('xzn', 'api/pinterest', {
			search: text
		}, 'apikey'))).json();

		if (t2 && !isNaN(t2)) {
			const limit = Math.min(t2, api.length);
			for (let i = 0; i < limit; i++) {
				let res = api[i];
				conn.sendFile(m.chat, res.media.url, '', '', m);
				await delay(1000);
			}
		} else {
			if (!t2) { // changed from !text to !t2
				var res = api.getRandom()
				conn.sendFile(m.chat, res.media.url, '', `*${res.title}*\n\nInfo:\nWidth: ${res.media.width}\nHeight: ${res.media.height}\n\n_${res.created_at}_`, m);
			} else {
				throw 'Format input tidak valid. Silakan masukkan jumlah yang benar.';
			}
		}
	} catch (e) {
		throw `Gagal mendapatkan Foto,\nError: ` + e.toString();
	}
};

handler.help = ['pinterest'];
handler.command = ['pin', 'pinterest'];
handler.tags = ['weebs'];
module.exports = handler;