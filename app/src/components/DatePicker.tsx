import React, { memo, useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker'

interface DatePickerComonentProps {
    title?: string,
    open: boolean,
    setOpen: (open : boolean) => void,
    handleChange: (value : string) => void,
}

const DatePickerComonent : React.FC<DatePickerComonentProps> = ({title, open, setOpen, handleChange}) : React.JSX.Element => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const day = date.getDate() < 10 ? 0 + date.getDate() : date.getDate();
    const month = date.getMonth() + 1 < 10 ? 0 + date.getMonth() + 1 : date.getMonth() + 1;
    const year = date.getFullYear();
    handleChange(`${year}-${month}-${day}`);
  },[date])

  return (
    <DatePicker
        modal
        title={title}
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
          setDate(date)
          setOpen(false)
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