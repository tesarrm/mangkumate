import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration, setAuthLoading, setAuthError } from "./authSlice";

interface RegistrationResponse {
    message: string;
    activationToken: string;
}

interface LoginResponse {
    accessToken: string;
    user: string;
}

interface RegistrationData {
    email: string;
    password: string;
    name: string;
}

interface LoginData {
    email: string;
    password: string;
}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "registration",
                method: "POST",
                body: data,
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(setAuthLoading(true)); // Set loading true on start
                    const result = await queryFulfilled;
                    dispatch(userRegistration({ token: result.data.activationToken }));
                    dispatch(setAuthLoading(false)); // Set loading false on success
                } catch (error: any) {
                    dispatch(setAuthError("Registration failed"));
                    dispatch(setAuthLoading(false)); // Set loading false on error
                }
            }
        }),
        
        login: builder.mutation<LoginResponse, LoginData>({
            query: ({ email, password }) => ({
                url: "login",
                method: "POST",
                body: { email, password },
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(setAuthLoading(true)); // Set loading true on start
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ accessToken: result.data.accessToken, user: result.data.user }));
                    dispatch(setAuthLoading(false)); // Set loading false on success
                } catch (error: any) {
                    dispatch(setAuthError("Login failed"));
                    dispatch(setAuthLoading(false)); // Set loading false on error
                }
            }
        }),

        logout: builder.query({
            query: () => ({
                url: "logout",
                method: "GET",
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(setAuthLoading(true)); // Set loading true on start
                    await queryFulfilled;
                    dispatch(userLoggedOut());
                    dispatch(setAuthLoading(false)); // Set loading false on success
                } catch (error: any) {
                    dispatch(setAuthError("Logout failed"));
                    dispatch(setAuthLoading(false)); // Set loading false on error
                }
            }
        })
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutQuery
} = authApi;
