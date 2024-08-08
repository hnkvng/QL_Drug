import { createNumberMask } from 'react-native-mask-input';
import { FormDrug } from './interface';
import { InputModeType } from './type';


export const numberMark = createNumberMask({
    delimiter: '',
    precision: 0,
});

export const vndMark = createNumberMask({
    delimiter: '.',
    separator: '',
    precision: 0,
})

export const DATABASE = {
    name: 'Medicine',
    location: '~Medicine.db',
    table: {
        Drug: {
            name: 'Drug',
            column: [
                'MST',
                'avatar',
                'tenThuoc',
                'NSX',
                'HSD'
            ]
        },
        DrugDetail: {
            name: 'Drug_Detail',
            column: [
                'MSTCT',
                'soDangKy',
                'huongDanSuDung',
                'hoatChat',
                'nongDo',
                'baoChe',
                'dongGoi',
                'tuoiTho',
                'congTySx',
                'nuocSx',
                'diaChiSx',
                'congTyDk',
                'nuocDk',
                'diaChiDk',
                'nhomThuoc',
                'Drug_Id',
            ]
        },
        Price: {
            name: 'Price',
            column: [
                'MSG',
                'giaBan',
                'donVi',
                'quyCach',
                'Drug_Id',
            ]
        },
        Storage: {
            name: 'Storage',
            column: [
                'MSK',
                'donViTinh',
                'soLuongTonKho',
                'Drug_Id',
            ],
        },
        Sell: {
            name: 'Sell',
            column: [
                'MSB',
                'soTien',
                'ngayTao',
            ],
        },
    }
}

export const ADD_FORM = {
    initValue: {
        avatar: '',
        MST: '',
        tenThuoc: '',
        NSX: '',
        HSD: '',
        giaBan: [],
        huongDanSuDung: '',
        soDangKy: '',
        hoatChat: '',
        nongDo: '',
        baoChe: '',
        dongGoi: '',
        tuoiTho:'',
        congTySx: '',
        nuocSx: '',
        diaChiSx: '',
        congTyDk: '',
        nuocDk: '',
        diaChiDk: '',
        nhomThuoc: '',
    } as FormDrug,
    label: {
        avatar: 'Thêm ảnh',
        MST: 'Mã số thuốc',
        tenThuoc: 'Tên thuốc',
        NSX: 'Ngày sản xuất',
        HSD: 'Hạn sử dụng',
        giaBan: 'Giá',
        huongDanSuDung:'Hướng dẫn sử dụng',
        soDangKy: 'Số đăng ký',
        hoatChat: 'Hoạt chất',
        nongDo: 'Nồng độ',
        baoChe: 'Bào chế',
        dongGoi: 'Quy cách đống gói',
        tuoiTho:'Tuổi thọ',
        congTySx: 'Công ty sản xuất',
        nuocSx: 'Nước sản xuất',
        diaChiSx: 'Địa chỉ sản xuất',
        congTyDk: 'Công ty đăng ký',
        nuocDk: 'Nước đăng ký',
        diaChiDk: 'Địa chỉ đăng ký',
        nhomThuoc: 'Nhóm thuốc',
    },
    maxLength: {
        MST: 13,
        tenThuoc: 255,
        huongDanSuDung: 1000,
    },
    inputMode: {
        MST: 'numeric' as InputModeType,
        tenThuoc: 'text' as InputModeType,
        NSX: 'numeric' as InputModeType,
        HSD: 'numeric' as InputModeType,
        huongDanSuDung: 'text' as InputModeType,
    },
    placeholder: {
        MST: 'Nhập mã số thuốc',
        tenThuoc: 'Nhập tên thuốc',
        NSX: 'Chọn ngày sản xuất',
        HSD: 'Chọn hạn sử dụng',
        huongDanSuDung: 'Nhập hướng dẫn cho thuốc',
    },
    iconRight: {
        MST: 'barcode-scan',
        NSX: 'calendar-month',
        HSD: 'calendar-month',
        giaBan: 'cash-multiple',
    },
    iconLeft: {
        MST: 'barcode',
        tenThuoc: 'medicinebox',
        huongDanSuDung: 'tag-text'
    }
}

