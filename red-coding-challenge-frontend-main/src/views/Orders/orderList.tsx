// This is a functional React component called OrderList. It takes in three props: orders, an array of Order objects; 
// selectedCustomerFilter, a SelectOption object that represents the customer filter selected by the user; 
// and orderIdFilter, a number that represents the order ID filter selected by the user.

// The OrderList component first defines two filtering functions: filterBySelectedCustomer and filterByOrderId.
// These functions are used to filter the orders array based on the selected filters.

// Then, the orders array is filtered using the filterBySelectedCustomer and filterByOrderId functions, 
// and the resulting array is mapped to an array of JSX elements. Each element is an li element that contains 
// information about an order, such as its ID, customer name, order type, created date, and created by username.

// Finally, the array of JSX elements is rendered inside a Stack component. If orders is falsy (e.g., null or undefined), 
// nothing will be rendered.

import Stack from '@mui/material/Stack';
import { SelectOption } from '../../components/DropdownSelect';
import type { Order } from '../../types/order';

interface IOrderListProps {
    orders: Order[],
    selectedCustomerFilter: SelectOption | undefined,
    orderIdFilter: number | undefined,
}
export function OrderList(props: IOrderListProps): JSX.Element { 
    const {
        orders,
        selectedCustomerFilter,
        orderIdFilter
    } = props;
    function filterBySelectedCustomer (order: Order): boolean {
        return selectedCustomerFilter === undefined || order.customerName === selectedCustomerFilter.value
    }
    function filterByOrderId(order: Order): boolean {
        return orderIdFilter === undefined || order.orderId === orderIdFilter
    }
     let renderOrders = orders
        .filter(order => filterBySelectedCustomer(order) && filterByOrderId(order))
        .map(order => {
            return <li key={order.orderId}>
                Order Id: {`${order.orderId}`}
                <ul>
                    <li key="customerName">Customer Name: {order.customerName}</li>
                    <li key="orderType">Order Type: {order.orderType}</li>
                    <li key="createdDate">Created Date: {order.createdDate}</li>
                    <li key="createdBy">Created By: {order.createdByUserName}</li>
                </ul>
            </li>
    })
    return <Stack>{orders && renderOrders}</Stack>
}