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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = handler;
var client_bedrock_runtime_1 = require("@aws-sdk/client-bedrock-runtime");
var AWS_REGION_BEDROCK = "eu-central-1";
var client = new client_bedrock_runtime_1.BedrockRuntimeClient({ region: AWS_REGION_BEDROCK });
function handler(event, context) {
    return __awaiter(this, void 0, void 0, function () {
        var parsedBody, numberOfPoints, text, titanConfig, response, responseBody, firstResult;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!event.body) return [3 /*break*/, 2];
                    parsedBody = JSON.parse(event.body);
                    numberOfPoints = (_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.points;
                    if (!(parsedBody.text && numberOfPoints)) return [3 /*break*/, 2];
                    text = parsedBody.text;
                    titanConfig = getTitanConfig(text, numberOfPoints);
                    return [4 /*yield*/, client.send(new client_bedrock_runtime_1.InvokeModelCommand({
                            modelId: 'amazon.titan-text-express-v1',
                            body: JSON.stringify(titanConfig),
                            accept: 'application/json',
                            contentType: 'application/json'
                        }))];
                case 1:
                    response = _b.sent();
                    responseBody = JSON.parse(new TextDecoder().decode(response.body));
                    firstResult = responseBody.results[0];
                    if (firstResult && firstResult.outputText) {
                        return [2 /*return*/, {
                                statusCode: 200,
                                body: JSON.stringify({ summary: firstResult.outputText })
                            }];
                    }
                    _b.label = 2;
                case 2: return [2 /*return*/, {
                        statusCode: 400,
                        body: JSON.stringify({ message: "Invalid request" })
                    }];
            }
        });
    });
}
function getTitanConfig(text, points) {
    var prompt = "Text: ".concat(text, "\\n\n        From the text above, summarize the story in ").concat(points, " points.\\n\n    ");
    return {
        inputText: prompt,
        textGenerationConfig: {
            maxTokenCount: 4096,
            stopSequences: [],
            temperature: 0,
            topP: 1,
        },
    };
}
