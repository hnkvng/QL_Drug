import React, { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker'

interface DatePickerComonentProps {
    title?: string,
    open: boolean,
    setOpen: (open : boolean) => void,
    handleChange: (value : string) => void,
}

const DatePickerComonent : React.FC<DatePickerComonentProps> = ({title, open, setOpen, handleChange}) : React.JSX.Element => {
  const [date, setDate] = useState(new Date());

  const handleDate = (dates : Date) => {
    const day = dates.getDate() < 10 ? "0" + dates.getDate() : dates.getDate();
    const month = dates.getMonth() + 1 < 10 ? "0" + (dates.getMonth() + 1): dates.getMonth() + 1;
    const year = dates.getFullYear();
    handleChange(`${year}-${month}-${day}`);
  }

  useEffect(() => {
    if(!open)
      setDate(new Date());
  },[open])

  return (
    <DatePicker
        modal
        title={title}
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
          setDate(date);
          handleDate(date);
          setOpen(false);
        }}
        onCancel={() => {
            setOpen(false);
        }}
        cancelText = "Đóng"
        confirmText = "Chọn"
        theme = 'light'
    />
  )
}

export default memo(DatePickerComonent);