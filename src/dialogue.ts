export interface Message {
    text: string
}


export interface MessageOptions extends Message {
    options: {text: string, next: string}[]
    next?: never
}


export interface MessageNext extends Message {
    options?: never
    next: string
}


export function isOptions(message: Message): message is MessageOptions {
    return (message as MessageOptions).options !== undefined
}


export function isNext(message: Message): message is MessageNext {
    return (message as MessageNext).next !== undefined
}


export type Dialogue = {
    [label: string]: MessageOptions | MessageNext | Message;
}


export const dialogue: Dialogue = {
    begin: {
        text: "Hello! I am the portfolio helper. Welcome to Jon's portfolio.",
        next: "firstQuestion"
    },

    firstQuestion: {
        text: "How may I help you?",
        options: [
            {text: "Which schools did Jon attend?", next: "school"},
            {text: "Which projects is Jon currently working on?", next: "projects"},
            {text: "Tell me about Jon's hobbies.", next: "hobbies"},
            {text: "Tell me a joke!", next: "joke"},
            {text: "All finished!", next: "end"},
        ]
    },

    school: {
        text: "This is a placeholder for school.",
        next: "firstQuestion"
    },

    projects: {
        text: "This is a placeholder for projects.",
        next: "firstQuestion"
    },

    hobbies: {
        text: "This is a placeholder for hobbies.",
        next: "firstQuestion"
    },

    joke: {
        text: "This is a placeholder for a joke.",
        next: "firstQuestion"
    },

    end: {
        text: "Thank you for visiting!"
    }
}