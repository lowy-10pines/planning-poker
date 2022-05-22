export default interface Room {
    isEmpty: boolean;
    code: string;
    issue: string;
    participants: {[id: string]: string};
    voting: boolean;
}