var handler = async m => m.reply(`
╭─「 Donasi 」
│ • DANA [tidak terdaftar]
│ • GOPAY [tidak terdaftar]
│ • OVO [tidak terdaftar]
╰────
╭─「 Hubungi 」
│ > /owner
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['']
handler.command = /^dona(te|si)$/i

module.exports = handler