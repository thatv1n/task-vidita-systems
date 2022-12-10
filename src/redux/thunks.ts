import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from "../api/api";
import {DocType} from "../types";


export const fetchDocs = createAsyncThunk('main/docs', async () => {
    const data :DocType[] | undefined = await api.fetchDoc()
    return data;
});


