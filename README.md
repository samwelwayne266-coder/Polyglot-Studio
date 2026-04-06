# ⚡ Polyglot Studio

**Polyglot Studio** is a lightweight, ultra-responsive web-based code editor featuring multi-tab support, live previewing, and a high-contrast futuristic aesthetic. It is engineered for developers who need a fast, zero-install environment for web experimentation and script testing.

![Polyglot Studio Banner](link-to-your-icon.png)

## 🌟 Key Features

### 🧠 Monaco-Powered Intelligence
Utilizes the same core engine as VS Code, providing features like:
* **IntelliSense & Autocomplete:** Context-aware code suggestions.
* **Syntax Highlighting:** Support for JavaScript, HTML, CSS, Python, and more.
* **Multi-Cursor Editing:** Edit multiple lines at once for rapid refactoring.

### 🏓 Real-Time Sync (The Ping-Pong Technique)
Experience zero-latency updates with our custom synchronization engine:
* **The Ping:** Every keystroke in the editor broadcasts a payload via the `BroadcastChannel` API.
* **The Pong:** Internal iframes and detached pop-out windows listen for these pings and update their DOM content instantly without a full page reload.

### 📂 Advanced Workspace Management
* **Multi-Tab Architecture:** Open and switch between dozens of files while maintaining scroll position and undo history.
* **Dynamic Explorer:** A nested file tree that reflects your backend structure in real-time.
* **Symbol Outline:** An automatic scanner that parses your code for IDs, classes, and selectors for quick jumping.

### 🖥️ Integrated System Vitals
* **Live Preview:** Toggle a side-by-side view of your rendered web projects.
* **Backend Terminal:** Integrated shell feedback from the Node.js server to debug scripts and view console logs.
* **Visual Feedback:** A "Sync Dot" in the status bar blinks on every update, confirming your connection is live.



> [!IMPORTANT]
> ### [The github page](https://samwelwayne266-coder.github.io/Neural-OS/) is only for display purposes other features may or may not work. Follow the instructions that follow to unlock all features

---

### 📥 LOCAL INSTALLATION PROTOCOL

#### **Method A: The Release (Recommended)**
1. Go to the [Releases](https://github.com/samwelwayne266-coder/neural_os/releases) section on the right side of this page.
2. Download the latest `Source code (zip)`.
3. Extract the folder to your desired directory.

#### **Method B: Manual Download**
1. Click the green **Code** button at the top of this repository.
2. Select **Download ZIP**.
3. Extract the contents to your machine.

---

### ⚙️ SYSTEM SETUP

1. **Install Dependencies:**
   Open your terminal in the extracted folder and run:
   ```bash
   npm install
   ```
2. Initialize the Vault:

   ```bash
   npm start / node server.js
   ```

Establish Connection: You can access the vault:

On the PC: ```Open http://localhost:3000```

On Other Devices (Phones/Tablets): 

   1. Find your Local IP (Type ipconfig in CMD on Windows or ifconfig on Linux). 

   2. Open the browser on your other device and type: http://YOUR_LOCAL_IP:3000 (e.g., http://192.168.1.5:3000).
npm install
node server.js
