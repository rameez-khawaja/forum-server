const express = require('express')
const app = express()
let cors = require('cors');
app.use(cors());
const fs = require("fs");
const path = require('path')
const bodyParser = require("body-parser")
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.get("/data", (req, res) => {
    let jsonArray = []
    const jsonsInDir = fs.readdirSync('./json files').filter(file => path.extname(file) === '.json');
    jsonsInDir.forEach(file => {
        const fileData = fs.readFileSync(path.join('./json files', file));
        json = JSON.parse(fileData.toString());
        jsonArray.push(json)
    });
    res.send(jsonArray)
})

app.get("/data/:id", (req, res) => {
    const id = ('000' + parseInt(req.params.id)).substr(-3)
    let jsonArray = []
    const jsonsInDir = fs.readdirSync(`./json files/comments/${id}`).filter(file => path.extname(file) === '.json');
    jsonsInDir.forEach(file => {
        const fileData = fs.readFileSync(path.join(`./json files/comments/${id}`, file));
        json = JSON.parse(fileData.toString());
        jsonArray.push(json)
    });
    res.send(jsonArray)
})

// app.get("/data/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     fs.readFile(`./json files/${id}.json`, "utf8", (err, jsonString) => {
//     if (err) {
//         res.send("Error reading file from disk");
//     }
//     try {
//         const data = JSON.parse(jsonString);
//         res.send(data)
//     } catch (err) {
//         console.log("Error parsing JSON string");
//     }
//     });
// })

// app.get("/comments/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     console.log(id)
//     fs.readFile(`./json files/comments/${id}.json`, "utf8", (err, jsonString) => {
//     if (err) {
//         res.send("Error reading file from disk");
//     }
//     try {
//         const data = JSON.parse(jsonString);
//         res.send(data)
//     } catch (err) {
//         console.log("Error parsing JSON string");
//     }
//     });
// })

app.post("/newpost", async (req, res) => {
    const data = await req.body;
    const jsonString = JSON.stringify(data)
    const fileNumber = fs.readdirSync("./json files").length
    fileName = ('000' + fileNumber).substr(-3)
    fs.writeFile(`./json files/${fileName}.json`, jsonString, err => {
        if (err) {
            res.status(404).send()
        } else {
            res.status(201).send()
        }
    })
    const dirpath = `./json files/comments/${fileName}`
    await fs.promises.mkdir(dirpath, { recursive: true })
    
})

app.post("/newcomment", async (req, res) => {
    const data = await req.body;
    const id = ('000' + data.id).substr(-3)
    delete data.id
    const checkEmpty = data.comment
    const jsonString = JSON.stringify(data)
    let fileNumber = fs.readdirSync(`./json files/comments/${id}`).length + 1
    fileName = ('000' + fileNumber).substr(-3)
    if (/^\s*$/.test(checkEmpty) != true){
    fs.writeFile(`./json files/comments/${id}/${fileName}.json`, jsonString, err => {
        if (err) {
            res.status(404).send()
        } else {
            res.status(201).send()
        }
    })
    }
})

app.post("/newemoji", async (req, res) => {
    const data = await req.body;
    const id = ('000' + data.id).substr(-3)
    delete data.id
    const jsonString = JSON.stringify(data)
    fs.writeFile(`./json files/${id}.json`, jsonString, err => {
        if (err) {
            res.status(404).send()
        } else {
            res.status(201).send()
        }
    })
})


module.exports = app;
