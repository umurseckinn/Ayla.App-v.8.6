// Mock Database Client - replaced with localStorage for offline mode
// This file provides a compatibility layer that mimics Database API
import { safeJSONParse } from "./safe-utils";

const STORAGE_PREFIX = 'ayla_db_';

interface MockQueryResult<T = any> {
    data: T | null;
    error: Error | null;
}

class MockSupabaseTable {
    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    private getStorageKey(): string {
        return `${STORAGE_PREFIX}${this.tableName}`;
    }

    private getData(): any[] {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(this.getStorageKey());
        return stored ? safeJSONParse(stored, []) : [];
    }

    private setData(data: any[]): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(this.getStorageKey(), JSON.stringify(data));
    }

    select(columns?: string) {
        return new MockSelectBuilder(this.getData());
    }

    async insert(record: any): Promise<MockQueryResult> {
        try {
            const data = this.getData();
            data.push({ ...record, id: Date.now().toString() });
            this.setData(data);
            return { data: record, error: null };
        } catch (error) {
            return { data: null, error: error as Error };
        }
    }

    async upsert(record: any): Promise<MockQueryResult> {
        try {
            const data = this.getData();
            const existingIndex = data.findIndex((item: any) => item.id === record.id);
            if (existingIndex >= 0) {
                data[existingIndex] = { ...data[existingIndex], ...record };
            } else {
                data.push({ ...record, id: record.id || Date.now().toString() });
            }
            this.setData(data);
            return { data: record, error: null };
        } catch (error) {
            return { data: null, error: error as Error };
        }
    }

    update(record: any) {
        return new MockUpdateBuilder(this.tableName, record);
    }

    delete() {
        return new MockDeleteBuilder(this.tableName);
    }
}

class MockSelectBuilder {
    private data: any[];
    private filters: Array<{ column: string; value: any }> = [];

    constructor(data: any[]) {
        this.data = data;
    }

    eq(column: string, value: any) {
        this.filters.push({ column, value });
        return this;
    }

    gte(column: string, value: any) {
        return this;
    }

    lte(column: string, value: any) {
        return this;
    }

    order(column: string, options?: { ascending?: boolean }) {
        return this;
    }

    limit(count: number) {
        return this;
    }

    async single(): Promise<MockQueryResult> {
        let filtered = this.data;
        for (const filter of this.filters) {
            filtered = filtered.filter(item => item[filter.column] === filter.value);
        }
        return { data: filtered[0] || null, error: null };
    }

    then(resolve: (result: MockQueryResult) => void) {
        let filtered = this.data;
        for (const filter of this.filters) {
            filtered = filtered.filter(item => item[filter.column] === filter.value);
        }
        resolve({ data: filtered, error: null });
    }
}

class MockUpdateBuilder {
    private tableName: string;
    private record: any;
    private filterColumn?: string;
    private filterValue?: any;

    constructor(tableName: string, record: any) {
        this.tableName = tableName;
        this.record = record;
    }

    eq(column: string, value: any) {
        this.filterColumn = column;
        this.filterValue = value;
        return this;
    }

    async then(resolve: (result: MockQueryResult) => void) {
        // For offline mode, just resolve successfully
        resolve({ data: this.record, error: null });
    }
}

class MockDeleteBuilder {
    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    eq(column: string, value: any) {
        return this;
    }

    async then(resolve: (result: MockQueryResult) => void) {
        resolve({ data: null, error: null });
    }
}

class MockAuth {
    async getUser() {
        // Always return guest user in offline mode
        return {
            data: {
                user: null // No authenticated user in offline mode
            }
        };
    }

    async signOut() {
        return { error: null };
    }
}

class MockSupabaseClient {
    auth = new MockAuth();

    from(tableName: string) {
        return new MockSupabaseTable(tableName);
    }
}

// Export the mock client
export const supabase = new MockSupabaseClient();