export const UPDATE_FORM = {
    initValue: {
        avatar: '',
        MST: '',
        tenThuoc: '',
        NSX: '',
        HSD: '',
        giaBan: [],
        huongDanSuDung: '',
        soDangKy: '',
        hoatChat: '',
        nongDo: '',
        baoChe: '',
        dongGoi: '',
        tuoiTho:'',
        congTySx: '',
        nuocSx: '',
        diaChiSx: '',
        congTyDk: '',
        nuocDk: '',
        diaChiDk: '',
        nhomThuoc: '',
    } as FormDrug,
    label: {
        avatar: 'Thêm ảnh',
        MST: 'Mã số thuốc',
        tenThuoc: 'Tên thuốc',
        NSX: 'Ngày sản xuất',
        HSD: 'Hạn sử dụng',
        giaBan: (donVi: string) => `Giá/${donVi}`,
        huongDanSuDung:'Hướng dẫn sử dụng',
        soDangKy: 'Số đăng ký',
        hoatChat: 'Hoạt chất',
        nongDo: 'Nồng độ',
        baoChe: 'Bào chế',
        dongGoi: 'Quy cách đống gói',
        tuoiTho:'Tuổi thọ',
        congTySx: 'Công ty sản xuất',
        nuocSx: 'Nước sản xuất',
        diaChiSx: 'Địa chỉ sản xuất',
        congTyDk: 'Công ty đăng ký',
        nuocDk: 'Nước đăng ký',
        diaChiDk: 'Địa chỉ đăng ký',
        nhomThuoc: 'Nhóm thuốc',
    },
    maxLength: {
        MST: 13,
        tenThuoc: 255,
        huongDanSuDung: 1000,
    },
    inputMode: {
        MST: 'numeric' as InputModeType,
        tenThuoc: 'text' as InputModeType,
        NSX: 'numeric' as InputModeType,
        HSD: 'numeric' as InputModeType,
        giaBan: 'numeric' as InputModeType,
        huongDanSuDung: 'text' as InputModeType,
    },
    placeholder: {
        MST: 'Nhập mã số thuốc',
        tenThuoc: 'Nhập tên thuốc',
        NSX: 'Chọn ngày sản xuất',
        HSD: 'Chọn hạn sử dụng',
        giaBan: 'Nhập giá bán',
        huongDanSuDung: 'Nhập hướng dẫn cho thuốc',
    },
    iconRight: {
        MST: 'barcode-scan',
        NSX: 'calendar-month',
        HSD: 'calendar-month',
    },
    iconLeft: {
        MST: 'barcode',
        tenThuoc: 'medicinebox',
        huongDanSuDung: 'tag-text'
    }
}

export const PRICE_ADD_FORM  = {
    initValue: {
        giaBan: '',
        donVi: '',
        quyCach: '',
    },
    label:  {
        giaBan: 'Giá bán',
        donVi: 'Đơn vị',
        quyCach: 'Quy cách',
    },
    inputMode: {
        giaBan: 'numeric' as InputModeType,
        donVi: 'text' as InputModeType,
        quyCach: 'numeric' as InputModeType,
    },
    placeholder: {
        giaBan: 'Nhập giá bán',
        donVi: 'Nhập đơn vị',
        quyCach: 'Nhập quy cách có trên bao bì',
    },
    maxLength: {
        donVi: 255,
        quyCach: 4,
    }
}

export const ADD_OR_REDUCE_FORM  = {
    initValue: {
        soLuong: '',
        donVi: '',
        themBot: '',
    },
    label:  {
        soLuong: 'Số lượng',
        donVi: 'Đơn vị',
        themBot: 'Thêm/Bớt',
        
    },
    inputMode: {
        soLuong: 'numeric' as InputModeType,
    },
    placeholder: {
        soLuong: 'Nhập số lượng cận thêm hoặc bớt',
        donVi: 'Chọn đơn vị',
        themBot: 'Chọn thêm hoặc bớt',
    },
    maxLength: {
        soLuong: 3,
    }
}

