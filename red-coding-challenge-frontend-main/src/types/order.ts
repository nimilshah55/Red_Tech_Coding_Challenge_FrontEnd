// The Order type defines the shape of an order object and has the following properties:

// orderId: a number representing the order ID
// orderType: an OrderType enum value representing the type of order
// customerName: a string representing the name of the customer associated with the order
// createdDate: a string representing the date the order was created
// createdByUserName: a string representing the username of the user who created the order
// The OrderType enum defines a set of possible order types and has the following values:

// NotSet: indicates that the order type has not been set
// Standard: indicates a standard order type
// SaleOrder: indicates a sale order type
// PurchaseOrder: indicates a purchase order type
// TransferOrder: indicates a transfer order type
// ReturnOrder: indicates a return order type
// The use of the enum keyword in TypeScript creates a set of named constants that can be used in place of raw values.
// In this case, the OrderType enum provides a set of possible order types that can be used to ensure type safety 
// and prevent errors when working with order objects.

export type Order = {
    orderId: number,
    orderType: OrderType,
    customerName: string,
    createdDate: string,
    createdByUserName: string,
}

export enum OrderType {
    NotSet = "NotSet",
    Standard = "Standard",
    SaleOrder = "SaleOrder",
    PurchaseOrder = "PurchaseOrder",
    TransferOrder = "TransferOrder",
    ReturnOrder = "ReturnOrder"
}