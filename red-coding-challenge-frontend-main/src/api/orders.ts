// The Get() method makes a GET request to the _apiUrl with a header containing the _apiKey. 
// If the response is OK, it returns the response JSON as an array of Order objects. 
// If the response is not OK, it returns the response status code as a number.

// The Create(order: Order) method makes a POST request to the _apiUrl with a header containing
// the _apiKey and the order object in the request body. If the response is OK, it returns the response JSON 
// as an Order object. If the response is not OK, it returns the response status code as a number.

// Both methods use the fetch API to make the requests and return Promises that resolve to 
// the response data or status code.

// The Order type is imported from the ../types/order module. The use of the type keyword 
// before the import statement indicates that Order is a type-only import, meaning that it is not imported as
// a runtime value and is only used for type checking at compile time.

import type { Order } from '../types/order';

export class Orders {
    readonly _apiUrl: string = "";
    readonly _apiKey: string = "";

    constructor(apiUrl?: string, apiKey?: string) {
        if(apiUrl)
            this._apiUrl = apiUrl;
        if(apiKey)
            this._apiKey = apiKey
    }

    async Get(): Promise<Order[] | number> {
        console.log(process.env);
        console.log(this._apiUrl);
        console.log(this._apiKey);
        const options = { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ApiKey: this._apiKey
            }
        }
        let response = await fetch(this._apiUrl, options);
        if (response.ok) {
            return await response.json();
        } else {
            return response.status;
        }
    }

    async Create(order: Order):Promise<Order | number> {
        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
                'ApiKey': this._apiKey
            }
        }
        let response = await fetch(this._apiUrl, options)
        if (response.ok) {
            return await response.json();
        } else {
            return response.status;
        }
    }
}