export const BAR_CHART = {
    labels: {
        day:  Array.from({ length: 24 }, (_, i) => `${i}:00`),
        month: (month : number, year: number) => {
            const daysInMonth = [];
            const date = new Date(year, month, 2);

            while (date.getMonth() === month) {
                daysInMonth.push(new Date(date).toISOString().split('T')[0]);
                date.setDate(date.getDate() + 1);
            }
            
            const addDateLast = new Date(daysInMonth[daysInMonth.length - 1]);
            addDateLast.setDate(addDateLast.getDate() + 1)
            daysInMonth.push(new Date(addDateLast).toISOString().split('T')[0]);

            return daysInMonth.map(day => `Ngày ${day.split('-')[2]}`);
        },
        year: Array.from({ length: 12}, (_, i) => `Tháng ${i + 1}`)
    },
    datas: {
        day: (
            earnInDay: {
                hours: number,
                money: number,
            }[]
        ) => BAR_CHART.labels.day.map((value) => {

            return earnInDay.reduce((sum, item) => {
                if(parseInt(value.split(':')[0]) === item.hours) {
                    sum += item.money;
                }
                return sum
            },0)
        }),
        month: (
            dayInMonth: string[],
            earnInMonth: {
                day: number,
                money: number,
            }[]
        ) => {
            return dayInMonth.map((value) => {
                return earnInMonth.reduce((sum, item) => {
                    if(parseInt(value.split(' ')[1]) === item.day) {
                        sum += item.money;
                    }
                    return sum;
                },0)
            })
        },
        year: (
            earnInYear: {
                month: number,
                money: number,
            }[],
        ) => BAR_CHART.labels.year.map((value) => {
            return earnInYear.reduce((sum, item) => {
                if(parseInt(value.split(' ')[1]) === item.month) {
                    sum += item.money;
                }
                return sum;
            },0)
        })
            
        
    }
}

export const STATUS = {
    susscess: {
        icon: 'check',
        color: 'green'
    },
    warning: {
        icon: 'alert',
        color: 'orange'
    },
    error: {
        icon: 'alert-circle-outline',
        color: 'red',
    }
}

export const MESSAGE = {
    default: {
        icon: undefined,
        color: 'black'
    },
    addInfoDrug: {
        loading: 'Đang thêm thuốc',
        susscess: {
            ...STATUS.susscess,
            message: 'Thêm thuốc thành công'
        },
        warning: {
            sameId: {
                ...STATUS.warning,
                message: 'Mã số thuốc đã tồn tại',
            },
            sameDrug: {
                ...STATUS.warning,
                message: 'Thuốc đã tồn tại',
            }
        },
    },
    updateInfoDrug: {
        loading: 'Đang thay đổi thuốc',
        susscess: {
            ...STATUS.susscess,
            message: 'Thây đổi thuốc thành công'
        },
        warning: {
            sameId: {
                ...STATUS.warning,
                message: 'Mã số thuốc đã tồn tại',
            },
            sameDrug: {
                ...STATUS.warning,
                message: 'Thuốc đã tồn tại',
            },
            changePaking: {
                ...STATUS.warning,
                message: 'Thuốc đã bán không thể thay đổi quy cách'
            },
        },
    },
    deleteDrug: {
        loading: 'Đang xóa thuốc',
        susscess: {
            ...STATUS.susscess,
            message: 'Xóa thuốc thành công'
        },
        warning: {
            notId: {
                ...STATUS.warning,
                message: 'Mã số thuốc không tồn tại',
            },
        },
    },
    addOrReduceDrug: {
        loading: 'Đang thực hiện',
        susscess: (action: string) => ({
            ...STATUS.susscess,
            message: `${action} số lượng thuốc thành công`
        }),
        warning: {
            qualityIvalid: {
                ...STATUS.warning,
                message: 'Số lượng bớt lớn hơn số lượng hiện có trong kho',
            },
            maxStorage: {
                ...STATUS.warning,
                message: 'Đã vượt quá mức lưu trữ của kho',
            },
        },
    },
    sellDrug: {
        loading: 'Đang thanh toán',
        susscess: {
            ...STATUS.susscess,
            message: 'Thanh toán thành công'
        },
        warning: {
            qualityIvalid: (tenThuoc: string, soLuongTonKho: number, donVi: string) => ({
                ...STATUS.warning,
                message: `Số lượng có thể bán của thuốc ${tenThuoc} hiện tại chỉ còn ${soLuongTonKho}/${donVi}`,
            }),
        },
    },
    error: {
        ...STATUS.error,
        message: 'lỗi hệ thống, vui lòng liên hệ nhà phát triển!'
    }
}