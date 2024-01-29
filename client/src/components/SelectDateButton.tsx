import { Button } from "antd";
import FacilityDatePicker from "./FacilityDatePicker";
import { useState } from "react";
import "../styling/Facilities.css";
function SelectedDateButton() {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleClickDatePicker = () => {
    setShowDatePicker(true);
  };
  return (
    <>
      <Button
        type="primary"
        className="pickDateBtn"
        onClick={handleClickDatePicker}
      >
        Välj datum
      </Button>
      {showDatePicker && <FacilityDatePicker />}
    </>
  );
}

export default SelectedDateButton;
