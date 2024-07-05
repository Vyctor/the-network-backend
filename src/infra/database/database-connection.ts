export interface DatabaseConnection {
  query<T>(statement: string, params?: any[]): Promise<T>;
  close(): Promise<void>;
}
