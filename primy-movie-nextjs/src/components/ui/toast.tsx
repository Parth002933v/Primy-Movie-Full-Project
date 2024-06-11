"use client"
import { GraphQLErrors } from '@apollo/client/errors';
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function Toast({ error }: { error: GraphQLErrors }) {

    useEffect(() => {
        if (error) {

            error.map((m) => toast.error(m.message))
        }
    }, [error])


    return (
        <div className='max-md:hidden'>
            <Toaster
                containerClassName='mr-4'
                position="bottom-right"
                reverseOrder={false}

            />
        </div>
    )
}
