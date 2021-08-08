"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * File provides all the operations on json files
 */
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("./path"));
var FileUtils = /** @class */ (function (_super) {
    __extends(FileUtils, _super);
    function FileUtils() {
        var _this = _super.call(this) || this;
        _this.checkHydyco();
        return _this;
    }
    /**
     * Read mapping file
     * @param {string} fileName - Name of the mapping file
     * */
    FileUtils.prototype.readMappingFile = function (fileName) {
        fileName = this.getFileName(fileName);
        try {
            return JSON.parse(fs.readFileSync(this.getMappingFilePath(fileName)).toString());
        }
        catch (error) {
            throw new Error("Model name " + fileName + " not found");
        }
    };
    /**
     * Write mapping file
     * @param {string} fileName - Name of the mapping file
     */
    FileUtils.prototype.writeMappingFile = function (fileName, data) {
        fileName = this.getFileName(fileName);
        fs.writeFileSync(this.getMappingFilePath(fileName), JSON.stringify(data));
    };
    /**
     * Remove mapping file
     * @param {string} fileName - Name of the mapping file
     */
    FileUtils.prototype.deleteMappingFile = function (fileName) {
        fileName = this.getFileName(fileName);
        fs.unlinkSync(this.getMappingFilePath(fileName));
    };
    /**
     * Read all mapping files
     */
    FileUtils.prototype.readAllMappingFiles = function (onlyName) {
        var _this = this;
        if (onlyName === void 0) { onlyName = false; }
        var files = fs
            .readdirSync(this.hydycoMappingDir)
            .filter(function (file) { return file.includes(".json"); });
        // if only name is required
        if (onlyName) {
            return files.map(function (file) { return _this.getFileName(file); });
        }
        // return all files with json data
        return files.map(function (file) {
            var data = _this.readMappingFile(file);
            return data;
        });
    };
    return FileUtils;
}(path_1.default));
exports.default = FileUtils;
//# sourceMappingURL=file.js.map