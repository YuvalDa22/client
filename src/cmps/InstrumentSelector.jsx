import { Select } from "@chakra-ui/react";

function InstrumentSelector({ value, onChange }) {
    return (
        <Select
            placeholder = "Select instrument"
            value = {value}
            onChange = {onChange}
            >
                <option value="vocals">Vocals</option>
                <option value="guitar">Guitar</option>
                <option value="drums">Drums</option>
                <option value="bass">Bass</option>
                <option value="saxophone">Saxophone</option>
                <option value="keyboards">Keyboards</option>
            </Select>
    )
}
export default InstrumentSelector;