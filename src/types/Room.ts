export default interface Room {
    isEmpty: boolean;
    code: string;
    issue: string;
    participants: Array<{id: string, name: string}>
    voting: boolean;
}