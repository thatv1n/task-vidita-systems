export  type DocType = {
    id: string,
    status: string, // {‘active’, ‘archive’}
    sum: number,
    qty: number,
    volume: number,
    name: string,
    delivery_date: string,
    currency: string
    total?:string
};
