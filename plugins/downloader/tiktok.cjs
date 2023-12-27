var handler = async (m, {
	command,
	args,
	text,
	usedPrefix
}) => {
	var body = text.replace(/\s+/g, '+')
	try {
		var xzn
		switch (command) {
			case 'tren':
				if (!text) throw `"Format yang Anda masukkan mengalami kesalahan.\nAgar lebih mudah dipahami, gunakan tag yang benar seperti ini: ${usedPrefix}${command} id"`;
				xzn = await fetch(API('xzn', 'api/tttrending', {
					region: body
				}, 'apikey'))
				break;
			case 'search':
				if (!text) throw `"Format yang Anda masukkan mengalami kesalahan.\nAgar lebih mudah dipahami, gunakan tag yang benar seperti ini: ${usedPrefix}${command} cosplay.\nSelamat mengeksplorasi dunia cosplay! 🌟👾🎭"`;
				xzn = await fetch(API('xzn', 'api/ttsearch', {
					search: body
				}, 'apikey'))
				break;
		}
		var wtf = await xzn.json();
		var cek_bf = await fetch(wtf.play);
		if (/text|json/.test(cek_bf.headers.get('content-type'))) throw await cek_bf.text();
		conn.sendMessage(m.chat, {
			video: await cek_bf.buffer(),
			caption: wtf.title
		}, {
			quoted: m
		})
	} catch (e) {
		throw e.toString();
	};
};
handler.help = handler.command = ['tren', 'search'];
handler.tags = ['downloader', 'tiktok'];

module.exports = handler;
/*var [t1, t2] = body.split`|`
	if (!/[0-9]/.test(t2)) throw ('only number')*/