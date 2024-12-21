import { ApiCustomTypes } from "@whotioma/api-factory";
import { APIResponse, APIResponseCollection, GetStrapiType, StrapiModelUID } from "../..";

export type ApiStrapiTypes<TSchemaUID extends StrapiModelUID> = ApiCustomTypes<{
    single: APIResponse<TSchemaUID>,
    many: APIResponseCollection<TSchemaUID>,
    create: Omit<GetStrapiType<TSchemaUID>, 'id'>,
    update: Partial<ApiStrapiTypes<TSchemaUID>['create']>,
}>