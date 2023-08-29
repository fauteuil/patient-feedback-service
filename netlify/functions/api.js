// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from 'express';
const bodyParser = require('body-parser');
import serverless from 'serverless-http';
// const app = express();
// const cors = require('cors');

// neon - postgres connection
// postgres://fauteuil:k5oUrdmMq7nT@ep-noisy-pond-822897.us-west-2.aws.neon.tech/neondb

const postgres = require('postgres');
require('dotenv').config();

const { DATABASE_URL } = process.env;

const sql = postgres(DATABASE_URL, { ssl: 'require' });

async function getPostgresVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPostgresVersion();

import cors from 'cors';
const api = express();

api.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// api.use(cors({ origin: 'http://localhost:8888' })); // TODO: adjust for remote client with env vars.
// api.use(cors()); // TODO: adjust for remote client with env vars.

// postgres db connection

api.use(express.json());
api.use(bodyParser.json());
api.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

async function getUrl(shortCode = '') {
  const response = await sql`
  select
  original
  from short_url
  where short = ${shortCode}
  `;

  const url = response?.length ? response[0]?.original : '';

  console.log('url', url);
  return url;
}

async function addUrl(original, short) {
  console.log(`addUrl(${original},${short})`);

  const response = await sql`
  INSERT INTO short_url (original, short) VALUES ('${original}','${short}')
  `;

  // const result = url?.length ? url[0]?.original : '';

  console.log('addUrl', response);
  return result;
}

const router = Router();








router.get('/feedback-form', (req, res) =>
  res.send({
    statusCode: 200,
    body: {
      "resourceType": "Bundle",
      "id": "0c3151bd-1cbf-4d64-b04d-cd9187a4c6e0",
      "timestamp": "2021-04-02T12:12:21Z",
      "entry": [
        {
          "resource": {
            "resourceType": "Patient",
            "id": "6739ec3e-93bd-11eb-a8b3-0242ac130003",
            "active": true,
            "name": [
              {
                "text": "Tendo Tenderson",
                "family": "Tenderson",
                "given": ["Tendo"]
              }
            ],
            "contact": [
              {
                "system": "phone",
                "value": "555-555-2021",
                "use": "mobile"
              },
              {
                "system": "email",
                "value": "tendo@tendoco.com",
                "use": "work"
              }
            ],
            "gender": "female",
            "birthDate": "1955-01-06",
            "address": [
              {
                "use": "home",
                "line": ["2222 Home Street"]
              }
            ]
          }
        },
        {
          "resource": {
            "resourceType": "Doctor",
            "id": "9bf9e532-93bd-11eb-a8b3-0242ac130003",
            "name": [
              {
                "family": "Careful",
                "given": ["Adam"]
              }
            ]
          }
        },
        {
          "resource": {
            "resourceType": "Appointment",
            "id": "be142dc6-93bd-11eb-a8b3-0242ac130003",
            "status": "finished",
            "type": [
              {
                "text": "Endocrinologist visit"
              }
            ],
            "subject": {
              "reference": "Patient/6739ec3e-93bd-11eb-a8b3-0242ac130003"
            },
            "actor": {
              "reference": "Doctor/9bf9e532-93bd-11eb-a8b3-0242ac130003"
            },
            "period": {
              "start": "2021-04-02T11:30:00Z",
              "end": "2021-04-02T12:00:00Z"
            }
          }
        },
        {
          "resource": {
            "resourceType": "Diagnosis",
            "id": "541a72a8-df75-4484-ac89-ac4923f03b81",
            "meta": {
              "lastUpdated": "2021-04-02T11:51:03Z"
            },
            "status": "final",
            "code": {
              "coding": [
                {
                  "system": "http://hl7.org/fhir/sid/icd-10",
                  "code": "E10-E14.9",
                  "name": "Diabetes without complications"
                }
              ]
            },
            "appointment": {
              "reference": "Appointment/be142dc6-93bd-11eb-a8b3-0242ac130003"
            }
          }
        },
        {
          "resource": {
            "resourceType": "PatientFeedback",
            "id": "",
            "meta": {
              "lastUpdated": "2021-04-02T11:51:03Z"
            },
            "status": "",
            "questions": [
              {
                "id": "blah-8ygvb-blah",
                "name": "recommendDoctor",
                "value": 0,
                "valueType": "int"
              },
              {
                "id": "blah-8yg3edcvb-blah",
                "name": "diagnosisExplanationSatisfaction",
                "value": "",
                "valueType": "string"
              },
              {
                "id": "blah-8ygvb-bl2wsah",
                "name": "diagnosisExplanationComment",
                "value": "",
                "valueType": "string"
              },
              {
                "id": "blah-8y2wsd-gvb-blah",
                "name": "diagnosisResponse",
                "value": "",
                "valueType": "string"
              }
            ]
          },
          "diagnosis": {
            "reference": "Diagnosis/be142dc6-93bd-11eb-a8b3-0242ac-1309iujhbv"
          }
        }
      ]
    }
    ,
  })
);









router.get('/hello', (req, res) =>
  res.send({
    statusCode: 200,
    body: {
      message: 'Hello World!',
    },
  })
);

router.get('/short-url/:short', async function (req, res) {
  const shortCode = req.params.short;
  const url = await getUrl(shortCode);
  console.log('getUrl()', url);

  const response = res.send({
    statusCode: 200,
    body: {
      message: url,
    },
  });
  return response;
});

router.post('/add-url/', async function (req, res) {
  console.log('add-url: req.body', req.body);
  const shortCode = req.body.short;
  const fullUrl = req.body.original;
  // const url = await getUrl(shortCode);
  console.log('add-url: shortCode', shortCode);

  try {
    const response = await addUrl(shortCode, fullUrl);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  // console.log('getUrl()', url);

  // const response = res.send({
  //   statusCode: 200,
  //   body: {
  //     message: url,
  //   },
  // });
  // return response;

  // const newActivity = await activity.save();
  // // getActivityList();
  // const activities = await Activity.find();
  // res.status(201).json(newActivity);
});

api.use('/.netlify/functions/api/', router);

export const handler = serverless(api);
