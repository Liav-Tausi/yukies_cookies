"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverStatus = void 0;
var serverStatus;
(function (serverStatus) {
    serverStatus[serverStatus["Success"] = 200] = "Success";
    serverStatus[serverStatus["Created"] = 201] = "Created";
    serverStatus[serverStatus["Updated"] = 204] = "Updated";
    serverStatus[serverStatus["Deleted"] = 204] = "Deleted";
    serverStatus[serverStatus["RequestFail"] = 400] = "RequestFail";
    serverStatus[serverStatus["Unauthorized"] = 401] = "Unauthorized";
    serverStatus[serverStatus["NotFound"] = 404] = "NotFound";
    serverStatus[serverStatus["ServerFail"] = 500] = "ServerFail";
})(serverStatus = exports.serverStatus || (exports.serverStatus = {}));
//# sourceMappingURL=serverStatus.js.map