let axios = require("axios");
async function run() {
    const res = await axios.get("https://tenshi.spb.ru/anime-ost/Lucky_Star/");
    console.log(res.data);
}

run().catch(err => console.log(err.toString()));
