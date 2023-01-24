import React from 'react';
// import { useMutation, useQuery, gql } from '@apollo/client';
import { useQuery, gql, useMutation } from '@apollo/client';
// import { gql } from 'apollo-boost';
import { ListingsData } from './types';

import {DeleteListingData, DeleteListingVariables} from './types'


const LISTINGS = gql`
    query Listings {
        listings {
        id
        title
        rating
        price
        numOfGuests
        numOfBeds
        numOfBaths
        image
        address
        }
    }
`;

const DELETE_LISTING = gql`
    mutation DeleteListing($id: ID!) {
        deleteListing(id: $id) {
            id
        }
    }
`;

interface Props {
    title: String;
}

export const Listings = ({title}:Props) => {
    const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);
    const [deleteListing, {loading: deleteListingLoading, error: deleteListingError}] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);


    const handleDeleteListing = async (id:string)=> {
        await deleteListing({ variables: { id }})
        refetch();
    }

    const listings = data ? data.listings : null;

    const listingsList = listings ? listings.map(listing => {
        return (
            <li key={listing.id}>
                {listing.title}
                <button onClick={()=> handleDeleteListing(listing.id)}>Delete me</button>
            </li>
        );
    }) : null;

    if (loading) {
       return  <h2>Loading...</h2> 
    }

    if (error) {
        return  <h2>Error...</h2> 
    }

    const deleteListingLoadingMessage = deleteListingLoading ? <h4>Deletion in progress...</h4> : null;
    const deleteListingErrorMessage = deleteListingError ? <h4>Deletion Error...</h4> : null;

    return (
        <div>
            <h2>{title}</h2>
            {listingsList}
            {deleteListingLoadingMessage}
            {deleteListingErrorMessage}
        </div>
    );
}