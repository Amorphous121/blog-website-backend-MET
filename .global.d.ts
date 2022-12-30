
declare module 'express-serve-static-core' {
  export interface Request {
    user: Record<string, any>
  }
}
