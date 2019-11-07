import { Resolver, ObjectTypeComposer } from 'graphql-compose';
import { Model } from 'mongoose';
import { MongoId } from '../types/mongoid';
import { FilterHelperArgs } from './helpers';
import { GenResolverOpts } from './index';

export default function distinct(
  model: Model<any>,
  tc: ObjectTypeComposer<any>,
  opts?: GenResolverOpts,
): Resolver<any, any>;

export type DistinctArgs<TSource, IndexedFieldsMap = { _id: MongoId }> = {
  field: string;
  filter: FilterHelperArgs<TSource, IndexedFieldsMap>;
};

export type DistinctRSource<TSource> = TSource;
