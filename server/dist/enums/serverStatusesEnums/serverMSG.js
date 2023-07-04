"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverErrorMSG = exports.serverMSG = void 0;
var serverMSG;
(function (serverMSG) {
    serverMSG["Success"] = "success";
    serverMSG["Created"] = "created";
    serverMSG["RequestFail"] = "request failed";
    serverMSG["NotFound"] = "not found";
    serverMSG["ServerFail"] = "server fail";
    serverMSG["Unauthorized"] = "Unauthorized credentials";
})(serverMSG = exports.serverMSG || (exports.serverMSG = {}));
var serverErrorMSG;
(function (serverErrorMSG) {
    serverErrorMSG["InvalidPassword"] = "Invalid Password";
    serverErrorMSG["InvalidFields"] = "Invalid fields: ";
    serverErrorMSG["loginControllerERROR"] = "Error in loginController";
    serverErrorMSG["registerControllerERROR"] = "Error in registerController";
})(serverErrorMSG = exports.serverErrorMSG || (exports.serverErrorMSG = {}));
//# sourceMappingURL=serverMSG.js.map