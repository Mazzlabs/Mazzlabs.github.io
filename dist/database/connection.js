"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
class SimpleDB {
    constructor() {
        this.users = [];
        this.alertHistoryList = [];
        this.pushSubscriptions = [];
        this.idCounter = 1;
        this.user = {
            findUnique: async ({ where, select }) => {
                let user = null;
                if (where.email) {
                    user = this.users.find(u => u.email === where.email) || null;
                }
                if (where.id) {
                    user = this.users.find(u => u.id === where.id) || null;
                }
                // Handle select (projection) - for now just return the full user
                return user;
            },
            findMany: async ({ where }) => {
                return this.users.filter(user => {
                    if (where?.isActive !== undefined) {
                        return user.isActive === where.isActive;
                    }
                    return true;
                });
            },
            create: async ({ data }) => {
                const user = {
                    ...data,
                    id: (this.idCounter++).toString(),
                    isActive: true,
                    subscription: data.subscription || 'free',
                    createdAt: new Date()
                };
                this.users.push(user);
                return user;
            },
            update: async ({ where, data }) => {
                const userIndex = this.users.findIndex(u => u.id === where.id);
                if (userIndex === -1)
                    throw new Error('User not found');
                this.users[userIndex] = { ...this.users[userIndex], ...data };
                return this.users[userIndex];
            }
        };
        this.alertHistory = {
            findFirst: async ({ where }) => {
                return this.alertHistoryList.find(ah => ah.userId === where.userId && ah.dealId === where.dealId) || null;
            },
            create: async ({ data }) => {
                const alert = {
                    ...data,
                    id: (this.idCounter++).toString()
                };
                this.alertHistoryList.push(alert);
                return alert;
            }
        };
        this.pushSubscription = {
            findMany: async ({ where }) => {
                return this.pushSubscriptions.filter(ps => ps.userId === where.userId);
            },
            create: async ({ data }) => {
                const subscription = {
                    ...data,
                    id: (this.idCounter++).toString()
                };
                this.pushSubscriptions.push(subscription);
                return subscription;
            }
        };
    }
}
exports.db = new SimpleDB();
//# sourceMappingURL=connection.js.map