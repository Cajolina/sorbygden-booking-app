import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { DatePicker, Space } from "antd";
import { RangePickerProps } from "antd/es/date-picker/generatePicker";

// Add the customParseFormat and isSameOrBefore plugins to dayjs
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
    //Send values to function in Facilities
    onDateSelect(dateStrings[0], dateStrings[1]);
    // Generate the date range between the start and end dates
    const startDateRange = values[0];
    const endDateRange = values[1];
    if (startDateRange && endDateRange) {
      const dateRange = [];
      let currentDate: Dayjs = startDateRange;

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
        {/* Ant Design RangePicker component with specified configurations */}
        <RangePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          onChange={onChange}
          // Pass disabledDate and disabledTime functions to disable specific date/time ranges
          disabledDate={(current) =>
            current && current.isBefore(dayjs(), "day")
          }
          disabledTime={(current) => {
            if (!current) {
              return {
                disabledHours: () => [],
                disabledMinutes: () => [],
              };
            }

            return {
              disabledHours: () =>
                current.isSame(dayjs(), "day")
                  ? [...Array(dayjs().hour()).keys()]
                  : [],
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
