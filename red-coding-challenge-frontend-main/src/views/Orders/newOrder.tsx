// This is a React component called NewOrder, which renders a form for creating a new order. It receives several 
// props:

// createNewOrder: a function that creates a new order when the "Create New Order" button is clicked.
// newOrderType: the type of the new order, represented as an enum value of type OrderType.
// setNewOrderType: a function that updates the value of newOrderType.
// newOrderCustomerName: the name of the customer for the new order.
// setNewOrderCustomerName: a function that updates the value of newOrderCustomerName.
// newOrderCreatedByUserName: the user name of the creator of the new order.
// setNewOrderCreatedByUserName: a function that updates the value of newOrderCreatedByUserName.
// orderTypes: an array of possible order types.
// The component renders a form with three fields: a select field for the order type, a text field 
// for the customer name, and a text field for the user name of the creator. The select field
// is populated with options based on the orderTypes prop. When the "Create New Order" button is clicked, 
// the createNewOrder function is called, as long as all required fields are filled out

import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { OrderType } from '../../types/order';

interface INewOrderProps {
    createNewOrder: () => Promise<void>,
    newOrderType: OrderType,
    setNewOrderType: React.Dispatch<React.SetStateAction<OrderType>>,
    newOrderCustomerName: string,
    setNewOrderCustomerName: React.Dispatch<React.SetStateAction<string>>,
    newOrderCreatedByUserName: string,
    setNewOrderCreatedByUserName: React.Dispatch<React.SetStateAction<string>>
    orderTypes: OrderType[];
}

export function NewOrder(props: INewOrderProps): JSX.Element {
    const {
        createNewOrder,
        newOrderType,
        setNewOrderType,
        newOrderCustomerName,
        setNewOrderCustomerName,
        newOrderCreatedByUserName,
        setNewOrderCreatedByUserName,
        orderTypes,
    } = props;
    const canCreateNewOrder = newOrderType !== OrderType.NotSet && newOrderCustomerName.length > 0 && newOrderCreatedByUserName.length > 0;
    const handleSelectOrderTypeChange = (event: SelectChangeEvent) => {
        setNewOrderType(OrderType[event.target.value as keyof typeof OrderType]);
    };
    return <Stack>
        <InputLabel id="selectNewOrderTypeLabel">Order Type</InputLabel>
        <Select
            labelId="selectNewOrderTypeLabel"
            id="selectNewOrderType"
            value={newOrderType}
            label="Order Type"
            onChange={handleSelectOrderTypeChange}
        >
            {orderTypes.map(orderType => {
                return <MenuItem key={orderType} value={orderType}>{orderType}</MenuItem>
            })}
        </Select>
        <TextField
            id="newCustomerOrderName"
            label="Customer Name"
            variant="outlined"
            value={newOrderCustomerName}
            onChange={e => setNewOrderCustomerName(e.currentTarget.value)}
        />
        <TextField
            id="newOrderCreatedByUserName"
            label="Created By User Name"
            variant="outlined"
            value={newOrderCreatedByUserName}
            onChange={e => setNewOrderCreatedByUserName(e.currentTarget.value)} 
        />
        <Button onClick={createNewOrder} disabled={!canCreateNewOrder}>Create New Order</Button>
    </Stack>
}