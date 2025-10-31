// Tailwind component classes
export const textareaClasses = {
    // base: "w-300  border-2 rounded-lg shadow-sm p-2 focus:outline-none resize-y ",
    // response: "w-400  border-2 rounded-lg shadow-sm p-2 focus:outline-none resize-y ",
    // default: "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600",
        base: "w-300 border-2 rounded-lg shadow-sm p-2 focus:outline-none overflow-hidden",
        response: "w-400 border-2 rounded-lg shadow-sm p-2 focus:outline-none overflow-hidden",
        default: "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
    
}

export const buttonClasses = {
    base: "font-medium text-sm px-6 py-3 rounded-2xl transition-colors duration-200 ease-in-out",
    primary: "bg-green-500 hover:bg-green-600 text-white",
    loading: "bg-red-500 text-white cursor-wait",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed"
}

export const containerClasses = {
    section: "mt-20",
    label: "flex flex-col items-center text-lg font-medium mb-2"
}

export const buttonClassesX = {
    clear: "font-medium text-sm px-4.5 py-3 rounded-2xl transition-colors duration-200 ease-in-out bg-red-500 hover:bg-red-600 text-white"
}