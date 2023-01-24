// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { ObjectId } from 'mongodb';
import { connectDatabase } from '../src/database';
import { Listing } from '../src/lib/types';

const seed = async () => {
    try {
        console.log('[seed]: running');

        const db = await connectDatabase();


        const listings:Listing[] = [
            {
                _id: new ObjectId(),
                title: "Title 001",
                image: "https://cdn-icons-png.flaticon.com/512/7230/7230979.png",
                address: "Address 001",
                price: 1000,
                numOfGuests: 1,
                numOfBeds: 1,
                numOfBaths: 1,
                rating: 1,
            },
            {
                _id: new ObjectId(),
                title: "Title 002",
                image: "https://cdn-icons-png.flaticon.com/512/7230/7230947.png",
                address: "Address 002",
                price: 2000,
                numOfGuests: 2,
                numOfBeds: 2,
                numOfBaths: 2,
                rating: 2,
            },
            {
                _id: new ObjectId(),
                title: "Title 003",
                image: "https://cdn-icons-png.flaticon.com/512/7230/7230971.png",
                address: "Address 003",
                price: 3000,
                numOfGuests: 3,
                numOfBeds: 3,
                numOfBaths: 3,
                rating: 3,
            },
            {
                _id: new ObjectId(),
                title: "Title 004",
                image: "https://cdn-icons-png.flaticon.com/512/7230/7230909.png",
                address: "Address 004",
                price: 4000,
                numOfGuests: 4,
                numOfBeds: 4,
                numOfBaths: 4,
                rating: 4,
            },
            {
                _id: new ObjectId(),
                title: "Title 005",
                image: "https://cdn-icons-png.flaticon.com/512/7230/7230887.png",
                address: "Address 005",
                price: 5000,
                numOfGuests: 5,
                numOfBeds: 5,
                numOfBaths: 5,
                rating: 5,
            }
        ];

        for(const listing of listings) {
            await db.listings.insertOne(listing);
        }

        console.log('[seed] : success');
        
    } catch {
        throw new Error('failed to seed database');
    }
}

seed();