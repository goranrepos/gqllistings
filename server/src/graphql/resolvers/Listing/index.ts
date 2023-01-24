import { IResolvers } from '@graphql-tools/utils';
import { Database, Listing } from '../../../lib/types';
import { ObjectId } from 'mongodb';
  
// resolvers as part of the graphql schema
export const listingResolvers:IResolvers =  {
    Query: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        listings: async (_root: undefined, _args: Record<string, unknown>, { db }: { db: Database }): Promise<Listing[]> => {
            return await db.listings.find({}).toArray();
        }
    },
    Mutation: {
        deleteListing: async (_root: undefined, { id }: {id:string}, { db }: { db: Database }): Promise<Listing> => {
            const deleteRes = await db.listings.findOneAndDelete({
                _id: new ObjectId(id),
            })

            if(!deleteRes.value) {
                throw new Error('failed to delete listing');
            }

            return deleteRes.value;
        }
    },
    Listing: {
        id: (listing: Listing): string => listing._id.toString()
    }


}