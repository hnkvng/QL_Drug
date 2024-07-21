class FetchApi {
    baseUrl : string;
    constructor(baseUrl : string) {
        this.baseUrl = baseUrl;
    }

    async get(endpoint : string) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await this.handleResponse(response);
        } catch (error) {
            this.handleError(error);
        }
    }

    async post(endpoint : string, data : Object) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await this.handleResponse(response);
        } catch (error) {
            this.handleError(error);
        }
    }

    async put(endpoint : string, data : Object) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await this.handleResponse(response);
        } catch (error : any) {
            this.handleError(error);
        }
    }

    async delete(endpoint : string) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await this.handleResponse(response);
        } catch (error : any) {
            this.handleError(error);
        }
    }

    async handleResponse(response : any) {
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        return await response.json();
    }

    handleError(error : any) {
        console.error('FetchApi Error:', error);
        throw error;
    }
}

export default FetchApi;

