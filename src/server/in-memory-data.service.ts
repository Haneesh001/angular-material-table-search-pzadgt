import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const members = [
      {
        id: 41,
        first_name: "Joan",
        last_name: "Brown",
        user_name: "jbrown@imatc.com",
        country: "Imtac Delhi",
        rcode:'IMB01',
    },
    {
        id: 40,
        first_name: "Mort",
        last_name: "Johnston",
        user_name: "morty@imatc.com",
        country: "IMTAC bangalore",
        rcode:'IMB01',
    },
    {
        id: 42,
        first_name: "Sally",
        last_name: "Johns",
        user_name: "smothers@imatc.com",
        country: "IMTAC bangalore",
        rcode:'IMB02'
    },
    {
        id: 39,
        first_name: "Kat",
        last_name: "Preston",
        user_name: "kipreston@imatc.com",
        country: "Imtac India",
        rcode:'IMB02',
    },
    {
        id: 34,
        first_name: "James",
        last_name: "Preston",
        user_name: "jpreston@imatc.com",
        country: "Imtac Nagpur",
        rcode:'IMB03',
    },
    {
        id: 43,
        first_name: "Anya",
        last_name: "Promaski",
        user_name: "anyapro@imatc.com",
        country: "Imtac Nagpur",
        rcode:'IMB03',
    },
    {
        id: 44,
        first_name: "Elena",
        last_name: "Savkin",
        user_name: "esavkin@imatc.com",
        country: "Imtac India",
        rcode:'IMB04',
    },
    {
        id: 45,
        first_name: "Johan",
        last_name: "Severson",
        user_name: "jsever@imatc.com",
        country: "Imtac Nagpur",
         rcode:'IMB04',
    },
    {
        id: 46,
        first_name: "Kathya",
        last_name: "Smith",
        user_name: "ksmith@imatc.com",
        country: "Imtac India",
         rcode:'IMB04',
    },
    {
        id: 47,
        first_name: "Bill",
        last_name: "Lewis",
        user_name: "blewis@imatc.com",
        country: "Imtac India",
         rcode:'IMB03',
    }
    ];
    return { members };
  }
}