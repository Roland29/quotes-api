
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCatInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export class CreateQuoteInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export abstract class IQuery {
    abstract cats(): Nullable<Nullable<Cat>[]> | Promise<Nullable<Nullable<Cat>[]>>;

    abstract cat(id: string): Nullable<Cat> | Promise<Nullable<Cat>>;

    abstract quotes(): Nullable<Nullable<Quote>[]> | Promise<Nullable<Nullable<Quote>[]>>;

    abstract quote(id: string): Nullable<Quote> | Promise<Nullable<Quote>>;
}

export abstract class IMutation {
    abstract createCat(createCatInput?: Nullable<CreateCatInput>): Nullable<Cat> | Promise<Nullable<Cat>>;

    abstract createQuote(createQuoteInput?: Nullable<CreateQuoteInput>): Nullable<Quote> | Promise<Nullable<Quote>>;
}

export abstract class ISubscription {
    abstract catCreated(): Nullable<Cat> | Promise<Nullable<Cat>>;

    abstract quoteCreated(): Nullable<Quote> | Promise<Nullable<Quote>>;
}

export class Owner {
    id: number;
    name: string;
    age?: Nullable<number>;
    cats?: Nullable<Cat[]>;
}

export class Cat {
    id?: Nullable<number>;
    name?: Nullable<string>;
    age?: Nullable<number>;
    owner?: Nullable<Owner>;
}

export class Quote {
    id?: Nullable<number>;
    name?: Nullable<string>;
    age?: Nullable<number>;
}

type Nullable<T> = T | null;
