import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { DatePicker, Space } from "antd";
import { RangePickerProps } from "antd/es/date-picker/generatePicker";

// Extend dayjs with customParseFormat and isSameOrBefore plugins
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);

const FacilityDatePicker: React.FC<{
  onDateSelect: (startDate: string, endDate: string) => void;
}> = ({ onDateSelect }) => {
  // Destructure the RangePicker component from antd's DatePicker
  const { RangePicker } = DatePicker;

  // Function to handle the change event of the RangePicker
  const onChange: RangePickerProps<Dayjs>["onChange"] = (
    values,
    dateStrings
  ) => {
    // Check if valid values are received (both start and end)
    if (!values || values.length !== 2) {
      return;
    }

    console.log("Selected Time: ", values);
    console.log("Formatted Selected Time: ", dateStrings);

    // Send values to the function in Facilities component
    onDateSelect(dateStrings[0], dateStrings[1]);

    const startDateRange = values[0];
    const endDateRange = values[1];
    if (startDateRange && endDateRange) {
      const dateRange = [];
      let currentDate: Dayjs = startDateRange;

      // Generate the date range between the start and end dates
      while (currentDate.isSameOrBefore(endDateRange, "day")) {
        dateRange.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.add(1, "day");
      }

      console.log("Date Range: ", dateRange);
    }
  };

  return (
    <div>
      <Space direction="vertical" size={12}>
        {/* Display Ant Design RangePicker component with specified configurations */}
        <RangePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          onChange={onChange}
          // Pass disabledDate and disabledTime functions to disable specific date/time ranges

          // Disable dates before the current day
          disabledDate={(current) =>
            current && current.isBefore(dayjs(), "day")
          }
          // Disable hours and minutes based on the current time
          disabledTime={(current) => {
            if (!current) {
              return {
                disabledHours: () => [],
                disabledMinutes: () => [],
              };
            }

            return {
              // Disable hours before the current hour if the date is the same as the current day
              disabledHours: () =>
                current.isSame(dayjs(), "day")
                  ? [...Array(dayjs().hour()).keys()]
                  : [],
              // Disable minutes before the current minute if the date and hour are the same as the current time
              disabledMinutes: (selectedHour: number) =>
                current.isSame(dayjs(), "day") &&
                selectedHour === dayjs().hour()
                  ? [...Array(dayjs().minute()).keys()]
                  : [],
            };
          }}
        />
      </Space>
    </div>
  );
};

export default FacilityDatePicker;
