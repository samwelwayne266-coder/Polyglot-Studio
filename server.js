const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const WORKSPACE_DIR = path.join(__dirname, 'workspace');
if (!fs.existsSync(WORKSPACE_DIR)) fs.mkdirSync(WORKSPACE_DIR);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/files', (req, res) => {
    try {
        // This gets the name of your 'workspace' folder
        const rootName = path.basename(WORKSPACE_DIR);

        // Recursive function to build the tree objects
        const getTree = (dir) => {
            return fs.readdirSync(dir, { withFileTypes: true }).map(dirent => {
                const resPath = path.join(dir, dirent.name);
                const isDir = dirent.isDirectory();
                return {
                    name: dirent.name,
                    type: isDir ? 'folder' : 'file',
                    children: isDir ? getTree(resPath) : []
                };
            });
        };

        const tree = getTree(WORKSPACE_DIR);

        // STOPS THE ERROR: Sends the object the frontend is screaming for
        res.json({
            rootName: rootName, 
            files: tree         
        });
    } catch (err) {
        console.error("Backend Error:", err);
        res.status(500).json({ error: "Read Error" });
    }
});
// Add this route so the Folder Icon actually works
app.post('/mkdir', (req, res) => {
    const { foldername } = req.body;
    const folderPath = path.join(WORKSPACE_DIR, foldername);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        res.send("Folder Created");
    } else {
        res.status(400).send("Already exists");
    }
});

app.post('/create', (req, res) => {
    const filePath = path.join(WORKSPACE_DIR, req.body.filename);
    fs.writeFile(filePath, "", (err) => res.send(err ? "Error" : "Created"));
});

app.post('/mkdir', (req, res) => {
    const { foldername } = req.body;
    if (!foldername) return res.status(400).send("Folder name required");

    const folderPath = path.join(WORKSPACE_DIR, foldername);

    if (!fs.existsSync(folderPath)) {
        fs.mkdir(folderPath, { recursive: true }, (err) => {
            if (err) return res.status(500).send("Error creating folder");
            res.send("Folder Created");
        });
    } else {
        res.status(400).send("Folder already exists");
    }
});

app.get('/read/:filename', (req, res) => {
    const filePath = path.join(WORKSPACE_DIR, req.params.filename);
    fs.readFile(filePath, 'utf8', (err, data) => res.send(err ? "" : data));
});

// MULTI-LANGUAGE RUN LOGIC
app.post('/run', (req, res) => {
    const { code, filename } = req.body;
    const filePath = path.join(WORKSPACE_DIR, filename);

    fs.writeFile(filePath, code, (err) => {
        if (err) return res.json({ output: "Save Error" });

        let command = "";
        if (filename.endsWith('.js')) command = `node "${filePath}"`;
        if (filename.endsWith('.py')) command = `python "${filePath}"`;

        if (command) {
            exec(command, { timeout: 2000 }, (error, stdout, stderr) => {
                res.json({ output: stdout || stderr || "Executed (No Output)" });
            });
        } else {
            // HTML/CSS don't need a terminal command, they just save
            res.json({ output: "Saved. Use Preview tab for Web files.", isWeb: true });
        }
    });
});

// Add this to your server.js
let latestCode = ""; // Global variable to hold the preview content

// Route to receive code from editor
app.post('/update-preview', (req, res) => {
    latestCode = req.body.code;
    res.send("Syncing...");
});

// Route for the new tab to read the code
app.get('/preview', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(latestCode || "<h1>No code yet! Type in the editor.</h1>");
});

app.listen(3001, () => console.log('Multi-Language Editor: http://localhost:3001'));