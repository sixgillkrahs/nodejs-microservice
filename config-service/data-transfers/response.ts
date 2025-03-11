class Response {
    public code: number;
    public state: number;
    public data: any;
    public message: string;

    constructor(code: number, state: number, data: any, message: string) {
        this.code = code;
        this.state = state;
        this.data = data;
        this.message = message;
    }
}

export = Response;
