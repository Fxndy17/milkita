var handler = async (m, {
  command,
  args,
  text,
  usedPrefix
}) => {
  try {
    var facebookUrlRegex = /^https?:\/\/(?:www\.)?m\.facebook\.com\/groups\/\d+\/permalink\/\d+\/\?[^/]+$/;
    if (!text || !facebookUrlRegex.test(text)) {
      throw 'Mohon berikan URL Facebook yang valid';
    }
    var api_facebook = await (await fetch(API('xzn', 'api/facebook', { url: text }, 'apikey'))).json();
    var bf = await (await fetch(api_facebook.medias.find(v => v.quality == 'hd') ? api_facebook.medias.find(v => v.quality == 'hd').url : api_facebook.medias.getRandom().url)).buffer();
    conn.sendFile(m.chat, bf, '', api_facebook.title, m);
  } catch (error) {
    console.error(error);
    throw error.toString()
  }
};

handler.help = handler.command = ['facebook', 'fb'];
handler.tags = ['downloader'];
module.exports = handler;