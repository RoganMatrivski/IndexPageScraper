const axios = require("axios").default;
const cheerio = require("cheerio");

const args = process.argv.slice(2);

function parseURI(uri) {
    try {
        uri = decodeURIComponent(uri);
    } catch (err) {} // eslint-disable-line no-empty
    return uri;
}

async function walker(root, folder_root) {
    folder_root = folder_root || root;
    console.log(`Walking through ${folder_root}`);

    if (root.slice(-1) !== "/") root += "/";

    const html = (
        await axios.get(root, {
            transformResponse: res => {
                return res;
            },
        })
    ).data;
    const $ = cheerio.load(html);

    const links = $("a")
        .map((_, link) => $(link).attr("href"))
        .toArray()
        .filter(a => !"/?".includes(a[0]));

    const dirs = links.filter(a => a.slice(-1) === "/");
    const files = links.filter(a => !(a.slice(-1) === "/"));

    const dirWalkTask = dirs.map(a => walker(root + a, folder_root + a));

    const walked_dirs = (await Promise.all(dirWalkTask)).flat();

    const parsed_files = files.map(a => ({
        link: root + a,
        out: parseURI(folder_root + a),
    }));

    return [...parsed_files, ...walked_dirs];
}

async function run(link, folder_root) {
    return walker(link, folder_root);
}

const [link, folderRoot] = args;

if (!link) throw new Error("Link required!");

walker(link, folderRoot || "./")
    .then(x => console.log(JSON.stringify(x)))
    .catch(err => console.error(err));
