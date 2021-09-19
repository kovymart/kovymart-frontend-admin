export interface CategoryI {
    id?: number,
    description?: string,
    name?: string
}

export interface RouteParamsI {
    id?: string
}

export interface AccountI{
    email?: string,
    password?: string
}

export interface ProductI {
    id?: number,
    sku?: string,
    unit?: string,
    discount?: number,
    categoryId?: number,
    supplierId?: number,
    description?: string
}

export interface SupplierI {
    id?: number,
    name?: string
}
