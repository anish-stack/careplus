import React from 'react'

const Loader = () => {
    return (
        <div>
            <div class="flex flex-row gap-2">
                <div class="w-4 h-4 rounded-full bg-white animate-bounce"></div>
                <div class="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                <div class="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
            </div>
        </div>
    )
}

export default Loader