import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';

const ChatContainer = () => {

    const { messages, selectedUser, getMessages, isMessagesLoading } = useChatStore();

    useEffect(() => {
        getMessages(selectedUser._id);
    }, [selectedUser._id, getMessages])

    if (isMessagesLoading) {
        return (
            <div className='flex flex-col flex-1 overflow-auto'>
                <ChatHeader />

                <MessageSkeleton />

                <MessageInput/>
            </div>
        )
    }
    return (
        <div className='flex flex-col flex-1 overflow-auto'>
            <ChatHeader />

            <MessageInput />

        </div>
    )
}

export default ChatContainer
