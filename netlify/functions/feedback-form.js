export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
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
}),
}
}
