const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "owner",
		aliases: ["info"],
		author: "Hasan",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "info",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {
			const ownerInfo = {
				name: 'SABBIR AHMED ',
				class: 'HSC 𝑪𝑨𝑵𝑫𝑰𝑫𝑨𝑻𝑬',
				group: ' COMMERCE',
				gender: '𝑴𝑨𝑳𝑬',
				Birthday: '𝟐1-𝟎6-𝟐𝟎𝟎7',
				religion: '𝑰𝑺𝑳𝑨𝑴',
				hobby: 'gaming ',
				Fb: 'https://www.facebook.com/share/165qxNjSr2/',
				Relationship: 'mingle ',
				Height: '5"8'
			};

			const bold = '';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
			const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

			fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

			const response = `
𓀬 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 𓀬 \n
 ~𝙉𝘼𝙈𝙀: ${ownerInfo.name}
 ~𝘾𝙇𝘼𝙎𝙎: ${ownerInfo.class}
 ~𝙂𝙍𝙊𝙐𝙋: ${ownerInfo.group}
 ~𝙂𝙀𝙉𝘿𝙀𝙍: ${ownerInfo.gender}
 ~𝘽𝙄𝙍𝙏𝙃𝘿𝘼𝙔: ${ownerInfo.Birthday}
 ~𝙍𝙀𝙇𝙄𝙂𝙄𝙊𝙉: ${ownerInfo.religion}
 ~𝙍𝙀𝙇𝘼𝙏𝙄𝙊𝙉𝙎𝙃𝙄𝙋: ${ownerInfo.Relationship}
 ~𝙃𝙊𝘽𝘽𝙔: ${ownerInfo.hobby}
 ~𝙃𝙀𝙄𝙂𝙃𝙏: ${ownerInfo.Height}
 ~𝙁𝘽: ${ownerInfo.Fb}
			`;

			await api.sendMessage({
				body: response,
				attachment: fs.createReadStream(videoPath)
			}, event.threadID, event.messageID);

			fs.unlinkSync(videoPath);

			api.setMessageReaction('😘', event.messageID, (err) => {}, true);
		} catch (error) {
			console.error('Error in ownerinfo command:', error);
			return api.sendMessage('An error occurred while processing the command.', event.threadID);
		}
	}
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
