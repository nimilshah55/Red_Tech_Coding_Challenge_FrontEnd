// The apiUrl and apiKey variables are obtained from environment variables using the process.env object, 
// which is available in Node.js environments and some browser environments.

// By creating an instance of the Orders class with the apiUrl and apiKey,
// the OrderAPI variable can be used to make API requests for orders using the methods defined in the Orders class.

import { Orders } from "./orders";
const apiUrl = process.env.REACT_APP_API_URL as string;
const apiKey = process.env.REACT_APP_API_KEY as string;
export const OrderAPI = new Orders(apiUrl, apiKey);