export default interface ICacheProvier {
  save(key: string, value: string): Promise<void>;
  recover(key: string): Promise<string | null>;
  invalidade(key: string): Promise<void>;
}
