"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function setObjecttoForm(editor, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const objectData = yield loadObject(id);
        editor.setValue(objectData);
        return objectData;
    });
}
function setObjectHistory(data, id) {
    console.log(Date.now());
    const timestamp = Date.now();
    const keyHistory = "api/rest/v1/object/" + id + "/history/" + timestamp + ".json";
    patchObjecttoS3(keyHistory, data);
}
function uploadObjecttoS3(data, id) {
    const key = "api/rest/v1/object/" + id + ".json";
    console.log(data);
    patchObjecttoS3(key, data);
}
function setObject(editor, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const objectData = yield loadObject(id);
        editor.setValue(objectData);
        return objectData;
    });
}
function main() {
    var url = new URL(document.URL);
    console.log(url.pathname);
    console.log(url.search);
    var params = url.searchParams;
    console.log(params);
    console.log(params.get("id"));
    if (url.pathname === "/object/") {
        console.log("Set JSONEditor");
        var editor = loadJSONEditor();
        var historyData = null;
        //addEventListener();
        var id = null;
        if (params.get("id") === "new") {
            console.log("id is new");
            id = self.crypto.randomUUID();
        }
        else {
            console.log("id is not new");
            console.log(params.get("id"));
            id = params.get("id");
            setObjecttoForm(editor, params.get("id"));
        }
        const input = document.getElementById('submit');
        if (input) {
            input.addEventListener('click', () => {
                console.log("Submit button clicked");
                console.log(Date.now());
                console.log(editor.getValue());
                var data = editor.getValue();
                uploadObjecttoS3(data, id);
                setObjectHistory(data, id);
            });
        }
    }
}
main();
