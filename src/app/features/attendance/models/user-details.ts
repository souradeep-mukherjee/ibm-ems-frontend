export interface UserDetails {
    success: boolean;
    message: string;
    data: {
        id: string;
        username: string;
        email: string;
        roles: ["ROLE_EMPLOYEE"];
        enabled: boolean;
        deleted: boolean;
    }
}