const port: number = 3000

import express from "express"
import * as path from "path"
import * as http from "http"

class App {
    private server: http.Server
    private port: number

    constructor(port: number) {
        this.port = port
        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))
        app.use('/build/three.module.js', express.static(path.join(__dirname, '../../node_modules/three/build/three.module.js')))
        app.use('/jsm/controls/OrbitControls', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/controls/OrbitControls.js')))
        // app.use('/jsm/loaders/FBXLoader', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/loaders/FBXLoader.js')))
        app.use('/jsm/loaders/OBJLoader', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/loaders/OBJLoader.js')))

        this.server = new http.Server(app);
    }

    public Start() {
        this.server.listen(this.port, () => {
            console.log( `Server listening on port ${this.port}.` )
        })
    }
}

new App(port).Start()