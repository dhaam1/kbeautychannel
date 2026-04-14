import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// @ts-ignore
import { SolapiMessageService } from "solapi";

admin.initializeApp();

const API_KEY = "NCSXQPK6OMIYVIJV";
const API_SECRET = "IBLJ2L5R7YY6BAGGFLEEAQJQBIQOCXSS";
const PFID = "KA01PF2601230724101402N0kaFKiVsU";
const TEMPLATE_ID = "KA01TP260123072851846sgumQhRGFPi";
const SENDER_NUMBER = "01067832083";
const ADMIN_PHONE = "01047561678";

const messageService = new SolapiMessageService(API_KEY, API_SECRET);

export const sendConsultationNotification = functions.firestore
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
        } catch (error) {
            console.error(`[${docId}] 알림톡 전송 실패:`, error);
        }
    });