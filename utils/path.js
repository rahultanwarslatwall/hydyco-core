"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Path util provides all the paths related to json files.
 * Which includes reading writing updating
 */
var fs = require("fs");
var path = require("path");
var PathUtils = /** @class */ (function () {
    function PathUtils() {
        /**
         * Get root path of the project , logic is based on finding the node_modules folder.
         * @return {String} root path
         */
        this._getRootPath = function () {
            var pathsAvailable = __dirname.split("/").filter(function (path) { return path.length; });
            for (var i = 1; i < pathsAvailable.length; i++) {
                var path_1 = "/" + pathsAvailable.slice(0, i).join("/");
                var checkPath = path_1 + "/node_modules";
                if (fs.existsSync(checkPath)) {
                    return path_1;
                }
            }
            return "";
        };
        this._rootPath = this._getRootPath();
    }
    /**
     * Checks of all hydyco paths.
     * If not found creates new path
     */
    PathUtils.prototype.checkHydyco = function () {
        var checkDirs = [
            this.hydycoDir,
            this.hydycoMappingDir,
            this.hydycoModelsDir,
        ];
        checkDirs.forEach(function (dir) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
        });
    };
    Object.defineProperty(PathUtils.prototype, "rootPath", {
        /**
         * Root path of the project
         */
        get: function () {
            return this._rootPath;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathUtils.prototype, "hydycoDir", {
        /**
         * Hydyco folder dir , it stores all the files related to hydyco.io
         */
        get: function () {
            return path.join(this._rootPath, ".hydyco", "mappings");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathUtils.prototype, "hydycoMappingDir", {
        /**
         * Hydyco mapping dir , it stores all the mapping files. Json file that store information used by plugins
         */
        get: function () {
            return path.join(this._rootPath, ".hydyco");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathUtils.prototype, "hydycoModelsDir", {
        /**
         * Hydyco models dir , it stores all the info for models used by plugins
         */
        get: function () {
            return path.join(this._rootPath, ".hydyco", "models");
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get json filename  with validation
     * @param {string} fileName - Name of the mapping file
     * @return {string} fileName - user | always lowercase
     */
    PathUtils.prototype.getFileName = function (fileName) {
        return fileName.split(".")[0].toLowerCase();
    };
    /**
     * Get json filename path with validation
     * @param {string} fileName - Name of the mapping file
     */
    PathUtils.prototype.getMappingFilePath = function (fileName) {
        fileName = this.getFileName(fileName);
        return path.join(this.hydycoMappingDir, fileName + ".json");
    };
    return PathUtils;
}());
exports.default = PathUtils;
//# sourceMappingURL=path.js.map