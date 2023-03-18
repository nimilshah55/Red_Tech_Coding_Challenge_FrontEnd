// This is a React functional component that manages a list of orders. It fetches the orders data from an API and 
// displays it in a table. Users can filter orders by customer name and order ID using a dropdown and a text field, 
// respectively. Users can also create new orders by filling out a form.

// The component starts by importing the necessary dependencies from React and other libraries. It then defines
// the Order type and the OrderType enum, which are used to define the structure of an order object and 
// its possible types.

// The component then defines its state using the useState hook. It defines orderData, which is an array of Order 
// objects, customerFilterOptions, which is an array of SelectOption objects for the customer dropdown, 
// selectedCustomerFilter, which is the currently selected customer in the dropdown, and orderIdFilter, 
// which is the currently entered order ID in the text field.

// The component defines a fetchData function that fetches order data from an API using the OrderAPI.Get() function. 
// If the response is successful, it sets the orderData state to the fetched orders and the customerFilterOptions 
// state to the unique customers in the orders. This function is called using the useEffect hook whenever the 
// component mounts or fetchData changes.

// The component defines two utility functions: getUniqueCustomersForFilter and customersToSelectOptions. 
// getUniqueCustomersForFilter takes an array of customer names and returns an array of unique customers as 
// SelectOption objects. customersToSelectOptions takes an array of customers and returns an array of SelectOption 
// objects.

// The component defines a handleOrderIdFilterChange function that updates the orderIdFilter state whenever 
// the user enters a value in the text field. It ensures that only positive integer values are entered by parsing 
// the input value as a number and rounding it to an integer.

// The component defines the createNewOrder function that creates a new order object using the newOrderType, 
// newOrderCustomerName, and newOrderCreatedByUserName states. It then sends a POST request to the API using 
// the OrderAPI.Create() function. If the response is successful, it updates the orderData and customerFilterOptions 
// states with the new order and its customer.

// The component defines the newOrderProps and orderListProps objects, which are passed to the NewOrder and 
// OrderList components, respectively.

// The component renders a Page component with the title "Orders". It then renders the NewOrder component, a 
// horizontal rule, a DropdownSelect component for the customer filter, a TextField component for the order ID filter,
// and the OrderList component. The NewOrder component allows the user to create new orders using the form inputs. 
// The DropdownSelect and TextField components allow the user to filter orders by customer and order ID, respectively. 
// The OrderList component displays the list of orders with the selected filters applied.

import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import DropdownSelect from "../../components/DropdownSelect";
import { OrderAPI } from '../../api/apicontainer';
import type { Order } from "../../types/order";
import type { SelectOption } from "../../components/DropdownSelect";
import { OrderType } from "../../types/order";
import { NewOrder } from "./newOrder";
import { OrderList } from "./orderList";
import TextField from "@material-ui/core/TextField";

export default function Orders() {
    const [orderData, setOrderData] = useState<Order[]>([]);
    const orderTypes = [
        OrderType.NotSet,
        OrderType.PurchaseOrder,
        OrderType.ReturnOrder,
        OrderType.SaleOrder,
        OrderType.TransferOrder
    ]
    const [customerFilterOptions, setCustomerFilterOptions] = useState<SelectOption[]>([])
    const [selectedCustomerFilter, setSelectedCustomerFilter] = useState<SelectOption>();
    const [orderIdFilter, setOrderIdFilter] = useState<number | undefined>();
    const fetchData = React.useCallback(async () => {

        var orderResponse = await OrderAPI.Get();
        if (typeof (orderResponse) === 'number') {
            console.log("error fetching data");
        } else {
            setOrderData([...orderResponse]);
            
            setCustomerFilterOptions([...getUniqueCustomersForFilter(orderResponse.map(order => order.customerName))]);
        }

    }, []);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    function getUniqueCustomersForFilter(customerList: string[]): SelectOption[] {
        const uniqueCustomers: string[] = [];
        customerList.forEach(customer => {
            if (!uniqueCustomers.includes(customer)) {
                uniqueCustomers.push(customer);
            }
        });
        return customersToSelectOptions(uniqueCustomers.sort((a, b) => a < b ? -1 : 1));
    }

    function customersToSelectOptions(customers: string[]): SelectOption[] {
        return customers.map(customer => { return { label: customer, value: customer } });
    }

   
    function handleOrderIdFilterChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (event.target.value === "")
            setOrderIdFilter(undefined)
        else {
            const value: number = +event.target.value;
            if (value < 0)
                setOrderIdFilter(0)
            else
                setOrderIdFilter(+value.toFixed())
        }
      
    }

    const [newOrderType, setNewOrderType] = useState<OrderType>(OrderType.NotSet);
    const [newOrderCustomerName, setNewOrderCustomerName] = useState("");
    const [newOrderCreatedByUserName, setNewOrderCreatedByUserName] = useState("");
    function resetNewOrderFields() {
        setNewOrderType(OrderType.NotSet)
        setNewOrderCustomerName("");
        setNewOrderCreatedByUserName("");
    }

    async function createNewOrder(): Promise<void> {
        const newOrder: Order = {
            orderId: 0,
            orderType: newOrderType,
            customerName: newOrderCustomerName,
            createdDate: new Date().toDateString(),
            createdByUserName: newOrderCreatedByUserName
        }
        var createdNewOrder = await OrderAPI.Create(newOrder)

        if (typeof (createdNewOrder) === 'number') {
            console.error("error fetching data");
        } else {
            let newOrderData = [...orderData, createdNewOrder];
            setOrderData(newOrderData);
            setCustomerFilterOptions([...getUniqueCustomersForFilter(newOrderData.map(order => order.customerName))]);
            resetNewOrderFields();
        }
    }

    const newOrderProps = {
        createNewOrder,
        newOrderType,
        setNewOrderType,
        newOrderCustomerName,
        setNewOrderCustomerName,
        newOrderCreatedByUserName,
        setNewOrderCreatedByUserName,
        orderTypes,
    }

    const orderListProps = {
        orders: orderData,
        selectedCustomerFilter,
        orderIdFilter
    }

    return <Page headerTitle={"Orders"}>
        <NewOrder {...newOrderProps} />
        <hr />
        <DropdownSelect
            options={customerFilterOptions}
            value={selectedCustomerFilter}
            placeholder="Filter by Customer"
            onSelectOption={setSelectedCustomerFilter}
        />
        <TextField
            type="number"
            id="orderIdFilter"
            label="Filter by Order ID"
            variant="outlined"
            value={orderIdFilter || ""}
            onChange={handleOrderIdFilterChange}
        />
        <OrderList {...orderListProps} />
    </Page>
}
