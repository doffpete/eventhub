import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

type RadioOption = {
  value: string;
  label: string;
};

type RadioType = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: RadioOption[];
  row: boolean;
};

const RadioButtonGroup = ({ value, handleChange, options, row }: RadioType) => {
  return (
    <FormControl>
      <RadioGroup
        row={row}
        aria-labelledby="controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.label}
            value={option.value}
            label={option.label}
            control={<Radio />}
            sx={{
              ".MuiFormControlLabel-label": {
                fontSize: "0.875rem",
              },
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;
