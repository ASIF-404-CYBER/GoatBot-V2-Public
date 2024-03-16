const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
module.exports = {
	config: {
		name: "cover2",
		version: "1.0",
		author: "Samir.",
		countDown: 10,
		role: 0,
		shortDescription: "Create fb Banner",
		longDescription: "",
		category: "avt & banners",
		guide: {
			en: "{p}{n} Character name or code | Name | FBusername",
		}
	},

  

	onStart: async function ({ message, args, event, api }) {
 
    const info = args.join(" ");
		if (!info){
			return message.reply(`Please enter in the format:\n/avatar  Name or code | name | username | bgtext `);
      
      }else {
      const msg = info.split("|");
      const id = msg[0];
    const name = msg[1];
    const juswa = msg[2];
       const bgtext = msg[3];

        

       if (isNaN(id)) { // If input is not a number
          await message.reply("processing your cover boss....");

         let id1;
    try {
        id1 = (await axios.get(`https://www.nguyenmanh.name.vn/api/searchAvt?key=${id}`)).data.result.ID; 
    } catch (error) {
      await message.reply("Character not found, please check the name and try again...");
      return;
    }

        const img = (`https://www.nguyenmanh.name.vn/api/avtWibu2?id=${id1}&tenchinh=${name}&fb=${juswa}&tenphu=${bgtext}&apikey=zrAM6vv6`)			
                 const form = {
				body: `your cover is here boss`
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form); 
         
      

       }else  { 
       await message.reply("processing your cover please wait....");
         
         const img = (`https://www.nguyenmanh.name.vn/api/avtWibu2?id=${id}&tenchinh=${name}&fb=${juswa}&tenphu=${bgtext}&apikey=zrAM6vv6`)			
                 const form = {
				body: `your cover is here boss`
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form); 
        }
      }
    }
   };