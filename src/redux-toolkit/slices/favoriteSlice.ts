// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { IPropertyInteraction } from '../../types/propertyInteraction';
// import { getFavoriteProperties } from '../../api/api';
// import { AppDispatch } from '../../redux-toolkit/store';
// import { ITable } from '../../types/table';
// import { initDataTable } from '../../utils/initDataTable';


// interface FavoriteState {
//     isFirstLoad: boolean;
//     count: number;
//     favorites: IPropertyInteraction[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: FavoriteState = {
//     isFirstLoad: false,
//     count: 0,
//     favorites: [],
//     loading: false,
//     error: null,
// };

// const favoriteSlice = createSlice({
//     name: 'favorite',
//     initialState,
//     reducers: {
//         increment(state) {
//             state.count += 1;
//         },
//         decrement(state) {
//             state.count = Math.max(0, state.count - 1); // Đảm bảo không âm
//         },
//         addFavorite(state, action: PayloadAction<IPropertyInteraction>) {
//             state.favorites.push(action.payload);
//             state.count += 1;
//         },
//         setLoading(state, action: PayloadAction<boolean>) {
//             state.loading = action.payload;
//         },
//         setCount(state, action: PayloadAction<number>) {
//             state.count = action.payload;
//         },
//         setFirstLoad(state, action: PayloadAction<boolean>) {
//             state.isFirstLoad = action.payload;
//         },
//         setFavorites(state, action: PayloadAction<IPropertyInteraction[]>) {
//             // Thêm trường isFavorite vào mỗi item trong property
//             const updatedFavorites = action.payload.map(item => ({
//                 ...item,
//                 property: {
//                     ...item.property,
//                     isFavorite: true,
//                 },
//             }));
//             state.favorites = updatedFavorites;
//             state.count = updatedFavorites.length; // Cập nhật count
//         },
//         setError(state, action: PayloadAction<string | null>) {
//             state.error = action.payload;
//         },
//     },
// });

// export const { increment, decrement, addFavorite, setLoading, setCount, setFirstLoad, setFavorites, setError } = favoriteSlice.actions;

// // Thunk để load danh sách yêu thích từ API
// export const fetchFavoriteProperties = () => async (dispatch: AppDispatch) => {
//     dispatch(setLoading(true));
//     try {
//         const data = await getFavoriteProperties();
//         console.log(data.data);

//         // Cập nhật favorites với dữ liệu đã thêm isFavorite
//         dispatch(setFavorites(data.data));
//         dispatch(setFirstLoad(true));
//         dispatch(setLoading(false));
//     } catch (error: any) {
//         dispatch(setError(error?.message || 'Failed to fetch favorite properties'));
//         dispatch(setLoading(false));
//     }
// };

// export default favoriteSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPropertyInteraction } from '../../types/propertyInteraction';
import { getFavoriteProperties } from '../../api/api';
import { AppDispatch } from '../../redux-toolkit/store';
import { ITable } from '../../types/table';
import { initDataTable } from '../../utils/initDataTable';
interface FavoriteState {
    isFirstLoad: boolean;
    count: number;
    favorites: IPropertyInteraction[];
    loading: boolean;
    error: string | null;
    pageInfo: { current: number; pageSize: number; total: number };
}

const initialState: FavoriteState = {
    isFirstLoad: false,
    count: 0,
    favorites: [],
    loading: false,
    error: null,
    pageInfo: { current: 1, pageSize: 10, total: 0 },
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        increment(state) {
            state.count += 1;
        },
        decrement(state) {
            state.count = Math.max(0, state.count - 1); // Đảm bảo không âm
        },
        addFavorite(state, action: PayloadAction<IPropertyInteraction>) {
            state.favorites.push(action.payload);
            state.count += 1;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        },
        setFirstLoad(state, action: PayloadAction<boolean>) {
            state.isFirstLoad = action.payload;
        },
        setFavorites(state, action: PayloadAction<{ data: IPropertyInteraction[], pageInfo: { current: number, pageSize: number, total: number } }>) {
            const updatedFavorites = action.payload.data.map(item => ({
                ...item,
                property: {
                    ...item.property,
                    isFavorite: true,
                },
            }));

            // Loại bỏ các mục đã có trong favorites để tránh trùng lặp
            const newFavorites = [
                ...state.favorites,
                ...updatedFavorites.filter(
                    (newItem) => !state.favorites.some((existingItem) => existingItem.interactionId === newItem.interactionId)
                ),
            ];

            state.favorites = newFavorites; // Cập nhật favorites không trùng lặp
            state.count = newFavorites.length; // Cập nhật số lượng
            state.pageInfo = action.payload.pageInfo; // Cập nhật thông tin phân trang
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        resetFavorites(state) {
            state.favorites = [];
            state.pageInfo = { current: 1, pageSize: 10, total: 0 };
        },
    },
});

export const { increment, decrement, addFavorite, setLoading, setCount, setFirstLoad, setFavorites, setError, resetFavorites } = favoriteSlice.actions;


export default favoriteSlice.reducer;

