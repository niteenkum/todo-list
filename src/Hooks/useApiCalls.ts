import { BASE_URL } from "../utils/constants";

export const useApiCalls = () => {
    /**
     * @description - This hook is used to make API calls to the server.
     * @param url It takes url as parameter
     * @param param1 It takes method as parameter
     * @returns It returns the response of the api call
     */
    const customFetch = async (url: string, { body, ...customConfig }: any) => {
        const token = localStorage.getItem('token');
        const headers: any = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        const config = {
            ...customConfig,
            headers: {
                ...headers,
                ...customConfig.headers
            },
        };
        if (body) {
            config.body = JSON.stringify(body);
        }
        try {
            const response: any = await fetch(url, config);
            const data = await response.json();
            if (data) {
                return {
                    data: data,
                    success: true,
                    message: data?.message,
                };
            }
            throw new Error(data?.message);
        }
        catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    /**
     * @description - This hook is used to make API calls to the server by using customfetch hook.    
     * @returns It returns the response of the api call.
     * @param url It doesnot take any parameter because it fetches all the data from the server.
     */
    const getTodoList = () => {
        return customFetch(BASE_URL, {
            method: 'GET',
        });
    };

    /**
     * @description - This hook is used to make API calls to the server by using customfetch hook to add new todo item in the todo list.
     * @param todo It takes title, description and userId as parameter.
     * @returns It returns the response of the api call.
     * */
    const addTodoTask = (title: string, description: string, userID: number) => {
        return customFetch(BASE_URL, {
            body: {
                title: title,
                description: description,
                userID: userID,
            },
            method: 'Post',
        });
    };

    /**
     * @description - This hook is used to make API calls to the server by using customfetch hook to update the todo item in the todo list.
     * @param todo It takes id, title and userId as parameter.
     * @returns It returns the response of the api call.
     * */

    const updateTodoTask = (id: number, title: string, userID: number) => {
        return customFetch(BASE_URL + "/" + id, {
            body: {
                id: id,
                title: title,
                userID: userID,
            },
            method: 'Put',
        });
    }

    /**
     * @description - This hook is used to make API calls to the server by using customfetch hook to delete the todo item from the todo list.
     * @param todo It takes id as parameter.
     * @returns It returns the response of the api call.
     * */
    const deleteTodoTask = (id: number) => {
        return customFetch(BASE_URL + "/" + id, {
            method: 'Delete',
        });
    }

    return {
        getTodoList,
        addTodoTask,
        updateTodoTask,
        deleteTodoTask,
    }
}
