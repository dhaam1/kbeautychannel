"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConsultationNotification = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
// @ts-ignore
const solapi_1 = require("solapi");
admin.initializeApp();
const API_KEY = "NCSXQPK6OMIYVIJV";
const API_SECRET = "IBLJ2L5R7YY6BAGGFLEEAQJQBIQOCXSS";
const PFID = "KA01PF2601230724101402N0kaFKiVsU";
const TEMPLATE_ID = "KA01TP260123072851846sgumQhRGFPi";
const SENDER_NUMBER = "01067832083";
const ADMIN_PHONE = "01047561678";
const messageService = new solapi_1.SolapiMessageService(API_KEY, API_SECRET);
exports.sendConsultationNotification = functions.firestore
    .document("consultations/{docId}")
    .onCreate(async (snap, context) => {
    const data = snap.data();
    const docId = context.params.docId;
    try {
        if (!data) {
            console.log("No data associated with the event");
            return;
        }
        const { name, phone, department } = data;
        if (!name || !phone || !department) {
            console.warn(`[${docId}] 필수 데이터 누락:`, { name, phone, department });
            return;
        }
        const messageData = {
            to: ADMIN_PHONE,
            from: SENDER_NUMBER,
            kakaoOptions: {
                pfId: PFID,
                templateId: TEMPLATE_ID,
                variables: {
                    "#{name}": name,
                    "#{phone}": phone,
                    "#{category}": department,
                },
            },
        };
        console.log(`[${docId}] 알림톡 전송 시도:`, { name, phone, department });
        const result = await messageService.sendOne(messageData);
        console.log(`[${docId}] 알림톡 전송 성공:`, result);
    }
    catch (error) {
        console.error(`[${docId}] 알림톡 전송 실패:`, error);
    }
});
//# sourceMappingURL=index.js.map