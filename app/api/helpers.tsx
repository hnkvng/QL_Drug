export const fetchApiData = async (apiFunction : any, data : any | any, Thunk : any) => {
    try {
        const response = await apiFunction(data);
        return response.data;
    } catch (error : any) {
        return Thunk.rejectWithValue(error.response.data);
    }
};