export interface UserClient {
    uid: string;
    credentialToken: string;
    email: string;
    displayName: string;
    photoURL: string;
    phoneNumber?: string;
}