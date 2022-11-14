export type Merge<F, S> = {
  [K in keyof (Omit<F, keyof S> & S)]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never
}
