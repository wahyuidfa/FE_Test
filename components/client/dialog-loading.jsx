'use client'
import React from 'react';
import useLoadingStore from '@/hooks/use-loding-store';
import * as Dialog from '@radix-ui/react-dialog';

function DialogLoading(props) {
    const isLoading = useLoadingStore((state) => state.isLoading);

    return (
        <Dialog.Root open={isLoading}>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-[100]" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-[101]">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
                    <p className="mt-4 text-gray-700">Loading...</p>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default DialogLoading