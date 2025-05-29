export interface Message {
    id: string;
    content: string;
    createdAt: Date;
    user: {
        id: string;
        username: string;
        color: string;
    };
}