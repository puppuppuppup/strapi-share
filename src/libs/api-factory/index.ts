import { ApiCustomTypes } from '@puppup/api-factory';
import {
    APIResponse,
    APIResponseCollection,
    GetStrapiType,
    StrapiModelUID,
} from '../../types/strapi';

export type ApiStrapiTypes<TSchemaUID extends StrapiModelUID> = ApiCustomTypes<{
    single: APIResponse<TSchemaUID>;
    many: APIResponseCollection<TSchemaUID>;
    create: Omit<GetStrapiType<TSchemaUID>, 'id'>;
    update: Partial<ApiStrapiTypes<TSchemaUID>['create']>;
}>;
