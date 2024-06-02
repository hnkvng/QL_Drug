import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { Text } from 'react-native-paper';

interface DatePickerComonentProps {
    title: string,
    textID: string,
    open: boolean,
    setOpen: any,
    setValues: any,
}

const DatePickerComonent : React.FC<DatePickerComonentProps> = ({title, textID, open, setOpen, setValues}) : React.JSX.Element => {
  const [date] = useState(new Date());

  return (
    <DatePicker
        modal
        title={`Chọn ${title}`}
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
            setOpen(false);
            const dateConfig = `${date.getDate() < 10 ? `0${date.getDate()}`: date.getDate()}/${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}`: date.getMonth() + 1}/${date.getFullYear()}`
            setValues((values : any)=> ({...values, [textID]: dateConfig}));
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

export default DatePickerComonent;
