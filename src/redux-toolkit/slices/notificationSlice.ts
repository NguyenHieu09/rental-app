// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ITable } from '../../types/table';
// import { INotification, NotificationStatus } from '../../types/notification';
// import { initDataTable } from '../../utils/initDataTable';
// import { fetchNotifications } from '../../api/api';

// interface NotificationState {
//     notifications: ITable<INotification>;
//     loading: boolean;
//     readNotificationsIds: string[];
//     count: number;
// }

// const initialState: NotificationState = {
//     notifications: initDataTable,
//     loading: false,
//     readNotificationsIds: [],
//     count: 0,
// };

// const notificationSlice = createSlice({
//     name: 'notifications',
//     initialState,
//     reducers: {
//         setNotifications: (state, action: PayloadAction<ITable<INotification>>) => {
//             const newNotifications = action.payload.data;
//             const lastNotificationId = state.notifications.data.at(-1)?.id;
//             if (lastNotificationId !== newNotifications.at(-1)?.id) {
//                 state.notifications.data.push(...newNotifications);
//             }
//             state.notifications.pageInfo = action.payload.pageInfo; // Cập nhật thông tin phân trang
//         },

//         // setNotifications: (state, action: PayloadAction<ITable<INotification>>) => {
//         //     const newNotifications = action.payload.data;
//         //     const lastNotificationId = state.notifications.data.at(-1)?.id;
//         //     if (lastNotificationId !== newNotifications.at(-1)?.id) {
//         //         state.notifications.data.push(...newNotifications);
//         //     }
//         //     // Cập nhật tất cả các thuộc tính của pageInfo
//         //     state.notifications.pageInfo = {
//         //         ...state.notifications.pageInfo,
//         //         ...action.payload.pageInfo,
//         //     };
//         // },
//         // setNotifications: (state, action: PayloadAction<ITable<INotification>>) => {
//         //     const newNotifications = action.payload.data;
//         //     const lastNotificationId = state.notifications.data.at(-1)?.id;
//         //     if (lastNotificationId !== newNotifications.at(-1)?.id) {
//         //         state.notifications.data.push(...newNotifications);
//         //     }
//         //     state.notifications.pageInfo = action.payload.pageInfo;
//         // },
//         setLoading: (state, action: PayloadAction<boolean>) => {
//             state.loading = action.payload;
//         },
//         updateStatus: (state, action: PayloadAction<{ id: string; status: NotificationStatus }>) => {
//             const { id, status } = action.payload;
//             const notification = state.notifications.data.find((n) => n.id === id);
//             if (notification) {
//                 notification.status = status;
//                 state.readNotificationsIds.push(id);
//             }
//         },
//         setCount: (state, action: PayloadAction<number>) => {
//             state.count = action.payload;
//         },
//         setReadNotificationsIds: (state, action: PayloadAction<string[]>) => {
//             state.readNotificationsIds = action.payload;
//         },
//         readNotification: (state, action: PayloadAction<string>) => {
//             const id = action.payload;
//             const notification = state.notifications.data.find((n) => n.id === id);
//             if (notification) {
//                 notification.status = 'READ';
//                 state.count = Math.max(state.count - 1, 0);
//             }
//         },
//         readAllNotifications: (state) => {
//             state.notifications.data.forEach((notification) => {
//                 notification.status = 'READ';
//             });
//             state.count = 0;
//         },
//         addNotification: (state, action: PayloadAction<INotification>) => {
//             state.notifications.data.unshift(action.payload);
//             state.count += 1;
//         },
//         resetNotifications: (state) => {
//             state.notifications = initDataTable; // Khôi phục lại dữ liệu ban đầu
//             state.loading = false;
//             state.readNotificationsIds = [];
//             state.count = 0;
//         },
//     },
// });

// export const {
//     setNotifications,
//     setLoading,
//     updateStatus,
//     setCount,
//     setReadNotificationsIds,
//     readNotification,
//     readAllNotifications,
//     addNotification,
//     resetNotifications,
// } = notificationSlice.actions;


// export default notificationSlice.reducer;


import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITable } from '../../types/table';
import { INotification, NotificationStatus } from '../../types/notification';
import { initDataTable } from '../../utils/initDataTable';
import { fetchNotifications } from '../../api/api';

interface NotificationState {
    notifications: ITable<INotification>;
    loading: boolean;
    readNotificationsIds: string[];
    count: number;
}

const initialState: NotificationState = {
    notifications: initDataTable,
    loading: false,
    readNotificationsIds: [],
    count: 0,
};


const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<ITable<INotification>>) => {
            const newNotifications = action.payload.data;
            const lastNotificationId = state.notifications.data.at(-1)?.id;
            if (lastNotificationId !== newNotifications.at(-1)?.id) {
                state.notifications.data.push(...newNotifications);
            }
            state.notifications.pageInfo = {
                ...state.notifications.pageInfo,
                ...action.payload.pageInfo,
            };
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        updateStatus: (state, action: PayloadAction<{ id: string; status: NotificationStatus }>) => {
            const { id, status } = action.payload;
            const notification = state.notifications.data.find((n) => n.id === id);
            if (notification) {
                notification.status = status;
                state.readNotificationsIds.push(id);
            }
        },
        setCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
        setReadNotificationsIds: (state, action: PayloadAction<string[]>) => {
            state.readNotificationsIds = action.payload;
        },
        readNotification: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const notification = state.notifications.data.find((n) => n.id === id);
            if (notification) {
                notification.status = 'READ';
                state.count = Math.max(state.count - 1, 0);
            }
        },
        readAllNotifications: (state) => {
            state.notifications.data.forEach((notification) => {
                notification.status = 'READ';
            });
            state.count = 0;
        },
        addNotification: (state, action: PayloadAction<INotification>) => {
            state.notifications.data.unshift(action.payload);
            state.count += 1;
        },
        resetNotifications: (state) => {
            state.notifications = initDataTable;
            state.loading = false;
            state.readNotificationsIds = [];
            state.count = 0;
        },
    },

});

export const {
    setNotifications,
    setLoading,
    updateStatus,
    setCount,
    setReadNotificationsIds,
    readNotification,
    readAllNotifications,
    addNotification,
    resetNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
