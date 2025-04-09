export default class TranslatableError extends Error {

  private readonly _key : string
  private readonly _named : Record<string, unknown>
  private readonly _plural : number

  constructor(internalMessage : string, key : string)
  constructor(internalMessage : string, key : string, named : Record<string, unknown>)
  constructor(internalMessage : string, key : string, named : Record<string, unknown>, plural : number)
    constructor(internalMessage : string, key : string, named? : Record<string, unknown>, plural? : number) {
    super(internalMessage)
    this._key = key
    this._named = named ?? {}
    this._plural = plural ?? 0
  }

  public get key() : string {
    return this._key
  }

  public get named() : Record<string, unknown> {
    return this._named
  }

  public get plural() : number {
    return this._plural
  }

}
