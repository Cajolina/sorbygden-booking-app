import { Button } from "antd";
import FacilityDatePicker from "./FacilityDatePicker";
import { useState } from "react";

// Define a type for the function that handles date selection
type OnDateSelectType = (startDate: string, endDate: string) => void;

function SelectedDateButton({
  onDateSelect,
}: {
  // Specify the type for the onDateSelect prop
  onDateSelect: OnDateSelectType;
}) {
  // State to manage the visibility of the date picker
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to toggle the visibility of the date picker
  const handleClickDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Function to handle date selection and pass it to the parent component
  const handleDateSelect: OnDateSelectType = (startDate, endDate) => {
    onDateSelect(startDate, endDate);
  };

  return (
    <>
      {/* Button to trigger the display of the date picker */}
      <Button
        type="primary"
        className="pickDateBtn"
        onClick={handleClickDatePicker}
      >
        Välj datum
      </Button>

      {/* Conditionally render the date picker based on showDatePicker state */}
      {showDatePicker && <FacilityDatePicker onDateSelect={handleDateSelect} />}
    </>
  );
}

export default SelectedDateButton;
