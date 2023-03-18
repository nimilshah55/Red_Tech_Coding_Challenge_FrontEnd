// The component takes in four props:

// options: An array of SelectOption objects, which define the options that will be displayed in the dropdown menu.
// Each object has a label property for the display text and a value property for the option value.
// placeholder (optional): A string to display as the placeholder text in the select menu when no option is selected.
// onSelectOption: A callback function that is called when an option is selected.
// It takes a single argument value, which is the SelectOption object that was selected, or undefined 
// if the "clear" button was clicked.
// value: The currently selected SelectOption object, or undefined if no option is currently selected.
// The DropdownSelect component renders the Select component from the react-select library,
// passing in the options, placeholder, value, and onChange props. The onChange prop is a function that is 
// called whenever an option is selected or cleared. It checks whether a valid value object was passed, and calls 
// onSelectOption with that object or undefined as appropriate.

// The isClearable prop is also passed to the Select component to enable the "clear" button in the select menu, 
// which allows the user to clear the currently selected option.

import React from "react";
import Select from "react-select";

interface IProps {
    options: SelectOption[];
    placeholder?: string;
    onSelectOption: (value?: SelectOption) => void;
    value: SelectOption | undefined;
}

export type SelectOption = {
    label: string;
    value: any;
}

export default function DropdownSelect(props: IProps) {
    const { options, placeholder, onSelectOption, value } = props;

    return <Select 
        options={options}
        value={value}
        placeholder={placeholder || "Select an option..."}
        onChange={(value) => {
            if (value) {
                onSelectOption(value);
            } else {
                onSelectOption(undefined);
            }
        }}
        isClearable
    />
}