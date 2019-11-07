/* @flow */

import type { Resolver, ObjectTypeComposer } from 'graphql-compose';
import type { MongooseDocument } from 'mongoose';
import { filterHelper, filterHelperArgs } from './helpers';
import type { ExtendedResolveParams, GenResolverOpts } from './index';

export default function distinct<TSource: MongooseDocument, TContext>(
  model: Class<TSource>, // === MongooseModel
  tc: ObjectTypeComposer<TSource, TContext>,
  opts?: GenResolverOpts, // eslint-disable-line no-unused-vars
): Resolver<TSource, TContext> {
  if (!model || !model.modelName || !model.schema) {
    throw new Error('First arg for Resolver distinct() should be instance of Mongoose Model.');
  }

  if (!tc || tc.constructor.name !== 'ObjectTypeComposer') {
    throw new Error('Second arg for Resolver distinct() should be instance of ObjectTypeComposer.');
  }

  return tc.schemaComposer.createResolver({
    type: '[String]',
    name: 'distinct',
    kind: 'query',
    args: {
      field: 'String!',
      ...filterHelperArgs(tc, model, {
        filterTypeName: `FilterDistinct${tc.getTypeName()}Input`,
        model,
        ...(opts && opts.filter),
      }),
    },
    resolve: (resolveParams: ExtendedResolveParams) => {
      const { field } = resolveParams.args;

      resolveParams.query = model.distinct(field, {}); // eslint-disable-line
      filterHelper(resolveParams);

      return resolveParams.query.exec();
    },
  });
}
