interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    subscription?: string;
    isActive?: boolean;
    lastLogin?: Date;
    preferences?: {
        categories?: string[];
        venues?: string[];
        maxPrice?: number;
        minSavings?: number;
        alertMethods?: string[];
    };
    createdAt: Date;
}
interface AlertHistory {
    id: string;
    userId: string;
    dealId: string;
    sentAt: Date;
    type: string;
}
interface PushSubscription {
    id: string;
    userId: string;
    endpoint: string;
    keys: any;
}
declare class SimpleDB {
    private users;
    private alertHistoryList;
    private pushSubscriptions;
    private idCounter;
    user: {
        findUnique: ({ where, select }: {
            where: {
                email?: string;
                id?: string;
            };
            select?: any;
        }) => Promise<User | null>;
        findMany: ({ where }: {
            where?: {
                isActive?: boolean;
            };
        }) => Promise<User[]>;
        create: ({ data }: {
            data: Omit<User, "id" | "createdAt">;
        }) => Promise<User>;
        update: ({ where, data }: {
            where: {
                id: string;
            };
            data: Partial<User>;
        }) => Promise<User>;
    };
    alertHistory: {
        findFirst: ({ where }: {
            where: {
                userId: string;
                dealId: string;
            };
        }) => Promise<AlertHistory | null>;
        create: ({ data }: {
            data: Omit<AlertHistory, "id">;
        }) => Promise<AlertHistory>;
    };
    pushSubscription: {
        findMany: ({ where }: {
            where: {
                userId: string;
            };
        }) => Promise<PushSubscription[]>;
        create: ({ data }: {
            data: Omit<PushSubscription, "id">;
        }) => Promise<PushSubscription>;
    };
}
export declare const db: SimpleDB;
export {};
//# sourceMappingURL=connection.d.ts.map